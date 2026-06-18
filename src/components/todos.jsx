import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../features/todoslice';


function Todos() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  return ( 
    <div>
      {todos.map(todo => (
        <li key={todo.id} className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded px-4 py-2 my-2 text-base text-gray-100">
          <span>{todo.text}</span>
          <button 
            onClick={() => dispatch(removeTodo(todo.id))}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </li>
      ))}
    </div>
  );
}
export default Todos;