import React, { useContext, useState } from 'react';
import { DataContext } from './DataProvider';
import FilterButton from './FilterButton';
import Footer from './Footer';

const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.complete,
  Completed: (todo) => todo.complete,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function List() {
  const [todos, setTodos] = useContext(DataContext);
  const [filter, setFilter] = useState('All');

  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: todos,
    });
  };

  const onDragOver = (event) => {
    event.preventDefault();
    let newTodo = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);
    const itemDragged = newTodo[draggedFrom];
    const remainingItems = newTodo.filter(
      (item, index) => index !== draggedFrom
    );

    newTodo = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newTodo,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    setTodos(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const checkComplete = (id) => {
    const newTodos = [...todos];

    newTodos.filter((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });

    setTodos(newTodos);
  };
  const changeIndex = () => {
    const newTodos = [...todos];
    const newIndex = newTodos.length - 1;
    newTodos.filter((todo) => {
      if (todo.complete === true) {
        const newcomplete = newTodos.splice(newTodos.indexOf(todo), 1);
        const newInComplete = newTodos.splice(todo, newIndex);
        const newTodo = [...newInComplete, ...newcomplete];

        return setTodos(newTodo);
      }
      return todo;
    });
    // setDragAndDrop(todos);
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <>
      <div className="section">
        <ul className="todoLists">
          {todos.filter(FILTER_MAP[filter]).map((todo, index) => (
            <li
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              onChange={changeIndex}
              complete={todo.complete}
            >
              <label htmlFor="todo" className={todo.complete ? 'active' : ''}>
                {todo.name}
              </label>
              <input
                type="checkbox"
                checked={todo.complete}
                className="checkbox"
                onChange={() => checkComplete(todo.id)}
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer filterList={filterList} />
    </>
  );
}
