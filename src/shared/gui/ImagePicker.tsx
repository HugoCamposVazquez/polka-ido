import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import removeIcon from '../../assets/remove_icon.svg';
import { cs } from '../../utils/css';
import * as styles from './ImagePicker.styles';
import { MainButton } from './MainButton';

type IProps = {
  name: string;
};

export const ImagePicker = ({ name }: IProps) => {
  const { control, watch, setValue, getValues } = useFormContext();
  const uploadInputRef = useRef();

  return (
    <div className={styles.containerStyle}>
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
                        onChange(() => {
                          setValue(name, null);
                        });
                      }}
                    />
                  </div>
                </div>
              )}
              <MainButton
                title={'Upload image'}
                type={'bordered'}
                style={cs(styles.uploadImageButtonStyle, watch(name) ? { marginTop: '1.5rem' } : { marginTop: '0rem' })}
                onClick={() => {
                  (uploadInputRef!.current! as any).click();
                }}
              />
              <input
                type="file"
                accept="image/*"
                multiple={false}
                className="input-field-hidden"
                ref={uploadInputRef as any}
                onChange={async (e) => {
                  // @ts-ignore
                  const files = [...e.target.files];
                  setValue(name, URL.createObjectURL(files[0]));
                  getValues();
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
