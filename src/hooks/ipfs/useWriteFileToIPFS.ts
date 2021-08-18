import axios from 'axios';
import FormData from 'form-data';
import { useCallback, useState } from 'react';

import { getPinataApi, PinataResponse } from '../../services/pinata';

interface IData {
  loading: boolean;
  writeData: (body: FormData) => void;
  error?: string;
  response?: PinataResponse;
}

// Uses pinata.cloud pinning
export const useWriteFileToIPFS = (): IData => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PinataResponse | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const writeData = useCallback(async (body: FormData) => {
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
  }, []);

  return {
    loading,
    writeData,
    response,
    error,
  };
};
