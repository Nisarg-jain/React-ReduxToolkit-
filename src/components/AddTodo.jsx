import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoslice'; 

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return; 

    dispatch(addTodo(input)); 
    setInput('');
  };

  return (
    <form onSubmit={addTodoHandler} className="flex gap-2 max-w-md mx-auto my-6 px-4">
      <input
        type="text"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-base text-gray-100 placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 transition-colors duration-200 ease-in-out"
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-medium transition-colors duration-200"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;