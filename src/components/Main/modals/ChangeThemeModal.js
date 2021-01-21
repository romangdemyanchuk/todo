import React from "react";
import { Modal} from "antd";
import {ChromePicker} from "react-color";

export const ChangeThemeModal = ({ modalIsOPen, setModalIsOpen, changeBackground}) => {
    let color = '#fff'

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Modal
            title="Change background color"
            visible={modalIsOPen}
            onOk={closeModal}
            onCancel={closeModal}
        >
                <ChromePicker color={color} onChange={updatedColor => changeBackground(updatedColor)}/>
        </Modal>


    )
};

export default ChangeThemeModal;
