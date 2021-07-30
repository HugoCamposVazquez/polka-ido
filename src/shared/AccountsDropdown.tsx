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
}

export const AccountsDropdown = ({ options }: IProps) => {
  const onOptionSelect = (item: MenuInfo) => {
    console.log('clicked: ', item.key);
  };

  const menu = (
    <Menu onClick={onOptionSelect}>
      {options.map((option) => (
        <Menu.Item key={option.meta.name}>
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
      <MainButton type="bordered" title="Selected account" onClick={() => {}} />
    </Dropdown>
  );
};
