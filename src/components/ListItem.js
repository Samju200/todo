import React, { useState, useRef, useEffect } from 'react';

export default function ListItem({
  todo,
  id,
  checkComplete,
  handletDragStart,
  handleDragEnd,
  handleDragEnter,
}) {
  //   const getStyles = (item) => {
  //     if (
  //       dragItem.current.grpI === item.grpI &&
  //       dragItem.current.itemI === item.itemI
  //     ) {
  //       return 'dnd-item current';
  //     }
  //     return 'dnd-item';
  // };

  return (
    <li
      draggable
      onDragStart={(e) => handletDragStart(e, { todo })}
      onDragEnter={
        dragging
          ? (e) => {
              handleDragEnter(e, { todo });
            }
          : null
      }
    >
      <label htmlFor="todo" className={todo.complete ? 'active' : ''}>
        {todo.name}
      </label>
      <input
        type="checkbox"
        // id={id}
        checked={todo.complete}
        onChange={() => checkComplete(id)}
        className="checkbox"
      />
    </li>
  );
}
