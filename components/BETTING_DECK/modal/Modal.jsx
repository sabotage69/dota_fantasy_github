import React, { useEffect, useRef } from 'react';
import Button from '../button/Button';
import CloseIcon from '../../CloseIcon';
import styles from './modal.module.css';

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
    const modalRef = useRef(null);
    useEffect(
        () => {
            if (show) {
                modalRef.current.classList.add(styles.visible);
            }
            else {
                modalRef.current.classList.remove(styles.visible);
            }
        },
        [
            show
        ]
    );
    return (
        <React.Fragment>
            <div ref={modalRef} style={backdropStyle} className={`${styles.modal__wrap}`}>
                <button onClick={onClose} className="modal-close">
                    <CloseIcon height="20px" width="20px" className={styles.close__icon} />
                </button>
                <div style={modalStyle} className={styles.modal}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;