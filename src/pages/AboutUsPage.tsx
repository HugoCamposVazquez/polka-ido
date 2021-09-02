import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import person1 from '../assets/image1.png';
import person2 from '../assets/image2.png';
import person3 from '../assets/image3.png';
import person4 from '../assets/image4.png';
import ryu2 from '../assets/ryu2.png';
import ryu4 from '../assets/ryu4.png';
import { MainButton } from '../shared/gui/MainButton';
import { TextArea } from '../shared/gui/TextArea';
import { TextField } from '../shared/gui/TextField';
import { Footer } from '../shared/insets/user/Footer';
import { PersonCard } from '../shared/PersonCard';
import { getCardDirection } from '../utils/cardDirectionUtil';
import { useWindowDimensions } from '../utils/windowDimensionsUtil';
import * as homePageStyles from './HomePage.styles';
import * as projectDetailsStyles from './ProjectDetails/ProjectDetailsPage.styles';

export const AboutUsPage = () => {
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

  return (
    <div>
      <div className={homePageStyles.pageIntroContainerClassName}>
        <div className={homePageStyles.mainImageContainerClassName}>
          <img className={homePageStyles.mainImageStyle} src={ryu4} />
          <div style={homePageStyles.imageShadowStyle} />
        </div>
        <div className={homePageStyles.titleContainerParentStyle}>
          <div className={homePageStyles.titleContainerClassName}>
            <div className={homePageStyles.titleStyle}>ABOUT US</div>
            <div className={homePageStyles.subTitleStyle}>
              For athletes, high altitude produces two contradictory effects on performance. For explosive events
              (sprints up to 400 metres, long jump, triple jump)
            </div>
          </div>
        </div>
      </div>
      <div className={homePageStyles.featuredProjectsContainerClassName}>
        <div className={homePageStyles.featuredProjectsTitleStyle}>Our team</div>
        <div className={homePageStyles.featuredProjectsCardsContainerClassName}>
          <PersonCard key={0} direction={getCardDirection(width, 0)} name={'John Doe'} image={person1} />
          <PersonCard key={1} direction={getCardDirection(width, 1)} name={'Jessica Biel'} image={person2} />
          <PersonCard key={2} direction={getCardDirection(width, 2)} name={'Alan Smith'} image={person3} />
          <PersonCard key={3} direction={getCardDirection(width, 3)} name={'Antonia Gentry'} image={person4} />
        </div>
      </div>

      <div className={projectDetailsStyles.aboutTheProjectContainerClassName}>
        <div className={projectDetailsStyles.subtitleStyle}>Lorem ipsum</div>
        <div style={projectDetailsStyles.aboutTextStyle}>
          Physiological respiration involves the mechanisms that ensure that the composition of the functional residual
          capacity is kept constant, and equilibrates with the gases dissolved in the pulmonary capillary blood, and
          thus throughout the body. Thus, in precise usage, the words breathing and ventilation are hyponyms, not
          synonyms, of respiration; but this prescription is not consistently followed, even by most health care
          providers, because the term respiratory rate (RR) is a well-established term in health care, even though it
          would need to be consistently replaced with ventilation rate if the precise usage were to be followed.
        </div>
      </div>

      <div className={homePageStyles.bottomImageContainerClassName} style={{ marginTop: '10rem' }}>
        <div style={{ position: 'relative' }}>
          <div className={homePageStyles.customObjectClassName} style={homePageStyles.topLeftBottomRightNotch} />

          <div className={homePageStyles.mainImage2ContainerClassName}>
            <img className={homePageStyles.mainImage2Style} src={ryu2} />
            <div style={homePageStyles.imageShadowStyle} />
          </div>
        </div>

        <div className={homePageStyles.tellUsAboutYourProjectParentClassName}>
          <div className={homePageStyles.tellUsAboutYourProjectTextClassName}>Tell us about your project</div>
          <FormProvider {...methods}>
            <form>
              <div style={homePageStyles.textFieldContainerStyle}>
                <TextField name="email" placeholder="E-mail" mode={'dark'} styleType={'bordered'} />
              </div>
              <div style={homePageStyles.textFieldContainerStyle}>
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
