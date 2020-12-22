import React, {useState} from 'react';
import {Input, Layout, Menu, Select} from 'antd';
import EditTodoModal from "../../components/Main/modals/EditTodoModal";
import NewItem from "../NewItem";
import completeImg from "../../img/complete.png";
import editImg from "../../img/edit.svg.png";
import deleteImg from "../../img/delete.png";
import {useDispatch, useSelector} from "react-redux";
import {completeItem, deleteItem, filteredItems} from "../../session/mainReducer";
import './main.css'
import ContactModal from "./modals/ContactModal";
import {Option} from "antd/es/mentions";

const { Sider } = Layout;

const Main = () => {
    const [collapsed, setIsCollapsed] = useState(false);
    const [isShowActiveTodos, setIsShowActiveTodos] = useState(true);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
    const [term, setTerm] = useState('');
    const [item, setItem] = useState(null);
    const [category, setCategory] = useState('');
    const todos = useSelector((state) => state.main.todos);
    const filteredTodos = useSelector((state) => state.main.filteredTodos);
    const dispatch = useDispatch();

    const onCollapse = collapsed => {
        setIsCollapsed(collapsed)
    };
    const completedEl = (id) => {
        completeItem(id)(dispatch)
    }
    const editEl = (el) => {
        setItem(el)
        setEditModalIsOpen(true)
    }
    const deleteEl = (id) => {
        deleteItem(id)(dispatch)
    }
    const handleProvinceChange = value => {
        setCategory(value)
        return todos.filter((item) => {
            if(item.category === value) {
                filteredItems(item)(dispatch)
            }
        });

    };
    let todoItems = filteredTodos.leading > 0 ? filteredTodos : todos;
    const categories = ['family', 'work', 'leisure', 'other'];
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={() => setIsShowActiveTodos(true)}>Active todos</Menu.Item>
                    <Menu.Item key="2" onClick={() => setIsShowActiveTodos(false)}>Completed todos</Menu.Item>
                    <Menu.Item key="3"onClick={() => setContactModalIsOpen(true)}>Contact us</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <div className="container">
                    <EditTodoModal modalIsOPen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} item={item}/>
                    <ContactModal modalIsOPen={contactModalIsOpen} setModalIsOpen={setContactModalIsOpen}/>
                    {isShowActiveTodos && <NewItem/>}
                    <Input className="search-input" type="text" name="item"
                           className="searchByName"
                           placeholder="Search todo by title "
                           value={term}
                           onChange={(e) => setTerm(e.target.value)}
                    />
                    <Select defaultValue={''} style={{width: '120px', marginBottom: '10px'}}
                            onChange={handleProvinceChange}>
                    >
                        {categories.map(category => (
                            <Option key={category}>{category}</Option>
                        ))}
                    </Select>
                    <ul className="border">
                        {todoItems.length > 0 ? todoItems.filter(item => (item.completed !== isShowActiveTodos)).map(item => (
                            item.title.toLowerCase().indexOf(term.toLowerCase()) > -1 &&
                            <li key={item.id}
                                style={{ textDecoration: item.completed ? 'line-through black' : ''}}>
                                    {item.title}
                                <div className="btnsWrapper">
                           <span onClick={() => completedEl(item.id)}>
                               <img src={completeImg}/>
                           </span>
                                    <span onClick={() => editEl(item)} className="editBtn">
                               <img src={editImg}/>
                           </span>
                                    <span onClick={() => deleteEl(item.id)}>
                               <img src={deleteImg}/>
                           </span>
                                </div>
                            </li>
                        )) : <p style={{textAlign: 'center', marginTop: '10px'}}>No todos!</p>
                        }
                    </ul>
                </div>
            </Layout>
        </Layout>
    );
}

export default Main;
