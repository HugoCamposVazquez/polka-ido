import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { injected } from './connectors';

const DISABLE_EAGER_CONNECT_KEY = 'DISABLE_EAGER_CONNECT_KEY';

export const onLogout = (): void => {
  localStorage.setItem(DISABLE_EAGER_CONNECT_KEY, 'true');
};

export const onLogin = (): void => {
  localStorage.setItem(DISABLE_EAGER_CONNECT_KEY, 'false');
};

export const useEagerConnect = (): boolean => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISABLE_EAGER_CONNECT_KEY) === 'true') {
      setTried(true);

      return;
    }

    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};
