import { useWeb3React } from '@web3-react/core';
import { getUnixTime } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';

import ryu3 from '../assets/ryu3.png';
import { useJoinedProjects } from '../hooks/apollo/useJoinedProjects';
import { usePlatformsStats } from '../hooks/apollo/usePlatformsStats';
import { useProjects } from '../hooks/apollo/useProjects';
import { Footer } from '../shared/insets/user/Footer';
import { LoadingData } from '../shared/LoadingData';
import { ProjectCard } from '../shared/ProjectCard';
import { ProjectData } from '../types/ProjectType';
import { getCardDirection } from '../utils/cardDirectionUtil';
import { sideColor3 } from '../utils/colorsUtil';
import { useWindowDimensions } from '../utils/windowDimensionsUtil';
import * as styles from './LaunchpadPage.styles';

export const LaunchpadPage = () => {
  const [shownProjects, setShownProjects] = useState<'upcoming' | 'joined' | 'featured' | undefined>('upcoming');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const { width } = useWindowDimensions();
  const { account } = useWeb3React();

  const { data: platformsData } = usePlatformsStats();
  const { data: projectsData, loading: projectLoading } = useProjects();
  const { data: joinedProjects } = useJoinedProjects(account as string);

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
  const onClickFilterFeatured = useCallback((): void => {
    setShownProjects('featured');
    let featuredProjects: ProjectData[] = [];
    projectsData?.sales.map((project) => {
      if (project.featured) {
        featuredProjects.push(project);
      } else {
        featuredProjects = [];
      }
      setProjects(featuredProjects);
    });
  }, [projectsData]);

  const onClickFilterJoined = (): void => {
    setShownProjects('joined');
    const allJoinedProjects = joinedProjects?.filter(
      (joinedProject, index, arr) => index === arr.findIndex((project) => project.id === joinedProject.id),
    );
    if (allJoinedProjects) {
      setProjects(allJoinedProjects);
    } else {
      setProjects([]);
    }
  };

  const onClickShowAllProjects = useCallback((): void => {
    setShownProjects(undefined);
    const allProjects: ProjectData[] = [];
    projectsData?.sales.map((project) => {
      allProjects.push(project);
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
                {platformsData?.platforms[0] ? platformsData?.platforms[0].numOfProjects : '0'}
              </div>
            </div>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.normalTextStyle} style={{ flex: 1 }}>
                Funds raised
              </div>
              <div className={styles.boldTextStyle}>
                {platformsData?.platforms[0] ? platformsData?.platforms[0].fundsRaised : '0'} USDT
              </div>
            </div>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.normalTextStyle} style={{ flex: 1 }}>
                Users participated
              </div>
              <div className={styles.boldTextStyle}>
                {platformsData?.platforms[0] ? platformsData?.platforms[0].numOfUsers : '0'}
              </div>
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
      </div>
      <div className={styles.projectsCardsContainerParentClassName}>
        <div className={styles.projectsCardsContainerClassName}>
          {projects.map((project: ProjectData, index: number) => {
            return <ProjectCard key={index} project={project} direction={getCardDirection(width, index)} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
