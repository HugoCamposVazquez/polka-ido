import axios from 'axios';

import { ProjectMetadata } from '../types/ProjectType';
import { getIPFSResolvedLink } from '../utils/data';

export const fetchIPFShData = async (hash: string) => {
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
