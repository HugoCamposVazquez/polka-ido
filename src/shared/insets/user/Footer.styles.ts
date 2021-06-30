import { sideColor3, sideColor5, sideColor6 } from '../../../utils/colorsUtil';
import { styled } from '../../../utils/css';

export const ryuTextStyle = styled.cssStyle`
  font-family: Odibee Sans;
  color: ${sideColor5};
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.69rem;
`;

export const ryu2021TextStyle = styled.cssStyle`
  font-family: Titillium Web;
  color: ${sideColor6};
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.52rem;
`;

export const linkTitleTextStyle = styled.cssClassName`
  font-family: Titillium Web;
  font-weight: bold;
  color: ${sideColor3};
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.88rem;
  margin-bottom: 0.5rem;

  @media (max-width: 51.875rem) {
    font-size: 0.875rem;
  }
`;

export const linkTextStyle = styled.cssClassName`
  font-family: Titillium Web;
  color: ${sideColor5};
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.9rem;
  margin: 0.13rem 0;
  text-decoration: none;

  @media (max-width: 51.875rem) {
    font-size: 0.875rem;
  }
`;

export const footerContainerClassName = styled.cssClassName`
  display: flex;
  margin-bottom: 2.5rem;
  margin-top: 7.88rem;
  margin-left: 7.5rem;
  margin-right: 7.5rem;

  @media (max-width: 51.875rem) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 3.13rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

export const footerLinksParentContainerClassName = styled.cssClassName`
  display: flex;
  flex: 1;
`;

export const footerLinksContainerClassName = styled.cssClassName`
  display: flex;
  flex: none;
  @media (max-width: 51.875rem) {
    flex-direction: column;
    align-items: center;
  }
`;

export const linksGroupsClassName = styled.cssClassName`
  margin-right: 5.94rem;
  min-width: fit-content;
  display: flex;
  flex-direction: column;

  @media (max-width: 51.875rem) {
    margin-right: 0;

    align-items: center;
    margin-top: 2.5rem;
  }
`;
export const footerCopyrightParentClassName = styled.cssClassName`
  display: block;
  flex: 1;
  @media (max-width: 51.875rem) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
