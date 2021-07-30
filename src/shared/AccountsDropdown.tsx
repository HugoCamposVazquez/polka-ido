import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Button, Dropdown, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React from 'react';

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
        <Menu.Item key={option.meta.name}>{option.meta.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']}>
      <Button>Selected account</Button>
    </Dropdown>
  );
};
