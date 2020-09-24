import axios from 'axios';
import getAuthToken from '../lib/getAuthToken';

axios.defaults.headers = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  Pragma: 'no-cache',
  //Accept: 'application/json',
  Accept: '*/*',
};

export default async function api(
  url,
  method,
  dataOrParams = null,
  useIDToken = true,
  headersOverwrite = null,
  optionsOverwrite = null,
) {
  if (!method) {
    method = 'get';
  }
  let headers = {
    'cache-control': 'no-cache',
    'Content-Type': 'application/json',
  };
  if (useIDToken) {
    const token = await getAuthToken();
    headers.Authorization = `JWT ${token}`;
  }
  console.log(url);
  if (headersOverwrite) {
    headers = {
      ...headers,
      ...headersOverwrite,
    };
  }
  let options = {
    headers,
    method,
    url,
  };
  if (optionsOverwrite) {
    options = {
      ...options,
      ...optionsOverwrite,
    };
  }
  if (dataOrParams) {
    if (method === 'get') {
      options.params = dataOrParams;
    } else {
      options.data = dataOrParams;
    }
  }
  return axios(options);
}
