import axios from 'axios';
import FormData from 'form-data';
import { useCallback, useState } from 'react';

import { getPinataApi, PinataResponse } from '../../services/pinata';

interface IData {
  loading: boolean;
  writeData: (body: FormData) => Promise<PinataResponse | null>;
  error?: string;
}

// Uses pinata.cloud pinning
export const useWriteFileToIPFS = (): IData => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const writeData = useCallback(async (body: FormData): Promise<PinataResponse | null> => {
    setLoading(true);
    try {
      const api = getPinataApi();
      const response = await api.post('/pinning/pinFileToIPFS', body, {
        // @ts-ignore
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
    writeData,
    error,
  };
};
