import { useWeb3React } from '@web3-react/core';
import { getUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';

import ryu3 from '../assets/ryu3.png';
import { config } from '../config';
import { useJoinedProjects } from '../hooks/apollo/useJoinedProjects';
import { usePlatformsStats } from '../hooks/apollo/usePlatformsStats';
import { useProjects } from '../hooks/apollo/useProjects';
import { Footer } from '../shared/insets/user/Footer';
import { LoadingData } from '../shared/LoadingData';
import { ProjectCard } from '../shared/ProjectCard';
import { SalesDto } from '../types/ProjectType';
import { getCardDirection } from '../utils/cardDirectionUtil';
import { sideColor3 } from '../utils/colorsUtil';
import { formatBalance, formatWei } from '../utils/numModifiyngFuncs';
import { useWindowDimensions } from '../utils/windowDimensionsUtil';
import * as styles from './LaunchpadPage.styles';

enum ProjectsView {
  featured,
  inProgress,
  upcoming,
  joined,
  all,
}

export const LaunchpadPage = () => {
  const { width } = useWindowDimensions();
  const { account } = useWeb3React();

  const { data: platformsData } = usePlatformsStats();
  const { data: projectsData, loading: projectLoading } = useProjects();
  const { data: joinedProjects, loading: joinedLoading } = useJoinedProjects(account?.toLowerCase() || '');

  const [shownProjects, setShownProjects] = useState(ProjectsView.upcoming);
  const setProjectView = (view: ProjectsView) => () => {
    setShownProjects(view);
  };

  const [projects, setProjects] = useState<SalesDto[]>([]);
  useEffect(() => {
    if (shownProjects === ProjectsView.upcoming)
      setProjects([...(projectsData?.sales || [])].filter((project) => getUnixTime(new Date()) < +project.startDate));
    if (shownProjects === ProjectsView.inProgress)
      setProjects(
        [...(projectsData?.sales || [])].filter(
          (project) => getUnixTime(new Date()) > +project.startDate && getUnixTime(new Date()) < +project.endDate,
        ),
      );
    if (shownProjects === ProjectsView.featured)
      setProjects([...(projectsData?.sales || [])].filter((project) => project.featured));
    if (shownProjects === ProjectsView.joined)
      setProjects(
        [...(projectsData?.sales || [])].filter((project) => joinedProjects?.some(({ id }) => id === project.id)),
      );
    if (shownProjects === ProjectsView.all) setProjects([...(projectsData?.sales || [])]);
  }, [shownProjects, projectsData?.sales.length, joinedProjects?.length, projectLoading, joinedLoading]);

  if (
    (projectLoading && shownProjects != ProjectsView.joined) ||
    (joinedLoading && shownProjects === ProjectsView.joined)
  ) {
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
                {platformsData?.platforms[0]
                  ? formatBalance(formatWei(platformsData?.platforms[0].fundsRaised), 3)
                  : '0'}{' '}
                {config.CURRENCY}
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
            style={shownProjects === ProjectsView.featured ? styles.selectedTabStyle : {}}
            onClick={setProjectView(ProjectsView.featured)}>
            Featured
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === ProjectsView.inProgress ? styles.selectedTabStyle : {}}
            onClick={setProjectView(ProjectsView.inProgress)}>
            In Progress
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === ProjectsView.upcoming ? styles.selectedTabStyle : {}}
            onClick={setProjectView(ProjectsView.upcoming)}>
            Upcoming
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === ProjectsView.joined ? styles.selectedTabStyle : {}}
            onClick={setProjectView(ProjectsView.joined)}>
            Joined
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === ProjectsView.all ? styles.selectedTabStyle : {}}
            onClick={setProjectView(ProjectsView.all)}>
            All
          </div>
        </div>
      </div>
      <div className={styles.projectsCardsContainerParentClassName}>
        <div className={styles.projectsCardsContainerClassName}>
          {!account && shownProjects === ProjectsView.joined ? (
            <div>Please connect your wallet to see the sales which you have joined.</div>
          ) : (
            projects.map((project, index: number) => {
              return <ProjectCard key={index} project={project} direction={getCardDirection(width, index)} />;
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
