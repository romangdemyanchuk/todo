import React, {useState} from 'react';
import {Card, Input, Layout, Menu, Pagination, Select} from 'antd';
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
    const numEachPage = 5
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1);
    const [cardsVue, setCardsVue] = useState(false);
    const [collapsed, setIsCollapsed] = useState(false);
    const [isShowActiveTodos, setIsShowActiveTodos] = useState(true);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
    const [term, setTerm] = useState('');
    const [item, setItem] = useState(null);
    const [date, setDate] = useState(null);
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

    const filteredByTitle = e => {
        setTerm(e.target.value)
        return todos.filter((item) => {
            if(item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                filteredItems(item)(dispatch)
            }
        });
    };

    const filteredByCategories = value => {
        setCategory(value)
        return todos.filter((item) => {
            if(item.category === value) {
                filteredItems(item)(dispatch)
            }
        });
    };

    const filteredByDate = value => {
        setDate(value)
        let date = new Date();
        let res = date.setTime(date.getTime() - (value * 24 * 60 * 60 * 1000));
        return todos.filter(item => {
            if( item.id >= res && item.id < date) {
                filteredItems(item)(dispatch)
            }
        } );
    };
    let todoItems = filteredTodos.length > 0 ? filteredTodos : todos;
    const categories = ['family', 'work', 'leisure', 'other'];

    const handleChange = value => {
        setMinValue((value - 1) * numEachPage)
        setMaxValue(value * numEachPage)
    };
    console.log(cardsVue)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={() => setIsShowActiveTodos(true)}>Active todos</Menu.Item>
                    <Menu.Item key="2" onClick={() => setIsShowActiveTodos(false)}>Completed todos</Menu.Item>
                    <Menu.Item key="3"onClick={() => setContactModalIsOpen(true)}>Contact us</Menu.Item>
                    <Menu.Item key="4"onClick={() => setCardsVue(!cardsVue)}>Transform Vue</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <div className="container">
                    <EditTodoModal modalIsOPen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} item={item}/>
                    <ContactModal modalIsOPen={contactModalIsOpen} setModalIsOpen={setContactModalIsOpen}/>
                    {isShowActiveTodos && <NewItem/>}
                    <p>Filtered by:</p>
                    <div className="filteredWrapper">
                        <Input type="text" name="item"
                               className="searchByName"
                               placeholder="Title"
                               value={term}
                               onChange={(e) => filteredByTitle(e)}
                               style={{width: '120px'}}
                        />
                        <Select placeholder="Category" style={{width: '120px', marginBottom: '10px'}}
                                onChange={filteredByCategories}>
                            showSearch
                            optionFilterProp="children"
                            >
                            {categories.map(category => (
                                <Option key={category}>{category}</Option>
                            ))}
                        </Select>
                        <Select placeholder="Date" style={{width: '120px', marginBottom: '10px'}}
                                onChange={filteredByDate}>                            >
                            <Option key='1'>Today</Option>
                            <Option key='7'>This week</Option>
                            <Option key='30'>This month</Option>
                        </Select>
                    </div>
                    <ul className="border" style={{display: cardsVue && 'grid', gridTemplateColumns: cardsVue && 'repeat(3, 1fr)'}}>
                        {todoItems.length > 0 ? todoItems.filter(item => (item.completed !== isShowActiveTodos)).map(item => (
                            item.title.toLowerCase().indexOf(term.toLowerCase()) > -1  &&
                                !cardsVue  ? (
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
                                </li>)
                             : (<Card hoverable style={{width: '150px'}} key={item.id}>
                                <div style={{ textDecoration: item.completed ? 'line-through black' : ''}}>
                                    {item.title}
                                </div>

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
                            </Card>)

                        )) : <p style={{textAlign: 'center', marginTop: '10px'}}>No todos!</p>
                        }
                    </ul>
                    {/*<Pagination*/}
                    {/*    defaultCurrent={1}*/}
                    {/*    defaultPageSize={numEachPage} //default size of page*/}
                    {/*    onChange={handleChange}*/}
                    {/*    total={todoItems.length}*/}
                    {/*/>*/}

                </div>
            </Layout>
        </Layout>
    );
}

export default Main;
