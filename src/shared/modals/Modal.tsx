import React, { useEffect, useRef } from 'react';

import closeIcon from '../../assets/close_icon.svg';
import * as styles from './Modal.styles';

interface IProps {
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ closeModal, children, title }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      const dropdown = document.querySelectorAll('#accounts-dropdown');
      try {
        dropdown.forEach((element) => {
          if (element.contains(event.target as Node)) throw new Error();
        });
      } catch {
        return;
      }

      closeModal();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, closeModal]);

  return (
    <div style={styles.modalContainerStyle}>
      <div style={styles.topRightBottomLeftNotch} className={styles.modalStyle} ref={ref}>
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
