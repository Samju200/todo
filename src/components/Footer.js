import React, { useContext } from 'react';
import { DataContext } from './DataProvider';

export default function Footer({ filterList }) {
  const [todos, setTodos] = useContext(DataContext);

  const ItemLeft = () => {
    return todos.filter((todo) => !todo.complete);
  };
  const completeItem = () => {
    return todos.filter((todo) => todo.complete);
  };
  // const activeItem = () => {
  //   if (todos) {
  //     const newTodo = todos.filter((todo) => todo.complete === false);
  //     return setTodos(newTodo);
  //   } else {
  //     setTodos(todos);
  //   }
  // };
  // const completeItem = () => {
  //   const newTodo = todos.filter((todo) => todo.complete === true);
  //   return setTodos(newTodo);
  // };
  // const allItem = () => {
  //   const newTodos = [...todos];
  //   newTodos.filter((todo) => {
  //     if (todo.complete) {
  //       todo.complete = !todo.complete;
  //     }
  //     return todo;
  //   });
  //   setTodos(newTodos);
  // };

  const deleteTodo = () => {
    setTodos(ItemLeft());
  };

  return (
    <>
      <div className="footer">
        <div className="item">
          <p className="item-left"> {ItemLeft().length} items left</p>
          <p className="item-complete"> {completeItem().length} complete</p>
        </div>

        <div className="items">{filterList}</div>

        <button onClick={deleteTodo} className="delete ">
          Clear Completed
        </button>
      </div>
    </>
  );
}
