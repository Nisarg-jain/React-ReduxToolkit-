import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{
        id: 1,
        text: "hello redux toolkit",
        completed: false
    }]
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload,
                completed: false
            }
            state.todos.push(newTodo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            state.todos = state.todos.map(todo => 
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        },
        // 1. Clear All logic
        clearTodos: (state) => {
            state.todos = [];
        },
        // 2. Update/Edit text logic
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const existingTodo = state.todos.find(todo => todo.id === id);
            if (existingTodo) {
                existingTodo.text = text;
            }
        }
    }
})

// Export the new actions
export const { addTodo, removeTodo, toggleComplete, clearTodos, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;