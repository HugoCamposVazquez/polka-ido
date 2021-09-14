import { hexToString } from '@polkadot/util';
import { useEffect, useState } from 'react';

import { getStatemintApi } from '../../services/polkadot';
import { IData } from '../ipfs/useReadIPFS';

export interface TokenMetadata {
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

interface ReturnData extends IData<StatemintToken> {
  fetchTokenData: (tokenId: string) => Promise<StatemintToken | null>;
}

export const useStatemintToken = (assetId?: string): ReturnData => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatemintToken | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  const fetchTokenData = async (id: string): Promise<StatemintToken | null> => {
    try {
      const api = await getStatemintApi();
      const blockHash = await api.rpc.chain.getBlockHash();
      const asset = (await api.query.assets.asset.at(blockHash, id)).toJSON() as unknown as Asset;
      const metadata = (await api.query.assets.metadata.at(blockHash, id)).toJSON() as unknown as StatemintToken;

      const data = {
        ...metadata,
        ...asset,
        symbol: hexToString(metadata.symbol),
        name: hexToString(metadata.name),
      };
      setData(data);
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      return null;
    }
  };

  useEffect(() => {
    if (assetId) {
      fetchTokenData(assetId);
    }
  }, [assetId]);

  return {
    loading,
    data,
    error,
    fetchTokenData,
  };
};
