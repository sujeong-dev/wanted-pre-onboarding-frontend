import React from 'react';

export default function FormButton({
  testId,
  disabled,
  opacity,
  clickFunc,
  title,
}) {
  return (
    <button
      type='submit'
      data-testid={testId}
      disabled={disabled}
      style={{ opacity: opacity }}
      onClick={clickFunc}
    >
      {title}
    </button>
  );
}
