import {addTodo, completedTodo, deleteTodo, editTodo, filteredTodo} from "./sessionActions";
import {ADD_TODO, COMPLETED_TODO, DELETE_TODO, EDIT_TODO, FILTERED_TODO} from "./sessionConstants";

const initialState = {
    todos: [
        // {
        //     id: 1,
        //     title: 'Todo 1',
        //     completed: false,
        //     category:'other',
        //     date: "2020-11-30"
        // }
    ],
    filteredTodos:[]
};


const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state, todos: [...state.todos, action.payload]
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(item => item.id !== action.payload)
            }
        case EDIT_TODO:
            let idOfEditedItem = state.todos.findIndex((el) => el.id === action.payload.id)
            let CopyState = {...state};
            CopyState.todos = [...state.todos];
            CopyState.todos[idOfEditedItem].title = action.payload.title;
            CopyState.todos[idOfEditedItem].category = action.payload.category;
            return CopyState
        case COMPLETED_TODO:
            let idOfCompletedItem = state.todos.findIndex((el) => el.id === action.payload.id)
            let CopyOfState = {...state};
            CopyOfState.todos = [...state.todos];
            CopyOfState.todos[idOfCompletedItem].completed = !CopyOfState.todos[idOfCompletedItem].completed;
            return CopyOfState
        case FILTERED_TODO:
            return {
                ...state,
                filteredTodos: action.payload
            }


        default:
            return state;
    }
};
export const newItem = (newItem) => (dispatch) => {
    let existingEntries = JSON.parse(localStorage.getItem("items"));
    if(existingEntries == null)
        localStorage.setItem("items", JSON.stringify(existingEntries));
    else {
        existingEntries.push(newItem);
        localStorage.setItem("items", JSON.stringify(existingEntries));
    }
    dispatch(addTodo(newItem))
};

export const deleteItem = (id) => (dispatch) => {
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
    dispatch(deleteTodo(id))
};

export const editItem = ({title, category}, id, history) => (dispatch) => {
    let existingEntries = JSON.parse(localStorage.getItem("items"));
    if(existingEntries == null)
        localStorage.setItem("items", JSON.stringify([]))
    else {
        console.log(existingEntries)
        let idx=existingEntries.findIndex(movie=>movie.id===id);
        existingEntries[idx].title = title;
        existingEntries[idx].category = category;
        localStorage.setItem('items', JSON.stringify(existingEntries));
    }
    history.push('/')
    dispatch(editTodo({title, category, id}))
};

export const completeItem = (id, history) => (dispatch) => {
    let existingEntries = JSON.parse(localStorage.getItem("items"));
    if(existingEntries == null)
        localStorage.setItem("items", JSON.stringify([]))
    else {
        let idOfCompletedItem = existingEntries.findIndex((el) => el.id === id)
        existingEntries[idOfCompletedItem].completed = !existingEntries[idOfCompletedItem].completed;
        localStorage.setItem('items', JSON.stringify(existingEntries));
    }
    history.push('/')
    // dispatch(completedTodo({id}))
};
export const filteredItems = (items) => (dispatch) => {
    dispatch(filteredTodo(items))
};

export default MainReducer;

