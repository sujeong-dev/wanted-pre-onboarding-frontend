import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const goToSignIn = () => {
    if (!!localStorage.getItem('access_token')) {
      alert('이미 로그인 하셨습니다');
      navigate('/todo');
    } else {
      navigate('/signin');
    }
  };
  const goToSignUp = () => {
    if (!!localStorage.getItem('access_token')) {
      alert('이미 로그인 하셨습니다');
      navigate('/todo');
    } else {
      navigate('/signup');
    }
  };
  const goToTodo = () => {
    if (!!localStorage.getItem('access_token')) {
      navigate('/todo');
    } else {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/signin');
    }
  };
  return (
    <>
      <button onClick={goToSignIn}>로그인</button>
      <button onClick={goToSignUp}>회원가입</button>
      <button onClick={goToTodo}>TODO</button>
    </>
  );
}
