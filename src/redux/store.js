import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import newsletterReducer, {getNewsletterEmailsSuscribed} from "./newsletterDucks";

const rootReducer = combineReducers({
    newsletter: newsletterReducer
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    getNewsletterEmailsSuscribed()(store.dispatch)
    return store
}