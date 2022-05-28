// constants
const dataInitial = {
    loading: false,
    newsletterResponse: false,
    emailsSuscribed: false
}
// types
const EMAIL_SENT = 'EMAIL_SENT'
const LOADING = 'LOADING'
const EMAILS_SUSCRIBED = 'EMAILS_SUSCRIBED'

// reducer
export default function newsletterReducer(state = dataInitial, action) {
    switch(action.type) {
        case LOADING:
            return {...state, loading: true,}
        case EMAIL_SENT:
            return {...state, loading: false, newsletterResponse: action.payload}
        case EMAILS_SUSCRIBED:
            return {...state, loading: false, emailsSuscribed: action.payload}
        default:
            return state
    }
}

// actions
export const getNewsletterEmailsSuscribed = () => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    })

    let dataResponse = await response.json()
    dispatch({
        type: EMAILS_SUSCRIBED,
        payload: dataResponse.response
    })
}

export const submitNewsletterAction = (_emailNewsletter = '') => async(dispatch, getState) => {
    const {emailsSuscribed} = getState().newsletter
    dispatch({
        type: LOADING
    })
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
            method: "POST",
            body: JSON.stringify({
                email: _emailNewsletter
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            }
        })

        let dataResponse = await response.json()
        dispatch({
            type: EMAIL_SENT,
            payload: dataResponse
        })
        emailsSuscribed.push({
            email_address: _emailNewsletter
        })

    } catch(error) {
        console.log(error)
    }
}