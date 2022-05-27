// constants
const dataInitial = {
    loading: false,
    response: false
}
// types
const EMAIL_SENT = 'EMAIL_SENT'
const LOADING = 'LOADING'

// reducer
export default function newsletterReducer(state = dataInitial, action) {
    switch(action.type) {
        case LOADING:
            return {...state, loading: true,}
        case EMAIL_SENT:
            return {...state, loading: false, response: action.payload}
        default:
            return state
    }
}

// actions
export const submitNewsletterAction = (emailNewsletter = '') => async(dispatch) => {

    dispatch({
        type: LOADING
    })
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/newsletter`, {
            method: "POST",
            body: JSON.stringify({
                email: emailNewsletter
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        let dataResponse = await response.json()
        dispatch({
            type: EMAIL_SENT,
            payload: dataResponse
        })

    } catch(error) {
        console.log(error)
    }
}