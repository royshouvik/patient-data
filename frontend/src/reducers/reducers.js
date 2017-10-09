import { combineReducers } from 'redux';
import { FETCH_PROVIDERS_PENDING, FETCH_PROVIDERS_FULFILLED, FETCH_PROVIDERS_REJECTED } from '../actions/actions';

const initialState = {
    isFetching: false,
    isEmpty: false,
    data: []
  };
  
export const providers = ( state = initialState,  action) => {
  switch (action.type) {
    case FETCH_PROVIDERS_PENDING:
      return Object.assign({}, state, { isFetching: true });

    case FETCH_PROVIDERS_FULFILLED:
      return Object.assign({}, state, {
          isFetching: false,
          isEmpty: (action.payload.length === 0),
          data: action.payload,
      });

    case FETCH_PROVIDERS_REJECTED:
      return Object.assign({}, state, { isFetching: false });

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  providers,
});

export default rootReducer;
