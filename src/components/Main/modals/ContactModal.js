import React from "react";
import {Button, Form, Input, Modal} from "antd";
import {useDispatch} from "react-redux";

export const ContactModal = ({ modalIsOPen, setModalIsOpen}) => {
    const [form] = Form.useForm();

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleSubmit = (values) => {
        setModalIsOpen(false)
    };

    const onReset = () => {
        form.resetFields();
    };
    const layout = {labelCol: { span: 5 }};

    return (
        <Modal
            title="Contact us"
            visible={modalIsOPen}
            onOk={closeModal}
            onCancel={closeModal}
        >
            <Form
                {...layout}
                form={form}
                name="editTodo"
                onFinish={(values) => {
                    handleSubmit(values);
                }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Message"
                    name="message"
                    rules={[{ required: true, message: 'Please input your message!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, type: "email", message: 'The input is not valid E-mail!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset} className="resetBtn">
                        Reset
                    </Button>
                    <Button type="danger" onClick={closeModal}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>


    )
};

export default ContactModal;
