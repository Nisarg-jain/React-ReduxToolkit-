import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleComplete, clearTodos, updateTodo } from '../features/todoslice';

function Todos() {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  // Local state for tracking inline editing
  const [isEditingId, setIsEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditStart = (id, currentText) => {
    setIsEditingId(id);
    setEditText(currentText);
  };

  const handleEditSave = (id) => {
    if (editText.trim() !== "") {
      dispatch(updateTodo({ id, text: editText }));
    }
    setIsEditingId(null);
  };

  return ( 
    <div className="max-w-md mx-auto px-4 mt-4">
      {todos && todos.map(todo => (
        <li 
          key={todo.id} 
          className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded px-4 py-2 my-2 text-base text-gray-100"
        >
          {/* Left Side: Checkbox & Text/Input Row */}
          <div className="flex items-center gap-3 flex-1 mr-2">
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => dispatch(toggleComplete(todo.id))}
              className="w-4 h-4 accent-indigo-500 cursor-pointer"
              disabled={isEditingId === todo.id}
            />
            
            {isEditingId === todo.id ? (
              // Inline Input text field during edit mode
              <input 
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEditSave(todo.id)}
                className="bg-gray-700 text-white rounded px-2 py-0.5 outline-none border border-indigo-500 flex-1 text-sm"
                autoFocus
              />
            ) : (
              <span 
                onClick={() => dispatch(toggleComplete(todo.id))}
                className={`cursor-pointer transition-all duration-200 ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-100'
                }`}
              >
                {todo.text}
              </span>
            )}
          </div>

          {/* Right Side Actions: Edit/Save & Delete Buttons */}
          <div className="flex items-center gap-2">
            {isEditingId === todo.id ? (
              // Save Checkmark Icon Button
              <button 
                onClick={() => handleEditSave(todo.id)}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors duration-200"
                title="Save Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
            ) : (
              // Pencil Edit Icon Button
              <button 
                onClick={() => handleEditStart(todo.id, todo.text)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded transition-colors duration-200"
                title="Edit Todo"
                disabled={todo.completed}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </button>
            )}

            {/* Trash Button */}
            <button 
              onClick={() => dispatch(removeTodo(todo.id))}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors duration-200 focus:outline-none"
              title="Delete Todo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </li>
      ))}

      {/* Clear All Button - Only shows if there are items in the list */}
      {todos.length > 0 && (
        <button
          onClick={() => dispatch(clearTodos())}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 shadow-md text-sm"
        >
          Clear All Tasks
        </button>
      )}
    </div>
  );
}

export default Todos;