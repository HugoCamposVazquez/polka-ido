import axios from 'axios';
import { useEffect, useState } from 'react';

import { getPinataApi } from '../../services/pinata';

interface IData {
  loading: boolean;
  error?: string;
  response?: PinataResponse;
}

interface PinataResponse {
  IpfsHash: string;
  PinSize: string;
  Timestamp: string;
}

// Uses pinata.cloud pinning
export const useWriteJSONToIPFS = (body: unknown): IData => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<PinataResponse | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const writeData = async () => {
    try {
      const api = getPinataApi();
      const response = await api.post('/pinning/pinJSONToIPFS', body);
      if (response.data) {
        setResponse(response.data);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data);
      } else {
        setError(`An unexpected error occurred: ${e.message}`);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    writeData();
  }, []);

  return {
    loading,
    response,
    error,
  };
};
