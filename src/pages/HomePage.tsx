import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import arrowLeft from '../assets/arrow_left.svg';
import ryu from '../assets/ryu.png';
import ryu2 from '../assets/ryu2.png';
import { useProjects } from '../hooks/apollo/useProjects';
import { MainButton } from '../shared/gui/MainButton';
import { TextArea } from '../shared/gui/TextArea';
import { TextField } from '../shared/gui/TextField';
import { Footer } from '../shared/insets/user/Footer';
import { ProjectCard } from '../shared/ProjectCard';
import { ProjectCardLoading } from '../shared/ProjectCardLoading';
import { getCardDirection } from '../utils/cardDirectionUtil';
import { useWindowDimensions } from '../utils/windowDimensionsUtil';
import * as styles from './HomePage.styles';

export const HomePage = () => {
  const navigation = useHistory();

  const { width } = useWindowDimensions();

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

  const { data, loading } = useProjects(4, false);

  return (
    <div>
      <div className={styles.pageIntroContainerClassName}>
        <div className={styles.mainImageContainerClassName}>
          <img className={styles.mainImageStyle} src={ryu} />
          <div style={styles.imageShadowStyle} />
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
          {!loading &&
            data?.sales.map((project, index) => (
              <ProjectCard key={project.id} project={project} direction={getCardDirection(width, index)} />
            ))}
          {loading &&
            [0].map((_, index: number) => (
              <ProjectCardLoading key={index} direction={getCardDirection(width, index)} />
            ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <div
            style={styles.viewAllProjectsStyle}
            onClick={() => {
              navigation.push('/launchpad');
            }}>
            View all projects
          </div>
          <img src={arrowLeft} />
        </div>
      </div>
      <div className={styles.bottomImageContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={styles.customObjectClassName} style={styles.topLeftBottomRightNotch} />

          <div className={styles.mainImage2ContainerClassName}>
            <img className={styles.mainImage2Style} src={ryu2} />
            <div style={styles.imageShadowStyle} />
          </div>
        </div>

        <div className={styles.tellUsAboutYourProjectParentClassName}>
          <div className={styles.tellUsAboutYourProjectTextClassName}>Tell us about your project</div>
          <FormProvider {...methods}>
            <form>
              <div style={styles.textFieldContainerStyle}>
                <TextField name="email" placeholder="E-mail" mode={'dark'} type={'bordered'} />
              </div>
              <div style={styles.textFieldContainerStyle}>
                <TextArea name="message" placeholder="Message" mode={'dark'} style={{ height: '8.38rem' }} />
              </div>
              <MainButton title="SEND" type={'fill'} onClick={methods.handleSubmit(onSubmit)} />
            </form>
          </FormProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};
