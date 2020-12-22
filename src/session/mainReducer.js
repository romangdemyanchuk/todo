import {addTodo, completedTodo, deleteTodo, editTodo} from "./sessionActions";
import {ADD_TODO, COMPLETED_TODO, DELETE_TODO, EDIT_TODO} from "./sessionConstants";

const initialState = {
    todos: [
        {
            id: 1,
            title: 'Todo 1',
            completed: false
        },
    ]
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
            return CopyState
        case COMPLETED_TODO:
            console.log('action.payload', action.payload)
            let idOfCompletedItem = state.todos.findIndex((el) => el.id === action.payload.id)
            let CopyOfState = {...state};
            CopyOfState.todos = [...state.todos];
            CopyOfState.todos[idOfCompletedItem].completed = !CopyOfState.todos[idOfCompletedItem].completed;
            return CopyOfState


        default:
            return state;
    }
};
export const newItem = (newItem) => (dispatch) => {
    dispatch(addTodo(newItem))
};

export const deleteItem = ( id) => (dispatch) => {
    dispatch(deleteTodo(id))
};

export const editItem = ({title}, id) => (dispatch) => {
    dispatch(editTodo({title, id}))
};

export const completeItem = (id) => (dispatch) => {
    console.log(123)
    dispatch(completedTodo({id}))
};

export default MainReducer;

