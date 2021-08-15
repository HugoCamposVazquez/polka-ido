import axios from 'axios';

axios.defaults.baseURL = 'https://api.pinata.cloud';
axios.defaults.headers.common['pinata_api_key'] = process.env.REACT_APP_PINATA_API_KEY;
axios.defaults.headers.common['pinata_secret_api_key'] = process.env.REACT_APP_PINATA_API_SECRET;

export const getPinataApi = () => axios;
