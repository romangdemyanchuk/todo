import React, {useState} from 'react';
import {Card, Input, Layout, Menu, Pagination, Select} from 'antd';
import {Link} from "react-router-dom";
import EditTodoModal from "./Main/modals/EditTodoModal";
import ContactModal from "./Main/modals/ContactModal";
import ChangeThemeModal from "./Main/modals/ChangeThemeModal";
import {Option} from "antd/es/mentions";
import Todos from "./todos";

const LayoutFields = ({filteredByCategories, term, filteredByTitle}) => {
    const categories = ['family', 'work', 'leisure', 'other'];
    return (
        <>
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
                        onChange={filteredByCategories}
                >
                    {categories.map(category => (
                        <Option key={category}>{category}</Option>
                    ))}
                </Select>
                <Select placeholder="Date" style={{width: '120px', marginBottom: '10px'}}
                    // onChange={filteredByDate}
                >                            >
                    <Option key='1'>Today</Option>
                    <Option key='7'>This week</Option>
                    <Option key='30'>This month</Option>
                </Select>
            </div>
        </>
    );
}

export default LayoutFields;
