import fetch from 'isomorphic-fetch';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import { paramsToQueryString } from '../util';

export const FETCH_PROVIDERS = 'FETCH_PROVIDERS';

export const FETCH_PROVIDERS_PENDING = `${FETCH_PROVIDERS}_${PENDING}`;
export const FETCH_PROVIDERS_FULFILLED = `${FETCH_PROVIDERS}_${FULFILLED}`;
export const FETCH_PROVIDERS_REJECTED = `${FETCH_PROVIDERS}_${REJECTED}`;

const API_BASE_URL = 'http://localhost:3000/api/';

const transformProvider = paramsToQueryString('providers');

export function getProviders(params, fetch=fetch) {
    const queryString = transformProvider(params);
    const payload = fetch(`${API_BASE_URL}${queryString}`).then(res => res.json());
    return {
      type: FETCH_PROVIDERS,
      payload,
    }
  }