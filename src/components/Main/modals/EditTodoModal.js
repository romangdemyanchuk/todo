import React from "react";
import {Button, Form, Input, Modal} from "antd";
import {useDispatch} from "react-redux";
import {editItem} from "../../../session/mainReducer";

export const EditTodoModal = ({ modalIsOPen, setModalIsOpen, item}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleSubmit = (values) => {
        setModalIsOpen(false)
        editItem(values, item.id)(dispatch)
    };

    return (
        <Modal
            title="Edit todo"
            visible={modalIsOPen}
            onOk={closeModal}
            onCancel={closeModal}
        >
            <Form
                form={form}
                name="editTodo"
                onFinish={(values) => {
                    handleSubmit(values);
                }}
                initialValues={{title: item !== null ? item.title : ''}}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input title of todo!' }]}
                >
                    <Input
                        placeholder="todo title"
                    />
                </Form.Item>
                <Form.Item className="editFormBtns">
                    <Button type="primary" className="editCancelBtn" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button type="danger" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>


    )
};

export default EditTodoModal;
