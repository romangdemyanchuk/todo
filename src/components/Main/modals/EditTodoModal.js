import React from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import {useDispatch} from "react-redux";
import {editItem} from "../../../session/mainReducer";
import {Option} from "antd/es/mentions";

export const EditTodoModal = ({ modalIsOPen, setModalIsOpen, item}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    let formInitialValues = {title: item ? item.title : '',
        category: item ? item.category : ''}
    form.setFieldsValue(formInitialValues)

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleSubmit = (values) => {
        setModalIsOpen(false)
        editItem(values, item.id)(dispatch)
        form.setFieldsValue({title: '', category: ''})
    };
    const categories = ['family', 'work', 'leisure', 'other'];

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
                initialValues={formInitialValues}
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
                <Form.Item
                    label="Сategory"
                    name="category"
                    rules={[{ required: true, message: 'Please input category of todo!' }]}
                >
                    <Select defaultValue={''}
                    >
                        {categories.map(category => (
                            <Option key={category}>{category}</Option>
                        ))}
                    </Select>
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
