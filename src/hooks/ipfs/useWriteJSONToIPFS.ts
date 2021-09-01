import axios from 'axios';
import { useCallback, useState } from 'react';

import { getPinataApi, PinataResponse } from '../../services/pinata';

interface IData {
  loading: boolean;
  writeData: (body: unknown) => Promise<PinataResponse | null>;
  error?: string;
}

// Uses pinata.cloud pinning
export const useWriteJSONToIPFS = (): IData => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const writeData = useCallback(async (body: unknown): Promise<PinataResponse | null> => {
    try {
      const api = getPinataApi();
      const response = await api.post('/pinning/pinJSONToIPFS', body);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data);
      } else {
        setError(`An unexpected error occurred: ${e.message}`);
      }
    }
    setLoading(false);
    return null;
  }, []);

  return {
    loading,
    error,
    writeData,
  };
};
