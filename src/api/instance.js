import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';

const ApiInstance = axios.create({
  baseURL: BASE_URL
});

ApiInstance.interceptors.request.use(config => {
  config.headers['x-api-key'] = process.env.REACT_APP_API_KEY || ''
  return config;
})

export default ApiInstance;