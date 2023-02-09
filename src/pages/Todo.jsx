import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function Todo({ todoObj, onUpdate, onDelete }) {
  const { id, todo, isCompleted } = todoObj;
  const [text, setText] = useState(todo);
  const [isModify, setIsModify] = useState(false);

  const handleChange = (e) => {
    onUpdate({ ...todoObj, isCompleted: !isCompleted });
  };
  const handleTextChange = (e) => setText(e.target.value);
  const handleModify = () => {
    setIsModify(true);
  };
  const handleModifyCancel = () => {
    setIsModify(false);
    setText(todo);
  };
  const handleTextSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...todoObj, todo: text });
    setIsModify(false);
  };
  const handleDelete = () => {
    onDelete({ ...todoObj });
  };

  return (
    <li key={id}>
      <input
        type='checkbox'
        id={id}
        checked={isCompleted}
        onChange={handleChange}
      />
      {isModify ? (
        <form>
          <input type='text' value={text} onChange={handleTextChange} />
          <button onClick={handleTextSubmit}>제출</button>
          <button onClick={handleModifyCancel}>취소</button>
        </form>
      ) : (
        <>
          <label htmlFor={id}>{todo}</label>
          <span>
            <button onClick={handleModify}>수정</button>
            <button onClick={handleDelete}>
              <FaTrashAlt />
            </button>
          </span>
        </>
      )}
    </li>
  );
}
