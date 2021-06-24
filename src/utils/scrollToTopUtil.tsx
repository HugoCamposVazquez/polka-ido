import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

export const ScrollToTop = withRouter((props: any) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, [props.location.pathname]);

  return props.children;
});
