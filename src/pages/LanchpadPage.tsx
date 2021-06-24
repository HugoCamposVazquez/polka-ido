import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useLaunchpadDetails, useProjects } from '../api/api/api';
import { TextField } from '../shared/gui/TextField';
import { ProjectCard } from '../shared/ProjectCard';
import { ProjectStatus } from '../types/enums/ProjectStatus';
import getCardDirection from '../utils/cardDirectionUtil';
import { sideColor, sideColor2, sideColor3, sideColor9 } from '../utils/colorsUtil';
import { styled } from '../utils/css';
import useWindowDimensions from '../utils/windowDimensionsUtil';

const mainImageContainerClassName = styled.cssClassName`
  position: absolute;
  height: 28.6rem;
  width: 43.1rem;
  top: 1.25rem;
  right: 1.25rem;

  @media (max-width: 51.875rem) {
    position: relative;
    height: auto;
    width: auto;
    top: 0;
    right: 0;
    margin-top: 1.25rem;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
`;

const mainImageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;

  @media (max-width: 51.875rem) {
    position: relative;
  }
`;

const imageContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 29.8rem;
  position: relative;
  padding: 0 7.5rem;
  margin-top: 11.25rem;

  @media (max-width: 51.875rem) {
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
  }
`;

const customObjectClassName = styled.cssClassName`
  position: absolute;
  height: 7.5rem;
  width: 7.5rem;
  background-color: ${sideColor3};
  top: 0;
  right: 0;
`;
const imageShadowStyle = styled.cssStyle`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;

  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, ${sideColor9} 100%, ${sideColor9} 100%),
    linear-gradient(70.6deg, ${sideColor9} 13.02%, rgba(1, 1, 1, 0) 86.98%);
`;

const topLeftBottomRightNotch = styled.cssStyle`
  --notchSize: 1.63rem;

  clip-path: polygon(
    0% var(--notchSize),
    var(--notchSize) 0%,
    calc(100%) 0%,
    100% var(--notchSize),
    100% calc(100% - var(--notchSize)),
    calc(100% - var(--notchSize)) 100%,
    0% 100%,
    0% calc(100% - var(--notchSize))
  );
`;

const selectedTabStyle = styled.cssStyle`
  border-bottom: 0.25rem solid ${sideColor3};
`;

const searchFormStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  align-items: center;
`;

const searchIconStyle = styled.cssStyle`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

const searchFormContainerStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  border-bottom: 0.06rem solid ${sideColor};
`;

const launchpadDetailsItemStyle = styled.cssStyle`
  display: flex;
  margin-top: 0.75rem;
`;

const launchpadParentClassName = styled.cssClassName`
  min-width: 18.75rem;
  max-width: min-content;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 51.875rem) {
    padding: 0 1.5rem;
    margin-bottom: 2.5rem;
    max-width: initial;
  }
`;

const launchpadTextClassName = styled.cssClassName`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;

  @media (max-width: 51.875rem) {
    font-size: 2.63rem;
    line-height: 2.9rem;
  }
`;

const boldTextStyle = styled.cssClassName`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
`;

const normalTextStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.9rem;
  font-family: Titillium Web;
`;

const projectsCardsHeaderClassName = styled.cssClassName`
  padding: 0 7.5rem;
  display: flex;
  border-bottom: 0.06rem solid ${sideColor2};
  margin-top: 2.5rem;

  @media (max-width: 51.875rem) {
    padding: 0 1.5rem;
    margin-top: 2.5rem;
  }
`;

const projectsCardsHeaderItemClassName = styled.cssClassName`
  margin-right: 2.25rem;
  padding-bottom: 0.94rem;
  padding-top: 0.94rem;
  padding-left: 0.31rem;
  padding-right: 0.31rem;
  cursor: pointer;

  @media (max-width: 51.875rem) {
    margin-right: 1.5rem;
  }
`;

const projectsCardsContainerParentClassName = styled.cssClassName`
  margin-top: 1.88rem;
  margin-left: 7.5rem;
  margin-right: 7.5rem;

  @media (max-width: 51.875rem) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const searchParentClassName = styled.cssClassName`
  display: flex;
  align-items: center;

  @media (max-width: 51.875rem) {
    display: none;
  }
