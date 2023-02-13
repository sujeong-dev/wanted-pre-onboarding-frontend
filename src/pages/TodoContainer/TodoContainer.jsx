import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoHeader from '../TodoHeader/TodoHeader';
import TodoList from '../TodoList/TodoList';

const FILTERS = [
  { id: 0, title: 'all' },
  { id: 1, title: 'active' },
  { id: 2, title: 'completed' },
];

export default function TodoContainer() {
  const [currentFilter, setCurrentFilter] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (!!!localStorage.getItem('access_token')) {
      window.alert('회원가입을 먼저 진행해주세요.');
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <>
      <TodoHeader
        filters={FILTERS}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <TodoList currentFilter={currentFilter} />
    </>
  );
}
