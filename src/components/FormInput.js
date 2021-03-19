import React, { useState, useContext, useRef, useEffect } from 'react';
import { DataContext } from './DataProvider';
import { IoIosAdd } from 'react-icons/io';

export default function FormInput() {
  const [todos, setTodos] = useContext(DataContext);
  const [todoName, setTodoName] = useState('');
  const todoInput = useRef();

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([
      { id: new Date().getTime().toString(), name: todoName, complete: false },
      ...todos,
    ]);
    setTodoName('');
    todoInput.current.focus();
  };

  useEffect(() => {
    todoInput.current.focus();
  }, []);
  return (
    <div className="form">
      <h1>TODO</h1>
      <form autoComplete="off" onSubmit={addTodo}>
        <input
          type="text"
          name="todos"
          id="todos"
          ref={todoInput}
          required
          placeholder="Create a new todo..."
          value={todoName}
          onChange={(e) => setTodoName(e.target.value.toLowerCase())}
        />

        <button type="submit" className={todoName ? '' : 'disabled'}>
          <IoIosAdd className="add" />
        </button>
      </form>
    </div>
  );
}
