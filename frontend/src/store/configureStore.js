import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers'


export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        promiseMiddleware()
    )
  )
}