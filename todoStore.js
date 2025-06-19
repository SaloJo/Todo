
export const initialState = {
    todos: [],
}

export const TodoStore = (state, action) => {
    switch(action.type){
        case 'update-list': {
            console.log(action)
            return {...state, todos: action.payload}
        }
        case 'add-todo': {
            const newTodos = [...state.todos]
            newTodos.push(action.payload)
            return {...state, todos: newTodos}
        }
        case 'remove-todo': {
            const newTodos = state.todos.filter(todo => todo.id !== action.payload);
            return {...state, todos: newTodos}
        }
        default: {
            return {...state}
        }
    }
}


