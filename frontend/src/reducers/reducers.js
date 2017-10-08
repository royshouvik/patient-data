import { combineReducers } from 'redux';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import { FETCH_PROVIDERS } from '../actions/actions';

const initialState = {
    isFetching: false,
    isEmpty: false,
    data: []
  };

const providers = ( state = initialState,  action) => {
  switch (action.type) {
    case `${FETCH_PROVIDERS}_${PENDING}`:
      return Object.assign({}, state, { isFetching: true });

    case `${FETCH_PROVIDERS}_${FULFILLED}`:
      return Object.assign({}, state, {
          isFetching: false,
          isEmpty: (action.payload.length === 0),
          data: action.payload,
      });

    case `${FETCH_PROVIDERS}_${REJECTED}`:
      return Object.assign({}, state, { isFetching: false });

    default:
      return state;
  }
}



const rootReducer = combineReducers({
  providers,
})

export default rootReducer;