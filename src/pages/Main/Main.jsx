import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChoiceButton from '../../components/button/ChoiceButton';
import styled from 'styled-components';

export default function Main() {
  const navigate = useNavigate();
  const hasToken = !!localStorage.getItem('access_token');
  const goToSignIn = () => {
    if (hasToken) {
      alert('이미 로그인 하셨습니다.');
      navigate('/todo');
    } else {
      navigate('/signin');
    }
  };
  const goToSignUp = () => {
    if (hasToken) {
      alert('이미 로그인 하셨습니다.');
      navigate('/todo');
    } else {
      navigate('/signup');
    }
  };
  const goToTodo = () => {
    if (hasToken) {
      navigate('/todo');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/signin');
    }
  };
  return (
    <MainContainer>
      <Title>DAILY TODO</Title>
      <ChoiceMain>
        <ChoiceButton title='로그인' clickFunc={goToSignIn} />
        <ChoiceButton title='가입하기' clickFunc={goToSignUp} />
        <ChoiceButton title='TODO' clickFunc={goToTodo} />
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
