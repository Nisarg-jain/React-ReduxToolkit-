import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todoslice';

export const store = configureStore({
    reducer: {
        todos: todoReducer
    }
}) 