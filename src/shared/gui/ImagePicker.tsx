import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import removeIcon from '../../assets/remove_icon.svg';
import { cs } from '../../utils/css';
import * as styles from './ImagePicker.styles';
import { MainButton } from './MainButton';

type IProps = {
  name: string;
};

const mockedLink =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png';

export const ImagePicker = ({ name }: IProps) => {
  const { control, watch, reset } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <div>
              {watch(name) && (
                <div style={styles.imageContainerStyle}>
                  <div style={styles.imageParentStyle}>
                    <img style={styles.imageStyle} src={value} />
                    <img
                      style={styles.removeIconStyle}
                      src={removeIcon}
                      onClick={() => {
                        onChange(reset([name]));
                      }}
                    />
                  </div>
                </div>
              )}
              <MainButton
                title={'Upload image'}
                onClick={() => {
                  onChange(mockedLink);
                }}
                type={'bordered'}
                style={cs(styles.uploadImageButtonStyle, watch(name) ? { marginTop: '1.5rem' } : { marginTop: '0rem' })}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
