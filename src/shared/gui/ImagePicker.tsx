import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import removeIcon from '../../assets/remove_icon.svg';
import { sideColor } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import { MainButton } from './MainButton';

type IProps = {
  name: string;
};

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
                <div style={{ display: 'flex', marginLeft: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      style={{
                        height: '48px',
                        width: '48px',
                        marginRight: '6px',
                        marginTop: '6px',
                        objectFit: 'cover',
                      }}
                      src={value}
                    />
                    <img
                      style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
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
                  onChange(
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
                  );
                }}
                type={'bordered'}
                style={cs(
                  {
                    marginLeft: '16px',
                    color: sideColor,
                    borderColor: sideColor,
                    fontSize: '12px',
                    width: '102px',
                    height: '34px',
                  },
                  watch(name) ? { marginTop: '24px' } : { marginTop: '0px' },
                )}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
