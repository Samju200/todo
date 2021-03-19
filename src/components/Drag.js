import React, { useContext, useRef, useState, useEffect } from 'react';
// import ListItem from './ListItem';
import { DataContext } from './DataProvider';

export default function Drag() {
  const [todos, setTodos] = useContext(DataContext);
  //   const initialDnDState = {
  //     draggedFrom: null,
  //     draggedTo: null,
  //     isDragging: false,
  //     originalOrder: [],
  //     updatedOrder: [],
  //   };
  //   const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  //   //   const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  //   // onDragStart fires when an element
  //   // starts being dragged
  //   const onDragStart = (event) => {
  //     const initialPosition = Number(event.currentTarget.dataset.position);

  //     setDragAndDrop({
  //       ...dragAndDrop,
  //       draggedFrom: initialPosition,
  //       isDragging: true,
  //       originalOrder: todos,
  //     });

  //     // Note: this is only for Firefox.
  //     // Without it, the DnD won't work.
  //     // But we are not using it.
  //     event.dataTransfer.setData('text/html', '');
  //   };

  //   // onDragOver fires when an element being dragged
  //   // enters a droppable area.
  //   // In this case, any of the items on the list
  //   const onDragOver = (event) => {
  //     // in order for the onDrop
  //     // event to fire, we have
  //     // to cancel out this one
  //     event.preventDefault();

  //     let newList = dragAndDrop.originalOrder;

  //     // index of the item being dragged
  //     const draggedFrom = dragAndDrop.draggedFrom;

  //     // index of the droppable area being hovered
  //     const draggedTo = Number(event.currentTarget.dataset.position);

  //     const itemDragged = newList[draggedFrom];
  //     const remainingItems = newList.filter(
  //       (item, index) => index !== draggedFrom
  //     );

  //     newList = [
  //       ...remainingItems.slice(0, draggedTo),
  //       itemDragged,
  //       ...remainingItems.slice(draggedTo),
  //     ];

  //     if (draggedTo !== dragAndDrop.draggedTo) {
  //       setDragAndDrop({
  //         ...dragAndDrop,
  //         updatedOrder: newList,
  //         draggedTo: draggedTo,
  //       });
  //     }
  //   };

  //   const onDrop = (event) => {
  //     setTodos(dragAndDrop.updatedOrder);

  //     setDragAndDrop({
  //       ...dragAndDrop,
  //       draggedFrom: null,
  //       draggedTo: null,
  //       isDragging: false,
  //     });
  //   };

  //   const onDragLeave = () => {
  //     setDragAndDrop({
  //       ...dragAndDrop,
  //       draggedTo: null,
  //     });
  //   };

  //   // Not needed, just for logging purposes:
  //   React.useEffect(() => {
  //     console.log('Dragged From: ', dragAndDrop && dragAndDrop.draggedFrom);
  //     console.log('Dropping Into: ', dragAndDrop && dragAndDrop.draggedTo);
  //   }, [dragAndDrop]);

  //   React.useEffect(() => {
  //     console.log('List updated!');
  //   }, [todos]);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragItemNode = useRef();

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
  useEffect(() => {
    console.log();
  }, []);
  const handletDragStart = (e, item) => {
    console.log('Starting to drag', item);

    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    console.log('Entering a drag target', targetItem);
    const currentTodo = dragItem.current;
    if (dragItemNode.current !== e.target) {
      console.log('Target is NOT the same as dragged item');
      setTodos((oldTodo) => {
        let newTodo = JSON.parse(JSON.stringify(oldTodo));
        console.log(currentTodo);
        console.log(targetItem);
        console.log(newTodo);
        const newComplete = newTodo.splice(
          targetItem,
          0,
          newTodo.splice(currentTodo, 1)[0]
        );
        console.log(newComplete);
        // console.log(newIncomplete);
        dragItem.current = targetItem;
        localStorage.setItem('todos', JSON.stringify(newTodo));
        return newTodo;
      });
    }
  };
  const handleDragEnd = (e) => {
    setDragging(false);
    console.log('dragind end');
    dragItem.current = null;
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
    dragItemNode.current = null;
  };

  return (
    <ul className="todoLists">
      {todos.map((todo) => (
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
          onChange={() => checkComplete(todo.id)}
        >
          <label htmlFor="todo" className={todo.complete ? 'active' : ''}>
            {todo.name}
          </label>
          <input
            type="checkbox"
            // id={id}
            checked={todo.complete}
            // onChange={() => checkComplete(id)}
            className="checkbox"
          />
        </li>
      ))}
    </ul>
  );
}
