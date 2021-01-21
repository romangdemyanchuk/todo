import {filteredTodo} from "./sessionActions";
import {FILTERED_TODO} from "./sessionConstants";

const initialState = {
    filteredTodos:[]
};


const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTERED_TODO:
            return {
                ...state,
                filteredTodos: action.payload
            }

        default:
            return state;
    }
};
export const newItem = (newItem) => {
    let existingEntries = JSON.parse(localStorage.getItem("items"));

    if(!existingEntries) {
        existingEntries = []
    }

    existingEntries.push(newItem);
    localStorage.setItem("items", JSON.stringify(existingEntries));
};

export const deleteItem = (id, history) => {
    let existingEntries = JSON.parse(localStorage.getItem("items"));
    if(existingEntries == null)
        localStorage.setItem("items", JSON.stringify([]));
    else {
        let i=existingEntries.findIndex(movie=>movie.id===id);
        if(i!==-1){
            existingEntries.splice(i,1);
            localStorage.setItem('items', JSON.stringify(existingEntries));
        }
    }
    history.push('/')
};

export const editItem = ({title, category}, id, history) => {
    let existingEntries = JSON.parse(localStorage.getItem("items"));
    history.push('/')
    if(existingEntries == null)
        localStorage.setItem("items", JSON.stringify([]))
    else {
        let idx=existingEntries.findIndex(movie=>movie.id===id);
        existingEntries[idx].title = title;
        existingEntries[idx].category = category;
        localStorage.setItem('items', JSON.stringify(existingEntries));
        history.push('/')
    }

};
export const filteredItems = (items) => (dispatch) => {
    dispatch(filteredTodo(items))
};

export default MainReducer;

