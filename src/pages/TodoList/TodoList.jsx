import React, { useEffect, useState } from 'react';
import Todo from '../Todo/Todo';
import { todoApis } from '../../apis/api/todoApis';
import AddTodo from '../AddTodo/AddTodo';
import styled from 'styled-components';

export default function TodoList({ currentFilter }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    //todo get
    todoApis.getTodo().then((response) => {
      setTodos(response);
    });
  }, []);

  //todo create
  const handleAdd = (text) => {
    todoApis.createTodo({ todo: text }).then((response) => {
      setTodos((prev) => [...prev, response]);
    });
  };
  //todo update
  const handleUpdate = (updated) => {
    const { id, todo, isCompleted } = updated;
    todoApis
      .updateTodo(id, {
        todo: todo,
        isCompleted: isCompleted,
      })
      .then((response) => {
        setTodos(
          todos.map((todo) => (todo.id === response.id ? response : todo))
        );
      });
  };
  //todo delete
  const handleDelete = (deleted) => {
    todoApis.deleteTodo(deleted.id).then((response) => {
      setTodos(todos.filter((todo) => todo.id !== deleted.id));
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
