import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { cs, styled } from '../../utils/css';

export const sidebarHeight = 7.5;

const sidebarContainerStyle = styled.cssStyle`
  height: ${sidebarHeight.toString()}rem;
  width: 100%;
  position: fixed;
  background-color: red;
  opacity: 0.4;
  z-index: 1000;
`;

export const Sidebar = withRouter((props) => {
  return <div style={sidebarContainerStyle}></div>;
});
