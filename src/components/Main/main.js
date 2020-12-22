import React, {useState} from 'react';
import {Input, Layout, Menu} from 'antd';
import EditTodoModal from "../../components/Main/modals/EditTodoModal";
import NewItem from "../NewItem";
import completeImg from "../../img/complete.png";
import editImg from "../../img/edit.svg.png";
import deleteImg from "../../img/delete.png";
import {useDispatch, useSelector} from "react-redux";
import {completeItem, deleteItem} from "../../session/mainReducer";
import './main.css'
import ContactModal from "./modals/ContactModal";

const { Sider } = Layout;

const Main = () => {
    const [collapsed, setIsCollapsed] = useState(false);
    const [isShowActiveTodos, setIsShowActiveTodos] = useState(true);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
    const [term, setTerm] = useState('');
    const [item, setItem] = useState(null);
    const todos = useSelector((state) => state.main.todos);
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
                           placeholder="Search todo by title "
                           value={term}
                           onChange={(e) => setTerm(e.target.value)}
                    />
                    <ul className="border">
                        {todos.filter(item => item.completed !== isShowActiveTodos).map(item => (
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
                        ))}
                    </ul>
                </div>
            </Layout>
        </Layout>
    );
}

export default Main;
