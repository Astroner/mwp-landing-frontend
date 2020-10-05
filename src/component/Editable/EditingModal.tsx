import React, { FC, memo, useState } from 'react';
import Modal from '../Modal';

export interface IEditingModal {
    onClose: VoidFunction
    onSuccess: (nextValue: string) => void
    initialValue: string
}

const EditingModal: FC<IEditingModal> = ({ onClose, onSuccess, ...props }) => {

    const [value, setValue] = useState(props.initialValue);

    return (
      <Modal onClose={onClose}>
        <textarea style={{ width: "100%" }} value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={() => onSuccess(value)}>SAVE</button>
      </Modal>
    );
}

export default memo(EditingModal)