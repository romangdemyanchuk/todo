import React, {useState} from 'react';
import {Card, Input, Layout, Menu, Pagination, Select} from 'antd';
import EditTodoModal from "../../components/Main/modals/EditTodoModal";
 import ChangeThemeModal from "./modals/ChangeThemeModal";
import completeImg from "../../img/complete.png";
import editImg from "../../img/edit.svg.png";
import deleteImg from "../../img/delete.png";
import {useDispatch, useSelector} from "react-redux";
import {completeItem, deleteItem, filteredItems} from "../../session/mainReducer";
import './main.css'
import ContactModal from "./modals/ContactModal";
import {Option} from "antd/es/mentions";
import {Link, useHistory} from "react-router-dom";

const { Sider } = Layout;

const Main = () => {
    const numEachPage = 3
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsVue, setCardsVue] = useState(false);
    const [collapsed, setIsCollapsed] = useState(false);
    const [layoutColor, setLayoutColor] = useState('#f0f2f5')
    const [isShowActiveTodos, setIsShowActiveTodos] = useState(true);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
    const [changeThemeModalIsOpen, setChangeThemeModalIsOpen] = useState(false);
    const [term, setTerm] = useState('');
    const [item, setItem] = useState(null);
    const [date, setDate] = useState(null);
    const [category, setCategory] = useState('');
    const todos = useSelector((state) => state.main.todos);
    const filteredTodos = useSelector((state) => state.main.filteredTodos);
    console.log(filteredTodos, filteredTodos.length)
    const dispatch = useDispatch();
    const onCollapse = collapsed => {
        setIsCollapsed(collapsed)
    };
    const history = useHistory();
    const completedEl = (id) => {
        completeItem(id, history)(dispatch)
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
        if (e.target.value === '') {
            filteredItems([])(dispatch)
        }
        return todos.filter(item => (item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) ?
                filteredItems([item])(dispatch) : filteredItems([])(dispatch)
        );
    };

    const filteredByCategories = value => {
        setCategory(value)
        return todos.filter(item =>  item.category === value ? filteredItems([item])(dispatch)
            : filteredItems([])(dispatch)
        );
    };
    const search = (items) => {
        if(term === '' && category === '') {
            return items;
        }
        return items.filter(item =>{
            console.log(item, term, category)
            if(item.title.toLowerCase().indexOf(term.toLowerCase()) !== -1 && item.category === category) {
                return item;
            }
        });

    }

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

    const localItems = localStorage.getItem("items");
    !localItems && localStorage.setItem("items", JSON.stringify(todos));
    console.log(localItems)
    let todoElements = [];
    if (localStorage.getItem('items'))
        todoElements = JSON.parse(localStorage.getItem('items'));

    console.log(todoElements, todoElements.length)
    let todoItems = todoElements.length > 0 ? todoElements : filteredTodos.length > 0 ? filteredTodos : todos;
    todoItems = search(todoItems);


    const categories = ['family', 'work', 'leisure', 'other'];

    const changeBackground = value => {
        localStorage.setItem('bgColor', value.hex);
        setLayoutColor(value.hex)
    };
    let bgColor = localStorage.getItem('bgColor');
    const handleChange = value => {
        setCurrentPage(value)
        console.log(123,currentPage, value)
        setMinValue((value - 1) * numEachPage)
        setMaxValue(value * numEachPage)
    }

    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={() => setIsShowActiveTodos(true)}>Active todos</Menu.Item>
                    <Menu.Item key="2" onClick={() => setIsShowActiveTodos(false)}>Completed todos</Menu.Item>
                    <Menu.Item key="3"><Link to='/create'>Create new</Link></Menu.Item>
                    <Menu.Item key="4" onClick={() => setContactModalIsOpen(true)}>Contact us</Menu.Item>
                    <Menu.Item key="5" onClick={() => setChangeThemeModalIsOpen(true)}>Change color's</Menu.Item>
                    <Menu.Item key="6" onClick={() => setCardsVue(!cardsVue)}>Transform view</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{background: bgColor ? bgColor :`${layoutColor}` }}>
                <div className="container">
                    <EditTodoModal modalIsOPen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} item={item}/>
                    <ContactModal modalIsOPen={contactModalIsOpen} setModalIsOpen={setContactModalIsOpen}/>
                    <ChangeThemeModal modalIsOPen={changeThemeModalIsOpen}
                                      setModalIsOpen={setChangeThemeModalIsOpen}
                                      changeBackground={changeBackground}
                    />

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
                    <Pagination
                        style={{textAlign:'center', marginBottom: '10px'}}
                        current={currentPage}
                        defaultPageSize={numEachPage} //default size of page
                        onChange={handleChange}
                        total={todoItems.length}
                    />
                    <ul className="border" style={{display: cardsVue && 'grid', gridTemplateColumns: cardsVue && 'repeat(3, 1fr)'}}>
                        {todoItems.length > 0 ? todoItems.filter(item => (item.completed !== isShowActiveTodos)).slice(minValue, maxValue).map(item => (
                                !cardsVue  ? (
                                <li key={item.id}
                                    style={{ textDecoration: item.completed ? 'line-through black' : '',
                                        background: '#f0f2f5'
                                    }}>
                                    {item.title}
                                    <div className="btnsWrapper">
                                        <span onClick={() => completedEl(item.id)}>
                                            <img alt='completeImg' src={completeImg}/>
                                        </span>
                                            <span onClick={() => editEl(item)} className="editBtn">
                                           <img alt='editImg' src={editImg}/>
                                       </span>
                                            <span onClick={() => deleteEl(item.id)}>
                                           <img alt='deleteImg' src={deleteImg}/>
                                       </span>
                                    </div>
                                </li>
                                )
                             : (
                            <Card hoverable style={{width: '150px'}} key={item.id}>
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
                            </Card>
                            )
                        )) : <p style={{textAlign: 'center', marginTop: '10px'}}>No todos!</p>
                        }
                    </ul>
                </div>
            </Layout>
        </Layout>
    );
}

export default Main;
