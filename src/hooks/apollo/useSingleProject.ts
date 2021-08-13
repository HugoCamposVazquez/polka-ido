import { DocumentNode, gql, useQuery } from '@apollo/client';
import SaleContract from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContract.sol/SaleContract.json';
import { SaleContract as SaleContractTypes } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { ethers } from 'ethers';
import React, { useEffect } from 'react';

import { client } from '../../services/apollo';
import { ProjectSales } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: ProjectSales | undefined;
}

export const useSingleProject = (id: string): ProjectsHook => {
  const { data, loading } = useQuery(FETCH_SINGLE_PROJECT_DATA, {
    client,
    variables: {
      id,
    },
  });

  return { data, loading };
};

const FETCH_SINGLE_PROJECT_DATA = gql(
  `
    query Projects($id: String) {
      sales(where: { id: $id }) {
        id
        salePrice
        startDate
        endDate
        whitelisted
        featured
        metadataURI
        maxDepositAmount
        currentDepositAmount
        allocations {
          id
        }
      }
    }
    `,
);
