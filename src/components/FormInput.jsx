import React from 'react';

export default function FormInput({
  testId,
  name,
  type,
  changeFunc,
  keyupFunc,
  placeholder,
}) {
  return (
    <input
      data-testid={testId}
      name={name}
      type={type}
      onChange={changeFunc}
      onKeyUp={keyupFunc}
      placeholder={placeholder}
    />
  );
}
