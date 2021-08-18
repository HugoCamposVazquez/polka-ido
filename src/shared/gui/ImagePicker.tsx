import { Spin } from 'antd';
import FormData from 'form-data';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import removeIcon from '../../assets/remove_icon.svg';
import { useWriteFileToIPFS } from '../../hooks/ipfs/useWriteFileToIPFS';
import { cs } from '../../utils/css';
import * as styles from './ImagePicker.styles';
import { MainButton } from './MainButton';

type IProps = {
  name: string;
};

export const ImagePicker = ({ name }: IProps) => {
  const { control, watch, setValue, getValues } = useFormContext();
  const uploadInputRef = useRef();

  // TODO: Handle error
  const { writeData, response: imageUploadResponse, loading } = useWriteFileToIPFS();

  // Uploads immediately an image to IPFS after it's been selected
  // Maybe should consider upload only after form is submitted?
  const onImageChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      const form = new FormData();
      form.append('file', image);
      writeData(form);
    }
  }, []);

  React.useEffect(() => {
    if (imageUploadResponse) {
      const imgUrl = `${process.env.REACT_APP_IPFS_GATEWAY}${imageUploadResponse.IpfsHash}`;
      setValue(name, imgUrl);
    }
  }, [imageUploadResponse]);

  const onImageDelete = () => {
    setValue(name, null);
    getValues();
  };

  console.log('loading: ', loading);

  return (
    <div className={styles.containerStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <div>
              <div style={styles.imageContainerStyle}>
                {loading ? <Spin /> : null}
                {watch(name) && (
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
                )}
              </div>

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
