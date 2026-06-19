import { useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo';
import Todos from './components/todos';

function App() {
  return (
    <>
      <h1 className="text-5xl font-bold underline mb-4 text-center ">Hello, This is a todo created by React Redux!</h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App;