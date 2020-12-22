import React from "react";
import "antd/dist/antd.css";
import "./newItem.css"
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {newItem} from "../../session/mainReducer";

const NewItem = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = value => {
        const newEl = {
            id: Date.now(),
            title: value.new,
            completed: false
        }
        newItem(newEl)(dispatch)
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="basic"
            onFinish={(values) => {
                handleSubmit(values);
            }}
            initialValues={{ remember: true }}
        >
            <Form.Item
                label="new todo"
                name="new"
                rules={[{ required: true, message: 'Please input todo!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="submitBtn">
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
};

export default NewItem;
