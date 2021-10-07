import { useCallback, useState } from 'react';

import { PinataResponse } from '../../services/pinata';
import { writeToIPFS } from '../../utils/editProject';

interface IData {
  loading: boolean;
  writeData: (
    body: unknown,
    setError: (e: string) => void,
    setLoading: (isLoading: boolean) => void,
  ) => Promise<PinataResponse | null>;
  error?: string;
}

// Uses pinata.cloud pinning
export const useWriteJSONToIPFS = (): IData => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const writeData = useCallback((data) => writeToIPFS(data, setError, setLoading), []);

  return {
    loading,
    error,
    writeData,
  };
};
