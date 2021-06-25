import { sideColor, sideColor2, sideColor5 } from '../../utils/colorsUtil';
import { styled } from '../../utils/css';
import { headerHeight } from './Header';

export const headerContainerParentStyle = styled.cssStyle`
  flex: 1;
  position: fixed;
  width: 100%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
`;

export const mobileMenuItemStyle = styled.cssStyle`
  cursor: pointer;
`;

export const headerContainerStyle = styled.cssStyle`
  height: ${headerHeight.toString()}rem;
  width: 100%;
  position: relative;
  z-index: 2000;
  display: flex;
  align-items: center;
  border-bottom: 0.06rem solid ${sideColor2};
`;

export const headerContentStyle = styled.cssClassName`
  position: relative;
  padding-left: 7.5rem;
  padding-right: 7.5rem;
  display: flex;
  align-items: center;
  flex: 1;

  @media (max-width: 51.875rem) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const ryuTextStyle = styled.cssStyle`
  font-weight: 400;
  line-height: 0;
  font-size: 1.5rem;
  font-family: Odibee Sans;
  flex: 1;
  cursor: pointer;
`;

export const mobileMenuContainerStyle = styled.cssStyle`
  background-color: rgba(1, 1, 1, 0.85);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const menuItemNotSelectedStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
  margin-right: 1.38rem;

  a {
    color: ${sideColor};
    text-decoration: none;
  }

  :before {
    content: '';
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    margin-bottom: 0.13rem;
    display: inline-block;
    background-color: transparent;
    vertical-align: middle;
  }
`;

export const menuItemSelectedStyle = styled.cssClassName`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
  margin-right: 1.38rem;

  a {
    color: ${sideColor5};
    text-decoration: none;
  }

  :before {
    content: '';
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    margin-bottom: 0.13rem;
    display: inline-block;
    background-color: ${sideColor5};
    vertical-align: middle;
  }
`;

export const menuItemsContainerClassName = styled.cssClassName`
  display: flex;
  align-items: center;

  @media (max-width: 51.875rem) {
    display: none;
  }
`;

export const menuIconClassName = styled.cssClassName`
  @media (min-width: 51.875rem) {
    display: none;
  }
`;
