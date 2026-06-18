import { useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo';
import Todos from './components/todos';
import todoReducer from './features/todoslice';

function App() {
  

  return (
    <>
      <h1>Hello, React!</h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App
