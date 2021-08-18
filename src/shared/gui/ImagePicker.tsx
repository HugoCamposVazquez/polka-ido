import React, { ChangeEvent, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import removeIcon from '../../assets/remove_icon.svg';
import { cs } from '../../utils/css';
import * as styles from './ImagePicker.styles';
import { MainButton } from './MainButton';

type IProps = {
  name: string;
  onUpload: (file: File) => void;
  // onDelete: () => void;
};

export const ImagePicker = ({ name, onUpload }: IProps) => {
  const { control, watch, setValue, getValues } = useFormContext();
  const uploadInputRef = useRef();

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue(name, URL.createObjectURL(e.target.files[0]));
      getValues();
      onUpload(e.target.files[0]);
    }
  };

  const onImageDelete = () => {
    // TODO: Implement integration
    setValue(name, null);
  };

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
                          onImageDelete();
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
                onChange={onImageChange}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
