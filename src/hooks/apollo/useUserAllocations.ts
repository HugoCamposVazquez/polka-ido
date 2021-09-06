import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { client } from '../../services/apollo';
import { ProjectAllocationsDto } from '../../types/ProjectType';

type Allocation = { id: string; amount: string };
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
    if (data) {
      const userAllocations = data.allocations.filter((allocation) => allocation.user.id == userAddress);
      const total = userAllocations.reduce(
        (prevTotal: BigNumber, sale: Allocation) => prevTotal.add(BigNumber.from(sale.amount)),
        BigNumber.from(0),
      );
      setAllocations({
        allocations: userAllocations,
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
      allocations {
          id
          amount
          user {
            id
          }
        }
    }
    `,
);
