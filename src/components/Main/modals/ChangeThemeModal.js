import React, {useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import {ChromePicker} from "react-color";
import {useDispatch} from "react-redux";

export const ChangeThemeModal = ({ modalIsOPen, setModalIsOpen, changeBackground}) => {
    const [color, setColor] = useState('#fff')
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleSubmit = (values) => {
        setModalIsOpen(false)
        // editItem(values, item.id)(dispatch)
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Modal
            title="Contact us"
            visible={modalIsOPen}
            onOk={closeModal}
            onCancel={closeModal}
        >
                <ChromePicker color={color} onChange={updatedColor => changeBackground(updatedColor)}/>
        </Modal>


    )
};

export default ChangeThemeModal;
