import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {submitNewsletterAction} from "../redux/newsletterDucks";
const Newsletter = () => {
    const dispatch = useDispatch()

    const {loading, response} = useSelector(store => store.newsletter)
    const [emailNewsletter, setEmailNewsletter] = React.useState('')
    const sendEmailNewsletter = (e) => {
        e.preventDefault()

        if ( emailNewsletter.trim().length <= 0 )
        {
            alert('The email is required')
            return false
        }

        // setEmailNewsletter('')
        dispatch(submitNewsletterAction(emailNewsletter))


    }

    return (
        <div>
            <h2>Newsletter app</h2>
            {
                (response!==false) && (
                    (response.Success === true) ? (
                        <div className="alert alert-success" role="alert">
                            <strong>{response.Response}</strong>
                        </div>
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            Error: <strong>{response.Response}</strong>
                        </div>
                    )
                )
            }
            <form onSubmit={(e) => sendEmailNewsletter(e)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        disabled={loading}
                        onChange={(e) => setEmailNewsletter(e.target.value)}
                        value={emailNewsletter}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                </div>
                <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                (loading) && (
                    <>
                        <hr/>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <span className="p-2">Suscribing, please wait...</span>
                    </>
                )
            }
        </div>
    );
};

export default Newsletter;