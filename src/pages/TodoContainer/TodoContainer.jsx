import React, { useState } from 'react';
import TodoHeader from '../TodoHeader/TodoHeader';
import TodoList from '../TodoList/TodoList';

const FILTERS = [
  { id: 0, title: 'all' },
  { id: 1, title: 'active' },
  { id: 2, title: 'completed' },
];

export default function TodoContainer() {
  const [currentFilter, setCurrentFilter] = useState(0);

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
