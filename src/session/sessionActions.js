import {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETED_TODO, FILTERED_TODO} from "./sessionConstants";

export const addTodo = (data) => ({ type: ADD_TODO , payload: data })
export const deleteTodo = (data) => ({ type: DELETE_TODO , payload: data })
export const editTodo = (data) => ({ type: EDIT_TODO , payload: data })
export const completedTodo = (data) => ({ type: COMPLETED_TODO , payload: data })
export const filteredTodo = (data) => ({ type: FILTERED_TODO , payload: data })
