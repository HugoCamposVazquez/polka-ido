import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useTopFeaturedProjects } from '../api/api/api';
import { MainButton } from '../shared/gui/MainButton';
import { TextArea } from '../shared/gui/TextArea';
import { TextField } from '../shared/gui/TextField';
import { ProjectCard } from '../shared/ProjectCard';
import { ProjectType } from '../types/ProjectType';
import { getCardDirection } from '../utils/cardDirectionUtil';
import { useWindowDimensions } from '../utils/windowDimensionsUtil';
import * as styles from './HomePage.styles';

export const HomePage = () => {
  const navigation = useHistory();

  const { width } = useWindowDimensions();

  const { data: topFeaturedProjects, isLoading: topFeaturedProjectsLoading } = useTopFeaturedProjects();

  const methods = useForm({
    defaultValues: {
      email: '',
      message: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ email, message }: any) => {
    try {
      console.log('test', email, message);
      // const { token } = await generalHTTP.login(email, message);
      // localStorage.setItem('token', token);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  if (topFeaturedProjectsLoading) {
    return null;
  }

  return (
    <div>
      <div className={styles.pageIntroContainerClassName}>
        <div className={styles.mainImageContainerClassName}>
          <img className={styles.mainImageStyle} src={process.env.PUBLIC_URL + '/ryu.png'} />
          <div style={styles.imageShadowStyle}></div>
        </div>
        <div className={styles.titleContainerParentStyle}>
          <div className={styles.titleContainerClassName}>
            <div className={styles.titleStyle}>LOREM IPSUM DOLOR SIT AMET</div>
            <div className={styles.subTitleStyle}>
              For athletes, high altitude produces two contradictory effects on performance. For explosive events
              (sprints up to 400 metres, long jump, triple jump)
            </div>
          </div>
        </div>
      </div>
      <div className={styles.featuredProjectsContainerClassName}>
        <div className={styles.featuredProjectsTitleStyle}>Featured projects</div>
        <div className={styles.featuredProjectsCardsContainerClassName}>
          {topFeaturedProjects?.data.map((project: ProjectType, index: number) => {
            return <ProjectCard key={index} project={project} direction={getCardDirection(width, index)} />;
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <div
            style={styles.viewAllProjectsStyle}
            onClick={() => {
              navigation.push('/launchpad');
            }}>
            View all projects
          </div>
          <img src={process.env.PUBLIC_URL + '/arrow_left.svg'} />
        </div>
      </div>
      <div className={styles.bottomImageContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={styles.customObjectClassName} style={styles.topLeftBottomRightNotch} />

          <div className={styles.mainImage2ContainerClassName}>
            <img className={styles.mainImage2Style} src={process.env.PUBLIC_URL + '/ryu2.png'} />
            <div style={styles.imageShadowStyle} />
          </div>
        </div>

        <div className={styles.tellUsAboutYourProjectParentClassName}>
          <div className={styles.tellUsAboutYourProjectTextClassName}>Tell us about your project</div>
          <FormProvider {...methods}>
            <form>
              <div style={styles.textFieldContainerStyle}>
                <TextField name="email" placeholder="E-mail" type={'bordered'} />
              </div>
              <div style={styles.textFieldContainerStyle}>
                <TextArea name="message" placeholder="Message" style={{ height: '8.38rem' }} />
              </div>
              <MainButton title="Send" type={'fill'} onClick={methods.handleSubmit(onSubmit)} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
