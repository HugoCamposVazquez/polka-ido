import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { client } from '../../services/apollo';
import { Allocation, ProjectAllocationsDto } from '../../types/ProjectType';

interface AllocationsData {
  allocations: Allocation[];
  totalAllocation: string;
}

interface ProjectsAllocationsHook {
  loading: boolean;
  data?: AllocationsData;
}

export const useUserAllocations = (id: string, userAddress: string): ProjectsAllocationsHook => {
  const [allocations, setAllocations] = useState<AllocationsData | undefined>(undefined);
  const [dataReady, setDataReady] = useState(false);

  const { data } = useQuery<ProjectAllocationsDto>(FETCH_PROJECT_ALLOCATION_DATA, {
    client,
    variables: {
      id: id.toLowerCase(),
      userAddress: userAddress.toLowerCase(),
    },
  });

  useEffect(() => {
    if (data && data.sale) {
      const total = data.sale.allocations.reduce(
        (prevTotal: BigNumber, sale: Allocation) => prevTotal.add(BigNumber.from(sale.amount)),
        BigNumber.from(0),
      );
      setAllocations({
        allocations: data.sale.allocations,
        totalAllocation: total.toString(),
      });
      setDataReady(true);
    }
  }, [data]);

  return {
    data: allocations,
    loading: dataReady,
  };
};

const FETCH_PROJECT_ALLOCATION_DATA = gql(
  `
    query Sale($id: String, $userAddress: String) {
      sale (id: $id) {
        id
        metadataURI
        allocations (where: { user: $userAddress }) {
          id
          amount
        }
      }
    }
    `,
);
