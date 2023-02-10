import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import TodoInput from '../../components/input/TodoInput';

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
    <TodoLi key={id}>
      <CheckBox
        type='checkbox'
        id={id}
        checked={isCompleted}
        onChange={handleChange}
      />
      {isModify ? (
        <Form onSubmit={handleTextSubmit}>
          <TodoInput
            testId='modify-input'
            value={text}
            changeFunc={handleTextChange}
          />
          <Button
            type='submit'
            data-testid='submit-button'
            onClick={handleTextSubmit}
          >
            제출
          </Button>
          <Button
            type='button'
            data-testid='cancel-button'
            onClick={handleModifyCancel}
          >
            취소
          </Button>
        </Form>
      ) : (
        <>
          <TodayWork htmlFor={id}>{todo}</TodayWork>
          <Span>
            <Button data-testid='modify-button' onClick={handleModify}>
              수정
            </Button>
            <Button data-testid='delete-button' onClick={handleDelete}>
              <FaTrashAlt />
            </Button>
          </Span>
        </>
      )}
    </TodoLi>
  );
}

const TodoLi = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.1rem 0;
  color: var(--color-text);
  background-color: var(--color-white);
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const TodayWork = styled.label`
  flex: 1 1;
  margin-left: 10px;
  font-size: 20px;
`;

const Form = styled.form`
  position: absolute;
  left: 50px;
`;

const Button = styled.button`
  background-color: var(--color-lightgrey);
  opacity: 0.5;

  &:hover {
    cursor: pointer;
  }
`;
const Span = styled.span``;
