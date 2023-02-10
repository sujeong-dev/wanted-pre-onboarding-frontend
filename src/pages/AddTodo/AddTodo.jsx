import React, { useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    onAdd(text);
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='오늘의 할 일'
        value={text}
        onChange={handleChange}
      />
      <button>
        <HiOutlinePlusCircle />
      </button>
    </form>
  );
}
