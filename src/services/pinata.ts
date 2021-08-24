import axios from 'axios';

if (!process.env.REACT_APP_PINATA_API_KEY || !process.env.REACT_APP_PINATA_API_SECRET) {
  throw new Error('Please setup pinata.cloud credentials to be able to upload to IPFS.');
}

export const instance = axios.create({
  baseURL: 'https://api.pinata.cloud',
  headers: {
    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
    pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
  },
});

export const getPinataApi = () => instance;

export interface PinataResponse {
  IpfsHash: string;
  PinSize: string;
  Timestamp: string;
}
