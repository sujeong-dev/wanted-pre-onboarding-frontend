import React from 'react';

export default function TodoHeader({ filters, currentFilter, onFilterChange }) {
  return (
    <header>
      {filters.map((filter, idx) => (
        <li key={idx}>
          <button onClick={() => onFilterChange(filter)}>{filter}</button>
        </li>
      ))}
    </header>
  );
}
