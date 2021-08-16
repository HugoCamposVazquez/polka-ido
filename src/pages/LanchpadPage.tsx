import { getUnixTime } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ryu3 from '../assets/ryu3.png';
import searchIcon from '../assets/search_icon.svg';
import { usePlatformsStats } from '../hooks/apollo/usePlatformsStats';
import { useProjects } from '../hooks/apollo/useProjects';
import { TextField } from '../shared/gui/TextField';
import { Footer } from '../shared/insets/user/Footer';
import { LoadingData } from '../shared/LoadingData';
import { ProjectCard } from '../shared/ProjectCard';
import { ProjectData } from '../types/ProjectType';
import { getCardDirection } from '../utils/cardDirectionUtil';
import { sideColor3 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import { useWindowDimensions } from '../utils/windowDimensionsUtil';
import * as styles from './LaunchpadPage.styles';

export const LaunchpadPage = () => {
  const [shownProjects, setShownProjects] = useState<'upcoming' | 'joined' | 'featured' | undefined>('upcoming');
  const [searchTextVisible, setSearchTextVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const { width } = useWindowDimensions();

  const methods = useForm({
    defaultValues: {
      search: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const { data: platformsData } = usePlatformsStats();
  const { data: projectsData, loading: projectLoading } = useProjects();

  const filterUpcoming = useCallback((): void => {
    setShownProjects('upcoming');
    let upcomingProjects: ProjectData[] = [];
    projectsData?.sales.map((project) => {
      if (getUnixTime(new Date()) < +project.startDate) {
        upcomingProjects.push(project);
      } else {
        upcomingProjects = [];
      }
      setProjects(upcomingProjects);
    });
  }, [projectsData]);

  const onSearch = async ({ search }: any) => {
    try {
      // Cant Filter by name, missing data at the moment
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  const onClickFilterFeatured = useCallback((): void => {
    setShownProjects('featured');
    let featuredProjects: ProjectData[] = [];
    projectsData?.sales.map((project) => {
      if (!project.featured) {
        featuredProjects.push(project);
      } else {
        featuredProjects = [];
      }
      setProjects(featuredProjects);
    });
  }, [projectsData]);

  const onClickFilterJoined = (): void => {
    setShownProjects('joined');
    setProjects([]);
  };

  const onClickShowAllProjects = useCallback((): void => {
    setShownProjects(undefined);
    let allProjects: ProjectData[] = [];
    projectsData?.sales.map((project) => {
      if (!project.featured) {
        allProjects.push(project);
      } else {
        allProjects = [];
      }
      setProjects(allProjects);
    });
  }, [projectsData]);

  useEffect(() => {
    filterUpcoming();
  }, [projectsData]);

  if (projectLoading) {
    return <LoadingData />;
  }

  return (
    <div>
      <div className={styles.imageContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={styles.customObjectClassName} style={styles.topLeftBottomRightNotch} />

          <div className={styles.mainImageContainerClassName}>
            <img className={styles.mainImageStyle} src={ryu3} />
            <div style={styles.imageShadowStyle} />
          </div>
        </div>

        <div className={styles.launchpadParentClassName}>
          <div className={styles.launchpadTextClassName}>LAUNCHPAD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.boldTextStyle} style={{ flex: 1, color: `${sideColor3}` }}>
                Projects launched
              </div>
              <div className={styles.boldTextStyle} style={{ color: `${sideColor3}` }}>
                {platformsData?.platforms[0].numOfProjects}
              </div>
            </div>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.normalTextStyle} style={{ flex: 1 }}>
                Funds raised
              </div>
              <div className={styles.boldTextStyle}>{platformsData?.platforms[0].fundsRaised} USDT</div>
            </div>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.normalTextStyle} style={{ flex: 1 }}>
                Users participated
              </div>
              <div className={styles.boldTextStyle}>{platformsData?.platforms[0].numOfUsers}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.projectsCardsHeaderClassName}>
        <div style={{ flex: 1, display: 'flex' }}>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === 'upcoming' ? styles.selectedTabStyle : {}}
            onClick={filterUpcoming}>
            Upcoming
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === 'featured' ? styles.selectedTabStyle : {}}
            onClick={onClickFilterFeatured}>
            Featured
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === 'joined' ? styles.selectedTabStyle : {}}
            onClick={onClickFilterJoined}>
            Joined
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === undefined ? styles.selectedTabStyle : {}}
            onClick={onClickShowAllProjects}>
            All
          </div>
        </div>
        <div className={styles.searchParentClassName} style={searchTextVisible ? { width: '18.8rem' } : {}}>
          {!searchTextVisible && (
            <img
              style={cs(styles.searchIconStyle, { marginBottom: '0.06rem' })}
              src={searchIcon}
              onClick={() => {
                setSearchTextVisible(true);
              }}
            />
          )}
          {searchTextVisible && (
            <div style={styles.searchFormContainerStyle}>
              <FormProvider {...methods}>
                <form style={styles.searchFormStyle}>
                  <TextField name="search" placeholder="Search here" type={'none'} mode={'dark'} autoFocus={true} />
                  <img style={styles.searchIconStyle} src={searchIcon} onClick={methods.handleSubmit(onSearch)} />
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      </div>
      <div className={styles.projectsCardsContainerParentClassName}>
        <div className={styles.projectsCardsContainerClassName}>
          {projects.map((project: ProjectData, index: number) => {
            return <ProjectCard key={index} project={project} direction={getCardDirection(width, index)} />;
          })}
          {projectLoading &&
            projects.map((el: ProjectData, index: number) => (
              <ProjectCard key={index} direction={getCardDirection(width, index)} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
