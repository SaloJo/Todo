import React, {   useReducer } from "react";
import { TodoStore, initialState } from "./todoStore";


export const TodoContext = React.createContext({});

export const TodoContextProvider = (props) => {
  const [state, dispatch] = useReducer(TodoStore, initialState);

  const fetchTodo = () => {
    console.log('in context')
    fetch("https://dummyjson.com/todos", { method: "get" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'update-list', payload: data.todos})
      });
  };

  const todoContextStore = {
    state,
    dispatch,
    fetchTodo,
  };

  return <TodoContext.Provider value={todoContextStore} >{props.children}</TodoContext.Provider>;
};
