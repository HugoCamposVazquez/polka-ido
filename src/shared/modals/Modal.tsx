import React from 'react';

import closeIcon from '../../assets/close_icon.svg';
import * as styles from './Modal.styles';

interface IProps {
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ closeModal, children, title }: IProps) => {
  return (
    <div style={styles.modalContainerStyle}>
      <div style={styles.topRightBottomLeftNotch} className={styles.modalStyle}>
        <div style={styles.titleParentStyle}>
          <div style={styles.titleTextStyle}>{title}</div>
          <div style={styles.closeIconParentStyle}>
            <img src={closeIcon} style={styles.closeIconStyle} onClick={closeModal} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
