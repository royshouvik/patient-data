import { providers as providerReducer } from './reducers';
import { FETCH_PROVIDERS_PENDING, FETCH_PROVIDERS_FULFILLED, FETCH_PROVIDERS_REJECTED } from '../actions/actions';

const initialState = {
    isFetching: false,
    isEmpty: false,
    data: []
};
const data = [
    {
        id: 1,
        name:'Provider A',
    },
    {
        id: 2,
        name:'Provider B',
    }
];

describe('Provider reducer', () => {
  it('should return the initial state', () => {
    expect(providerReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle FETCH_PROVIDERS_PENDING', () => {
    expect(providerReducer(undefined, { type: FETCH_PROVIDERS_PENDING })).toEqual(
        Object.assign(initialState, { isFetching: true })
    );
  });
  it('should handle FETCH_PROVIDERS_FULFILLED', () => {
    expect(providerReducer(undefined,
        {
            type: FETCH_PROVIDERS_FULFILLED,
            payload: data,
        }))
        .toEqual({
        isFetching: false,
        isEmpty: false,
        data: data
      });
  });
  it('should handle FETCH_PROVIDERS_REJECTED', () => {
    expect(providerReducer(
        Object.assign(initialState, { isFetching: true }),
        {
            type: FETCH_PROVIDERS_REJECTED
        }))
        .toEqual({
            isFetching: false,
            isEmpty: false,
            data: []
      });
  });
});
