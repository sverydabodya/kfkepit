import React, { ReactNode } from 'react';
import classes from './Modal.module.scss'

interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
    return (
        <div
            className={`${active ? classes.modal + ' ' + classes.active : classes.modal}`}
            onClick={() => setActive(false)}
        >
            <div className={classes.modal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
