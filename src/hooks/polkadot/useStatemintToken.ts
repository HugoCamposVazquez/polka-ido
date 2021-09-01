import { hexToString } from '@polkadot/util';
import { useEffect, useState } from 'react';

import { getStatemintApi } from '../../services/polkadot';
import { IData } from '../ipfs/useReadIPFS';

interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: string;
  isFrozen: boolean;
  deposit: string;
}

interface Asset {
  supply: string;
  minBalance: string;
}

type StatemintToken = TokenMetadata & Asset;

export const useStatemintToken = (assetId: string): IData<StatemintToken> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatemintToken | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const fetchData = async (): Promise<void> => {
    try {
      const api = await getStatemintApi();
      const blockHash = await api.rpc.chain.getBlockHash();
      const asset = (await api.query.assets.asset.at(blockHash, assetId)).toJSON() as unknown as Asset;
      const metadata = (await api.query.assets.metadata.at(blockHash, assetId)).toJSON() as unknown as StatemintToken;
      setData({
        ...metadata,
        ...asset,
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
