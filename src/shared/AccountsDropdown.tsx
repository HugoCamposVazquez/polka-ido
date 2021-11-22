import './style/dropdown.css';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Dropdown, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React from 'react';

import userIcon from '../assets/user_icon.svg';
import * as styles from './AccountsDropdown.styles';
import { MainButton } from './gui/MainButton';

interface IProps {
  options: InjectedAccountWithMeta[];
  initialAccount?: InjectedAccountWithMeta;
  onAccountChange: (account: InjectedAccountWithMeta) => Promise<void>;
}

export const AccountsDropdown = ({ options, initialAccount, onAccountChange }: IProps) => {
  const [selectedAccount, setSelectedAccount] = React.useState(initialAccount);
  const onOptionSelect = async (item: MenuInfo) => {
    const account = options.find((option) => option.address === item.key);
    if (account) {
      setSelectedAccount(account);
      await onAccountChange(account);
    }
  };

  const menu = (
    <Menu onClick={onOptionSelect} id="accounts-dropdown">
      {options.map((option) => (
        <Menu.Item key={option.address}>
          <div style={styles.accountOptionsContainerStyle}>
            <img src={userIcon} style={styles.iconStyle} />
            <div>
              <p>{option.meta.name}</p>
              <p style={styles.addressStyle}>{option.address}</p>
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']}>
      <MainButton type="bordered" title={selectedAccount?.meta.name || 'SELECT WALLET'} onClick={() => {}} />
    </Dropdown>
  );
};
