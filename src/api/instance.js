import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';

const ApiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': process.env.REACT_APP_API_KEY || '',
  },
});

export default ApiInstance;
