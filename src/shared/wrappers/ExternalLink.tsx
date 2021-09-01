import React from 'react';

export const ExternalLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  return <a target="_blank" rel="noreferrer noopener" {...props} />;
};
