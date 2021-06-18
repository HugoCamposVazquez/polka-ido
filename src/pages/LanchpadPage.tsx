import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useLaunchpadDetails, useProjects } from '../api/api/api';
import { TextField } from '../shared/gui/TextField';
import { ProjectCard } from '../shared/ProjectCard';
import { ProjectStatus } from '../types/enums/ProjectStatus';
import { cs, styled } from '../utils/css';
import getCardDirection from '../utils/get-card-direction';
import useWindowDimensions from '../utils/use-window-dimensions';

const mainImageContainerClassName = styled.cssClassName`
  position: absolute;
  height: 457px;
  width: 690px;
  top: 20px;
  right: 20px;

  @media (max-width: 830px) {
    position: relative;
    height: auto;
    width: auto;
    top: 0;
    right: 0;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const mainImageStyle = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;

  @media (max-width: 830px) {
    position: relative;
  }
`;

const imageContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 477px;
  position: relative;
  padding: 0 120px;
  margin-top: 180px;

  @media (max-width: 830px) {
    height: auto;
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
  }
`;

const customObjectClassName = styled.cssClassName`
  position: absolute;
  height: 120px;
  width: 120px;
  background-color: #d2307a;
  top: 0;
  right: 0;
`;
const imageShadowStyle = styled.cssStyle`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;

  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, #010101 100%, #010101 100%),
    linear-gradient(70.6deg, #010101 13.02%, rgba(1, 1, 1, 0) 86.98%);
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
  border-bottom: 4px solid #d2307a;
`;

const searchFormStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  align-items: center;
`;

const searchIconStyle = styled.cssStyle`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const searchFormContainerStyle = styled.cssStyle`
  display: flex;
  flex: 1;
  border-bottom: 1px solid #b8b8b8;
`;

const launchpadDetailsItemStyle = styled.cssStyle`
  display: flex;
  margin-top: 12px;
`;

const launchpadParentClassName = styled.cssClassName`
  min-width: 300px;
  max-width: min-content;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 830px) {
    padding: 0 24px;
    margin-bottom: 40px;
    max-width: initial;
  }
`;

const launchpadTextClassName = styled.cssClassName`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;

  @media (max-width: 830px) {
    font-size: 42px;
    line-height: 46.54px;
  }
`;

const boldTextStyle = styled.cssClassName`
  font-weight: 700;
  font-size: 20px;
  line-height: 30.42px;
  font-family: Titillium Web;
`;

const normalTextStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 20px;
  line-height: 30.42px;
  font-family: Titillium Web;
`;

const projectsCardsHeaderClassName = styled.cssClassName`
  padding: 0 120px;
  display: flex;
  border-bottom: 1px solid #292929;
  margin-top: 40px;

  @media (max-width: 830px) {
    padding: 0 24px;
    margin-top: 40px;
  }
`;

const projectsCardsHeaderItemClassName = styled.cssClassName`
  margin-right: 36px;
  padding-bottom: 15px;
  padding-top: 15px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;

  @media (max-width: 830px) {
    margin-right: 24px;
  }
`;

const projectsCardsContainerParentClassName = styled.cssClassName`
  margin-top: 30px;
  margin-left: 120px;
  margin-right: 120px;

  @media (max-width: 830px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const searchParentClassName = styled.cssClassName`
  display: flex;
  align-items: center;

  @media (max-width: 830px) {
    display: none;
  }
`;

const projectsCardsContainerClassName = styled.cssClassName`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 1435px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 830px) {
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
              <div className={boldTextStyle} style={{ flex: 1, color: '#D2307A' }}>
                Projects launched
              </div>
              <div className={boldTextStyle} style={{ color: '#D2307A' }}>
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
        <div className={searchParentClassName} style={searchTextVisible ? { width: '300px' } : {}}>
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
