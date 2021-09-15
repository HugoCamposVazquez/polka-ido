import axios from 'axios';

import { getIPFSResolvedLink } from '../utils/data';

export const fetchData = async (hash: string) => {
  try {
    if (hash) {
      const response = await axios.get(getIPFSResolvedLink(hash));
      if (response.data) {
        return response.data;
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
