import React from 'react';
import { Link } from 'react-router-dom';
import ChoiceButton from '../../components/button/ChoiceButton';
import styled from 'styled-components';

export default function Main() {
  return (
    <MainContainer>
      <Title>DAILY TODO</Title>
      <ChoiceMain>
        <Linkto to='/signin'>
          <ChoiceButton title='로그인' />
        </Linkto>
        <Linkto to='/signup'>
          <ChoiceButton title='가입하기' />
        </Linkto>
        <Linkto to='/todo'>
          <ChoiceButton title='TODO' />
        </Linkto>
      </ChoiceMain>
    </MainContainer>
  );
}

const MainContainer = styled.section`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const ChoiceMain = styled.div`
  margin: 100px auto;
`;

const Title = styled.h1`
  margin: auto;
  padding: 100px;
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  color: var(--color-darkblue);
`;

const Linkto = styled(Link)`
  &:hover {
    cursor: pointer;
  }
`;
