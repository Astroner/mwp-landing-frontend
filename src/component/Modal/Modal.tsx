import React, { FC, memo, ReactNode } from 'react';
import Portal from '../Portal';
import cn from './Modal.module.scss'

export interface IModal {
    onClose: VoidFunction
    children: ReactNode
}

const Modal: FC<IModal> = props => {
    return (
      <Portal>
        <div className={cn.root}>
            <div className={cn.modal}>
                <div className={cn.close} onClick={props.onClose}>CLOSE</div>
                {props.children}
            </div>
        </div>
      </Portal>
    );
}

export default memo(Modal)