import { hexToString } from '@polkadot/util';
import { useEffect, useState } from 'react';

import { getStatemintApi } from '../../services/polkadot';
import { IData } from '../ipfs/useReadIPFS';

interface StatemintToken {
  symbol: string;
  name: string;
  decimals: string;
  isFrozen: boolean;
  deposit: string;
}

export const useStatemintToken = (assetId: string): IData<StatemintToken> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatemintToken | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const fetchData = async (): Promise<void> => {
    try {
      const api = await getStatemintApi();
      const blockHash = await api.rpc.chain.getBlockHash();
      const metadata = (await api.query.assets.metadata.at(blockHash, assetId)).toJSON() as unknown as StatemintToken;
      setData({
        ...metadata,
        symbol: hexToString(metadata.symbol),
        name: hexToString(metadata.name),
      });
    } catch (e) {
      setError(e.message);
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
