import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from './Todo';
import AddTodo from './AddTodo';

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
    <section>
      <ul>
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todoObj={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === 'all') {
    return todos;
  } else if (filter === 'active') {
    return todos.filter((todo) => todo.isCompleted === false);
  } else {
    return todos.filter((todo) => todo.isCompleted === true);
  }
}
