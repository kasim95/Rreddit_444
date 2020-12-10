import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // use only during development
        )
    );

export default store;
