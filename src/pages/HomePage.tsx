import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { MainButton } from '../shared/MainButton';
import { ProjectCard } from '../shared/ProjectCard';
import { TextField } from '../shared/TextField';
import { cs, styled } from '../utils/css';

const mainImageStyle = styled.cssStyle`
  position: absolute;
  height: 50rem;
  width: 57rem;
  top: 0;
  right: 0;
`;

const imageShadowStyle = styled.cssStyle`
  background: linear-gradient(180deg, rgba(1, 1, 1, 0) 91.75%, #010101 100%, #010101 100%),
    linear-gradient(70.6deg, #010101 13.02%, rgba(1, 1, 1, 0) 86.98%);
`;

const titleContainerParentStyle = styled.cssStyle`
  position: relative;
  display: flex;
  padding: 0 7.5rem;
`;

const titleContainerStyle = styled.cssStyle`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const titleStyle = styled.cssStyle`
  font-weight: 400;
  font-size: 4rem;
  line-height: 4.5rem;
  font-family: Odibee Sans;
  margin-top: 220px;
`;

const subTitleStyle = styled.cssStyle`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-top: 0.94rem;
  font-family: Titillium Web;
`;

const featuredProjectsTitleStyle = styled.cssStyle`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.4rem;
  font-family: Titillium Web;
  margin-bottom: 0.63rem;
`;

const featuredProjectsContainerStyle = styled.cssStyle`
  margin-top: 220px;
  margin-bottom: 160px;
  position: relative;
  padding: 0 7.5rem;
`;

const featuredProjectsCardsContainerClassName = styled.cssClassName`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 300px));
  gap: 1.25rem;

  @media (max-width: 1435px) {
    grid-template-columns: repeat(2, minmax(0, 300px));
  }

  @media (max-width: 830px) {
    grid-template-columns: repeat(1, minmax(0, 300px));
  }
`;

const mainImage2Style = styled.cssStyle`
  position: absolute;
  height: 526px;
  width: 792px;
  top: 20px;
  right: 120px;
`;

const tellUsAboutYourProjectTextStyle = styled.cssStyle`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.4rem;
  font-family: Titillium Web;
  width: 80%;
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

export const HomePage = () => {
  const methods = useForm({
    defaultValues: {
      email: '',
      message: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ email, message }: any) => {
    try {
      console.log('test');
      // const { token } = await generalHTTP.login(email, message);
      // localStorage.setItem('token', token);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  return (
    <div>
      <img style={mainImageStyle} src={process.env.PUBLIC_URL + '/ryu.png'} />
      <div style={cs(mainImageStyle, imageShadowStyle)}></div>
      <div style={titleContainerParentStyle}>
        <div style={titleContainerStyle}>
          <div style={titleStyle}>LOREM IPSUM DOLOR SIT AMET</div>
          <div style={subTitleStyle}>
            For athletes, high altitude produces two contradictory effects on performance. For explosive events (sprints
            up to 400 metres, long jump, triple jump)
          </div>
        </div>
      </div>
      <div style={featuredProjectsContainerStyle}>
        <div style={featuredProjectsTitleStyle}>Featured projects</div>
        <div className={featuredProjectsCardsContainerClassName}>
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
          <ProjectCard direction={'right'} />
          <ProjectCard direction={'left'} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <div
            style={{
              fontWeight: 600,
              marginRight: '10px',
              fontSize: '15px',
              fontFamily: 'Titillium Web',
              color: '#d2307a',
            }}>
            View all projects
          </div>
          <img src={process.env.PUBLIC_URL + '/arrow_left.svg'} />
        </div>
      </div>
      <div
        style={{
          height: '546px',
          position: 'relative',
          padding: '0 120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <div
          style={cs(
            {
              height: '120px',
              width: '120px',
              backgroundColor: '#d2307a',
              top: 0,
              right: 100,
              position: 'absolute',
            },
            topLeftBottomRightNotch,
          )}
        />
        {/* eslint-disable-next-line no-undef */}
        <img style={mainImage2Style} src={process.env.PUBLIC_URL + '/ryu2.png'} />
        <div style={cs(mainImage2Style, imageShadowStyle)} />
        <div style={{ minWidth: '200px', maxWidth: '400px', position: 'relative' }}>
          <div style={tellUsAboutYourProjectTextStyle}>Tell us about your project</div>
          <FormProvider {...methods}>
            <form>
              <TextField name="email" placeholder="E-mail" />
              <TextField name="message" placeholder="Message" />
              <MainButton title="Send" onClick={methods.handleSubmit(onSubmit)} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
