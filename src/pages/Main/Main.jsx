import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChoiceButton from '../../components/button/ChoiceButton';
import styled from 'styled-components';

export default function Main() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Title>DAILY TODO</Title>
      <ChoiceMain>
        <ChoiceButton
          title='로그인'
          clickFunc={() => {
            navigate('/signin');
          }}
        />
        <ChoiceButton
          title='가입하기'
          clickFunc={() => {
            navigate('/signup');
          }}
        />
        <ChoiceButton
          title='TODO'
          clickFunc={() => {
            navigate('/todo');
          }}
        />
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