`;

const projectsCardsContainerClassName = styled.cssClassName`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 89.6875rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 51.875rem) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const LaunchpadPage = () => {
  const [shownProjects, setShownProjects] = useState<ProjectStatus | undefined>('upcoming');
  const [searchTextVisible, setSearchTextVisible] = useState<boolean>(false);

  const { data: projects, isLoading: projectsLoading } = useProjects(shownProjects);
  const { data: launchpadDetails, isLoading: launchpadDetailsLoading } = useLaunchpadDetails();

  const { width } = useWindowDimensions();

  const methods = useForm({
    defaultValues: {
      search: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSearch = async ({ search }: any) => {
    try {
      console.log('search', search);
      // const { token } = await generalHTTP.login(email, message);
      // localStorage.setItem('token', token);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  if (projectsLoading || launchpadDetailsLoading) {
    return null;
  }

  return (
    <div>
      <div className={imageContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={customObjectClassName} style={topLeftBottomRightNotch} />

          <div className={mainImageContainerClassName}>
            <img className={mainImageStyle} src={process.env.PUBLIC_URL + '/ryu3.png'} />
            <div style={imageShadowStyle} />
          </div>
        </div>

        <div className={launchpadParentClassName}>
          <div className={launchpadTextClassName}>LAUNCHPAD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={launchpadDetailsItemStyle}>
              <div className={boldTextStyle} style={{ flex: 1, color: `${sideColor3}` }}>
                Projects launched
              </div>
              <div className={boldTextStyle} style={{ color: `${sideColor3}` }}>
                {launchpadDetails?.data.projectsLaunched}
              </div>
            </div>
            <div style={launchpadDetailsItemStyle}>
              <div className={normalTextStyle} style={{ flex: 1 }}>
                Funds raised
              </div>
              <div className={boldTextStyle}>{launchpadDetails?.data.fundsRaised} USDT</div>
            </div>
            <div style={launchpadDetailsItemStyle}>
              <div className={normalTextStyle} style={{ flex: 1 }}>
                Users participated
              </div>
              <div className={boldTextStyle}>{launchpadDetails?.data.usersParticipated}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={projectsCardsHeaderClassName}>
        <div style={{ flex: 1, display: 'flex' }}>
          <div
            className={projectsCardsHeaderItemClassName}
            style={shownProjects === 'upcoming' ? selectedTabStyle : {}}
            onClick={() => {
              setShownProjects('upcoming');
            }}>
            Upcoming
          </div>
          <div
            className={projectsCardsHeaderItemClassName}
            style={shownProjects === 'featured' ? selectedTabStyle : {}}
            onClick={() => {
              setShownProjects('featured');
            }}>
            Featured
          </div>
          <div
            className={projectsCardsHeaderItemClassName}
            style={shownProjects === 'joined' ? selectedTabStyle : {}}
            onClick={() => {
              setShownProjects('joined');
            }}>
            Joined
          </div>
          <div
            className={projectsCardsHeaderItemClassName}
            style={shownProjects === undefined ? selectedTabStyle : {}}
            onClick={() => {
              setShownProjects(undefined);
            }}>
            All
          </div>
        </div>
        <div className={searchParentClassName} style={searchTextVisible ? { width: '18.8rem' } : {}}>
          {!searchTextVisible && (
            <img
              style={searchIconStyle}
              src={process.env.PUBLIC_URL + '/search_icon.svg'}
              onClick={() => {
                setSearchTextVisible(true);
              }}
            />
          )}
          {searchTextVisible && (
            <div style={searchFormContainerStyle}>
              <FormProvider {...methods}>
                <form style={searchFormStyle}>
                  <TextField name="search" placeholder="Search here" type={'none'} autoFocus={true} />
                  <img
                    style={searchIconStyle}
                    src={process.env.PUBLIC_URL + '/search_icon.svg'}
                    onClick={methods.handleSubmit(onSearch)}
                  />
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      </div>
      <div className={projectsCardsContainerParentClassName}>
        <div className={projectsCardsContainerClassName}>
          {projects?.data.map((project, index) => {
            return <ProjectCard key={index} project={project} direction={getCardDirection(width, index)} />;
          })}
        </div>
      </div>
    </div>
  );
};
