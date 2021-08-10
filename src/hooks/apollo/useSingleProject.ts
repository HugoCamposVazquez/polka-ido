import { DocumentNode, gql, useQuery } from '@apollo/client';
import SaleContract from '@nodefactoryio/ryu-contracts/artifacts/contracts/SaleContract.sol/SaleContract.json';
import { SaleContract as SaleContractTypes } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import { ethers } from 'ethers';
import React, { useEffect } from 'react';

import { client } from '../../services/apollo';
import { Projects } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: Projects | undefined;
}

export const useSingleProject = (id: string): ProjectsHook => {
  const apolloClient = client;

  const { data, loading } = useQuery(FETCH_SINGLE_PROJECT_DATA(), {
    client: apolloClient,
    variables: {
      id,
    },
  });

  return { data, loading };
};

const FETCH_SINGLE_PROJECT_DATA = (): DocumentNode =>
  gql(
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
