import { toast } from 'react-toastify';

import { sideColor3, sideColor5 } from './colorsUtil';

export const notifyTransactionConfirmation = (dataToDisplay: JSX.Element | string, toastId: string): void => {
  toast.loading(dataToDisplay, {
    position: 'top-center',
    style: { color: sideColor3, backgroundColor: sideColor5 },
    toastId: toastId,
  });
};

export const updateNotifySuccess = (
  dataToDisplay: JSX.Element | string,
  toastId: string,
  apperanceTime: number,
): void => {
  toast.update(toastId, {
    render: dataToDisplay,
    type: 'success',
    isLoading: false,
    closeOnClick: true,
    autoClose: apperanceTime,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};

export const updateNotifyError = (dataToDisplay: JSX.Element | string, toastId: string): void => {
  toast.update(toastId, {
    render: dataToDisplay,
    type: 'error',
    isLoading: false,
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};

export const notifySuccess = (dataToDisplay: JSX.Element | string, apperanceTime: number): void => {
  toast(dataToDisplay, {
    position: 'top-center',
    type: 'success',
    isLoading: false,
    closeOnClick: true,
    autoClose: apperanceTime,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};

export const notifyError = (dataToDisplay: JSX.Element | string, apperanceTime: number): void => {
  toast(dataToDisplay, {
    position: 'top-center',
    type: 'error',
    isLoading: false,
    closeOnClick: true,
    autoClose: apperanceTime,
    hideProgressBar: false,
    pauseOnHover: false,
  });
};
