import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const IPFS_GATEWAY = 'https://ipfs.infura.io/ipfs/';
axios.defaults.baseURL = IPFS_GATEWAY;

interface IData<ReturnData> {
  loading: boolean;
  error?: string;
  data?: ReturnData;
}

export const useReadIPFS = <ReturnData>(hash: string): IData<ReturnData> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReturnData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const fetchData = async () => {
    try {
      const response = await axios.get(hash);
      console.log('axios: ', response);
      if (response.data) {
        setData(response.data);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data);
      } else {
        setError(`An unexpected error ocurred: ${e.message}`);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    data,
    error,
  };
};
