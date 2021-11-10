import axios from 'axios';
import { useEffect, useState } from 'react';

import { getIPFSResolvedLink } from '../../utils/data';

const IPFS_GATEWAY = 'https://ipfs.infura.io/ipfs/';
axios.defaults.baseURL = IPFS_GATEWAY;

export interface IData<ReturnData> {
  loading: boolean;
  error?: string;
  data?: ReturnData;
}

export const useReadIPFS = <ReturnData>(hash?: string): IData<ReturnData> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReturnData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const fetchData = async () => {
    setLoading(true);
    try {
      if (hash) {
        const response = await axios.get(getIPFSResolvedLink(hash));
        if (response.data) {
          setData(response.data);
        }
      }
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data);
      } else {
        setError(`An unexpected error occurred: ${e.message}`);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [hash]);

  return {
    loading,
    data,
    error,
  };
};
