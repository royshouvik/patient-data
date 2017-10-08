import fetch from 'isomorphic-fetch';
import { paramsToQueryString } from '../util';

export const FETCH_PROVIDERS = 'FETCH_PROVIDERS';

const API_BASE_URL = 'http://localhost:3000/api/';

const transformProvider = paramsToQueryString('providers');

export function getProviders(params) {
    const queryString = transformProvider(params);
    const payload = fetch(`${API_BASE_URL}${queryString}`).then(res => res.json());
    return {
      type: FETCH_PROVIDERS,
      payload,
    }
  }