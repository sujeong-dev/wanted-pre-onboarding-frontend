import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import styled from 'styled-components';

export default function TodoList({ currentFilter }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    //todo get
    const accessToken = localStorage.getItem('access_token');
    axios
      .get('https://pre-onboarding-selection-task.shop/todos', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }, []);

  //todo create
  const handleAdd = (text) => {
    const accessToken = localStorage.getItem('access_token');
    axios
      .post(
        'https://pre-onboarding-selection-task.shop/todos',
        { todo: text },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
      )
      .then((response) => {
        setTodos((prev) => [...prev, response.data]);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
  //todo update
  const handleUpdate = (updated) => {
    const accessToken = localStorage.getItem('access_token');
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${updated.id}`,
        { todo: updated.todo, isCompleted: updated.isCompleted },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
      )
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === response.data.id ? response.data : todo
          )
        );
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
  //todo delete
  const handleDelete = (deleted) => {
    const accessToken = localStorage.getItem('access_token');
    axios
      .delete(
        `https://pre-onboarding-selection-task.shop/todos/${deleted.id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setTodos(todos.filter((todo) => todo.id !== deleted.id));
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };

  const filteredTodos = getFilteredItems(todos, currentFilter);

  return (
    <Section>
      <TodoBody>
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todoObj={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </TodoBody>
      <AddTodo onAdd={handleAdd} />
    </Section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === 0) {
    return todos;
  } else if (filter === 1) {
    return todos.filter((todo) => todo.isCompleted === false);
  } else {
    return todos.filter((todo) => todo.isCompleted === true);
  }
}

const Section = styled.section`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
`;

const TodoBody = styled.ul`
  flex: 1 1 auto;
  overflow-y: auto;
`;
