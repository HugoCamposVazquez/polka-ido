export const getIPFSResolvedLink = (uri: string): string => {
  let hash = uri;
  if (uri.startsWith('ipfs://')) {
    hash = uri.replace('ipfs://', '');
  }

  return `${process.env.REACT_APP_IPFS_GATEWAY}${hash}`;
};
