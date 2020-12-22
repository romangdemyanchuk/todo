import React from "react";
import "antd/dist/antd.css";
import "./newItem.css"
import {Button, Form, Input, Select} from "antd";
import {useDispatch} from "react-redux";
import {newItem} from "../../session/mainReducer";
import {Option} from "antd/es/mentions";

const NewItem = () => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const handleSubmit = ({title, category}) => {
        const newEl = {
            id: Date.now(),
            title,
            completed: false,
            category
        }
        newItem(newEl)(dispatch)
        form.resetFields();
    };
     const categories = ['family', 'work', 'leisure', 'other'];
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
                name="title"
                rules={[{ required: true, message: 'Please input todo!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="select category"
                name="category"
                rules={[{ required: true, message: 'Please select category!' }]}
            >
                <Select defaultValue={''} style={{ width: 120 }}
                    >
                    {categories.map(category => (
                        <Option key={category}>{category}</Option>
                    ))}
                </Select>
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
