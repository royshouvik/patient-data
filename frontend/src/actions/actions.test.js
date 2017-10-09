import { getProviders, FETCH_PROVIDERS } from './actions';

const mockFetch = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
}));

describe.only('Actions', () => {
  it('should create an action to fetch providers', (done) => {
    const action = getProviders({}, mockFetch);
    expect(action).toHaveProperty('type', FETCH_PROVIDERS);
    expect(action).toHaveProperty('payload');
    expect(action.payload).toBeInstanceOf(Promise);
    expect(mockFetch.mock.calls.length).toBe(1);
    done();
  });
});
