import React, {useState} from "react";
import {Input} from "antd";

const SearchByName = ({searchChange}) => {
    const [term, setTerm] = useState('');
    const onSearchChange = (e) => {
        const term = e.target.value;
        setTerm(term)
        searchChange(term);
    };
    return (
            <Input className="search-input" type="text" name="item"
                   placeholder="Search todo by title "
                   value={term}
                   onChange={onSearchChange}
            />
    )
};

export default SearchByName;
