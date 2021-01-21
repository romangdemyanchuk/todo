import React, {useState, useEffect} from 'react';
import {Layout, Menu, Pagination} from 'antd';
import EditTodoModal from "../../components/Main/modals/EditTodoModal";
 import ChangeThemeModal from "./modals/ChangeThemeModal";
import {deleteItem} from "../../session/mainReducer";
import './mainContainer.css'
import ContactModal from "./modals/ContactModal";
import {useHistory} from "react-router-dom";
import MainMenu from "../menu";
import Todos from "../todos";
import LayoutFields from "../layout";

const { Sider } = Layout;

const MainContainer = () => {
    const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
    const [changeThemeModalIsOpen, setChangeThemeModalIsOpen] = useState(false);
    const [layoutColor, setLayoutColor] = useState('#f0f2f5')
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsVue, setCardsVue] = useState(false);
    const [collapsed, setIsCollapsed] = useState(false);
    const [isShowActiveTodos, setIsShowActiveTodos] = useState(true);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState(null);
    const [term, setTerm] = useState('');
    const [category, setCategory] = useState('');
    const [itemToEdit, setItemToEdit] = useState(null);
    const [date, setDate] = useState(null);
    const [todos, setTodos] = useState(null);

    let todoElements = JSON.parse(localStorage.getItem('items'));
    useEffect(() => {
        filteredItems && filteredItems.length > 0 ? setTodos(filteredItems) : setTodos(todoElements);
    }, [])


    const search = (items) => {
        return items.filter(item =>{
            if(item.title.toLowerCase().indexOf(term.toLowerCase()) !== -1 && item.category === category) {
                return item;
            }
        });

    }

    const changeBackground = value => {
        localStorage.setItem('bgColor', value.hex);
        setLayoutColor(value.hex)
    };
    let bgColor = localStorage.getItem('bgColor');
    const numEachPage = 3
    const onCollapse = collapsed => {
        setIsCollapsed(collapsed)
    };
    const history = useHistory();

    const completedEl = (id) => {
        let idOfCompletedItem = todos.findIndex((el) => el.id === id)
        const itemCopy = {
            ...todos[idOfCompletedItem], completed: !todos[idOfCompletedItem].completed
        }
        const newArr = [
            ...todos.slice(0, idOfCompletedItem),
            itemCopy,
            ...todos.slice(idOfCompletedItem+1)
        ]
        setTodos(newArr)
        localStorage.setItem('items', JSON.stringify(newArr));
    }
    const editEl = (el) => {
        setItemToEdit(el)
        setEditModalIsOpen(true)
    }
    const deleteEl = (id) => {
        deleteItem(id, history)
    }

    const filteredByTitle = e => {
        setTerm(e.target.value)
        console.log(filteredItems, todos)
        const tds = (filteredItems || filteredItems === []) ? filteredItems : todos
        return setFilteredItems(tds.filter((item) =>
            item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1))
    };

    const filteredByCategories = value => {
        setCategory(value)
        console.log(filteredItems, todos)
        const tds = (filteredItems || filteredItems === []) ? filteredItems : todos
        return setFilteredItems(tds.filter(item =>  item.category === value))
    };

    // const filteredByDate = value => {
    //     setDate(value)
    //     let date = new Date();
    //     let res = date.setTime(date.getTime() - (value * 24 * 60 * 60 * 1000));
    //     if (localStorage.getItem('items'))
    //         todoElements = JSON.parse(localStorage.getItem('items'));
    //     let todoItems = filteredTodos.length > 0 ? filteredTodos : todoElements;
    //     return todoItems.filter(item => {
    //         if( item.id >= res && item.id < date) {
    //             filteredItems(item)(dispatch)
    //         }
    //     } );
    // };
    const handleChange = value => {
        setCurrentPage(value)
        setMinValue((value - 1) * numEachPage)
        setMaxValue(value * numEachPage)
    }
    let items = filteredItems ? filteredItems : todos;
    console.log(45, items)
    // items = search(items);
    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <MainMenu setIsShowActiveTodos={setIsShowActiveTodos} setContactModalIsOpen={setContactModalIsOpen}
                          setChangeThemeModalIsOpen={setChangeThemeModalIsOpen} setCardsVue={setCardsVue} cardsVue={cardsVue}
                />
            </Sider>
            <Layout className="site-layout" style={{background: bgColor ? bgColor :`${layoutColor}` }}>
                <div className="container">
                    <EditTodoModal modalIsOPen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} item={itemToEdit}/>
                    <ContactModal modalIsOPen={contactModalIsOpen} setModalIsOpen={setContactModalIsOpen}/>
                    <ChangeThemeModal modalIsOPen={changeThemeModalIsOpen}
                                      setModalIsOpen={setChangeThemeModalIsOpen}
                                      changeBackground={changeBackground}
                    />

                    <LayoutFields filteredByTitle={filteredByTitle} filteredByCategories={filteredByCategories}/>
                    <Pagination
                        style={{textAlign:'center', marginBottom: '10px'}}
                        current={currentPage}
                        defaultPageSize={numEachPage} //default size of page
                        onChange={handleChange}
                        total={items && items.length}
                    />
                    <ul className="border" style={{display: cardsVue && 'grid', gridTemplateColumns: cardsVue && 'repeat(3, 1fr)'}}>
                        <Todos todos={items}
                               cardsVue={cardsVue}
                               completedEl={completedEl}
                               editEl={editEl}
                               deleteEl={deleteEl}
                               isShowActiveTodos={isShowActiveTodos}
                               minValue={minValue}
                               maxValue={maxValue}
                        />
                    </ul>
                </div>
            </Layout>
        </Layout>
    );
}

export default MainContainer;
