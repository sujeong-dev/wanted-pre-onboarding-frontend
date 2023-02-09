import React, { useState } from 'react';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';

const FILTERS = ['all', 'active', 'completed'];

export default function TodoContainer() {
  const [filter, setFilter] = useState(FILTERS[0]);
  return (
    <div>
      <TodoHeader
        filters={FILTERS}
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      <TodoList currentFilter={filter} />
    </div>
  );
}
