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
  onImageUpload: (imgUrl: string) => void;
};

export const ImagePicker = ({ name, onImageUpload }: IProps) => {
  const { control, watch, setValue, getValues } = useFormContext();
  const uploadInputRef = useRef();

  // TODO: Handle error
  const { writeData, loading } = useWriteFileToIPFS();

  // Uploads immediately an image to IPFS after it's been selected
  // Maybe should consider upload only after form is submitted?
  const onImageChange = useCallback(async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      const form = new FormData();
      form.append('file', image);
      const imageUploadResponse = await writeData(form);
      if (imageUploadResponse) {
        const imgUrl = `ipfs://${imageUploadResponse.IpfsHash}`;
        onImageUpload(imgUrl);
        setValue(name, imgUrl);
      }
    }
  }, []);

  const onImageDelete = () => {
    setValue(name, null);
    getValues();
  };

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
