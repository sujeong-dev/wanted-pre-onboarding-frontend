import React from 'react';
import styled from 'styled-components';

export default function ChoiceButton({ clickFunc, title }) {
  return <Button onClick={clickFunc}>{title}</Button>;
}

const Button = styled.button`
  width: 150px;
  height: 50px;
  padding: 10px;
  margin: 10px auto;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.backColor || 'transparent'};
  color: ${(props) => props.color || 'var(--color-darkgrey)'};

  &:hover {
    background-color: ${(props) =>
      props.backHoverColor || 'var(--color-darkblue)'};
    color: ${(props) => props.hoverColor || 'var(--color-white)'};
    cursor: pointer;
  }
`;
