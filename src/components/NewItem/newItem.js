import React, {useState} from "react";
import "antd/dist/antd.css";
import "./newItem.css"
import {Button, Form, Input, Layout, Menu, Select} from "antd";
import {useDispatch} from "react-redux";
import {newItem} from "../../session/mainReducer";
import {Option} from "antd/es/mentions";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom'
const { Sider } = Layout;

const NewItem = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [collapsed, setIsCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setIsCollapsed(collapsed)
    };

    const dispatch = useDispatch();
    const handleSubmit = ({title, category}) => {
        const newEl = {
            id: Date.now(),
            title,
            completed: false,
            category,
            date: new Date()
        }
        newItem(newEl)(dispatch)
        history.push('/');
        form.resetFields();
    };
     const categories = ['family', 'work', 'leisure', 'other'];
    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" ><Link to='/'>Back to main</Link></Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <p className="createItemText">Create new item:</p>
                <Form
                    form={form}
                    name="basic"
                    onFinish={(values) => {
                        handleSubmit(values);
                    }}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="title"
                        label="title"
                        rules={[{ required: true, message: 'Please input todo!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="category"
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
            </Layout>
        </Layout>

    )
};

export default NewItem;
