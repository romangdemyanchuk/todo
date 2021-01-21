import React, {useState} from 'react';
import {Menu} from 'antd';
import {Link} from "react-router-dom";

const MainMenu = ({setContactModalIsOpen, setIsShowActiveTodos, setChangeThemeModalIsOpen, setCardsVue, cardsVue}) => {
     return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" onClick={() => setIsShowActiveTodos(true)}>Active todos</Menu.Item>
            <Menu.Item key="2" onClick={() => setIsShowActiveTodos(false)}>Completed todos</Menu.Item>
            <Menu.Item key="3"><Link to='/create'>Create new</Link></Menu.Item>
            <Menu.Item key="4" onClick={() => setContactModalIsOpen(true)}>Contact us</Menu.Item>
            <Menu.Item key="5" onClick={() => setChangeThemeModalIsOpen(true)}>Change color's</Menu.Item>
            <Menu.Item key="6" onClick={() => setCardsVue(!cardsVue)}>Transform view</Menu.Item>
        </Menu>
    );
}

export default MainMenu;
