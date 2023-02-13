import React, { useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import styled from 'styled-components';
import TodoInput from '../../components/input/TodoInput';

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
    <Form onSubmit={handleSubmit}>
      <TodoInput
        testId='new-todo-input'
        placeholder='today to do'
        value={text}
        changeFunc={handleChange}
      />
      <Button data-testid='new-todo-add-button'>
        <HiOutlinePlusCircle />
      </Button>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  padding: 1.4rem 1rem;
  background-color: var(--color-bg-dark);
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: var(--color-darkgrey);
`;
