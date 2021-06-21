import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useTopFeaturedProjects } from '../api/api/api';
import { MainButton } from '../shared/gui/MainButton';
import { TextArea } from '../shared/gui/TextArea';
import { TextField } from '../shared/gui/TextField';
import { ProjectCard } from '../shared/ProjectCard';
import { ProjectType } from '../types/ProjectType';
import { styled } from '../utils/css';
import getCardDirection from '../utils/get-card-direction';
import useWindowDimensions from '../utils/use-window-dimensions';

const pageIntroContainerClassName = styled.cssClassName`
  display: block;
  @media (max-width: 830px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const mainImageContainerClassName = styled.cssClassName`
  position: absolute;
  height: 50rem;
  width: 57rem;
  top: 0;
  right: 0;

  @media (max-width: 830px) {
    position: relative;
    height: auto;
    width: auto;
    margin-top: 20px;
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

const imageShadowStyle = styled.cssStyle`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;

  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, #010101 100%, #010101 100%),
    linear-gradient(70.6deg, #010101 13.02%, rgba(1, 1, 1, 0) 86.98%);
`;

const titleContainerParentStyle = styled.cssClassName`
  position: relative;
  display: flex;
  padding: 0 7.5rem;

  @media (max-width: 830px) {
    padding: 0 24px;
  }
`;

const titleContainerClassName = styled.cssClassName`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 830px) {
    flex: 1;
  }
`;

const titleStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;
  margin-top: 220px;

  @media (max-width: 830px) {
    font-size: 42px;

    line-height: 46.54px;
  }
`;

const subTitleStyle = styled.cssClassName`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-top: 0.94rem;
  font-family: Titillium Web;

  @media (max-width: 830px) {
    font-size: 14px;
    line-height: 19.6px;
  }
`;

const featuredProjectsTitleStyle = styled.cssClassName`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.4rem;
  font-family: Titillium Web;
  margin-bottom: 0.63rem;

  @media (max-width: 830px) {
    font-size: 26px;
    line-height: 39.55px;
  }
`;

const featuredProjectsContainerClassName = styled.cssClassName`
  margin-top: 220px;
  margin-bottom: 160px;
  position: relative;
  padding: 0 7.5rem;

  @media (max-width: 830px) {
    margin-top: 36px;
    margin-bottom: 80px;
    padding: 0 24px;
  }
`;

const featuredProjectsCardsContainerClassName = styled.cssClassName`
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

const mainImage2ContainerClassName = styled.cssClassName`
  position: absolute;
  height: 526px;
  width: 792px;
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

const mainImage2Style = styled.cssClassName`
  position: absolute;
  height: 100%;
  width: 100%;

  @media (max-width: 830px) {
    position: relative;
  }
`;

const bottomImageContainerClassName = styled.cssClassName`
  display: flex;
  flex-direction: column;
  height: 546px;
  position: relative;
  padding: 0 120px;

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

const tellUsAboutYourProjectParentClassName = styled.cssClassName`
  min-width: 350px;
  max-width: 40%;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 830px) {
    padding: 0 24px;
    max-width: initial;
    margin-bottom: 40px;
  }
`;

const tellUsAboutYourProjectTextClassName = styled.cssClassName`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.4rem;
  font-family: Titillium Web;
  width: 60%;

  @media (max-width: 1430px) {
    width: 75%;
  }

  @media (max-width: 830px) {
    width: 100%;
    font-size: 26px;
    line-height: 39.55px;
  }
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

const viewAllProjectsStyle = styled.cssStyle`
  font-weight: 600;
  margin-right: 10px;
  font-size: 15px;
  font-family: Titillium Web;
  color: #d2307a;
  cursor: pointer;
`;

const textFieldContainerStyle = styled.cssStyle`
  margin: 36px 0;
`;

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

  console.log(topFeaturedProjects);

  return (
    <div>
      <div className={pageIntroContainerClassName}>
        <div className={mainImageContainerClassName}>
          <img className={mainImageStyle} src={process.env.PUBLIC_URL + '/ryu.png'} />
          <div style={imageShadowStyle}></div>
        </div>
        <div className={titleContainerParentStyle}>
          <div className={titleContainerClassName}>
            <div className={titleStyle}>LOREM IPSUM DOLOR SIT AMET</div>
            <div className={subTitleStyle}>
              For athletes, high altitude produces two contradictory effects on performance. For explosive events
              (sprints up to 400 metres, long jump, triple jump)
            </div>
          </div>
        </div>
      </div>
      <div className={featuredProjectsContainerClassName}>
        <div className={featuredProjectsTitleStyle}>Featured projects</div>
        <div className={featuredProjectsCardsContainerClassName}>
          {topFeaturedProjects?.data.map((project: ProjectType, index: number) => {
            return <ProjectCard key={index} project={project} direction={getCardDirection(width, index)} />;
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <div
            style={viewAllProjectsStyle}
            onClick={() => {
              navigation.push('/launchpad');
            }}>
            View all projects
          </div>
          <img src={process.env.PUBLIC_URL + '/arrow_left.svg'} />
        </div>
      </div>
      <div className={bottomImageContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={customObjectClassName} style={topLeftBottomRightNotch} />

          <div className={mainImage2ContainerClassName}>
            <img className={mainImage2Style} src={process.env.PUBLIC_URL + '/ryu2.png'} />
            <div style={imageShadowStyle} />
          </div>
        </div>

        <div className={tellUsAboutYourProjectParentClassName}>
          <div className={tellUsAboutYourProjectTextClassName}>Tell us about your project</div>
          <FormProvider {...methods}>
            <form>
              <div style={textFieldContainerStyle}>
                <TextField name="email" placeholder="E-mail" type={'bordered'} />
              </div>
              <div style={textFieldContainerStyle}>
                <TextArea name="message" placeholder="Message" style={{ height: '134px' }} />
              </div>
              <MainButton title="Send" type={'fill'} onClick={methods.handleSubmit(onSubmit)} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
