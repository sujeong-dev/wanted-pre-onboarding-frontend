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
  return (
    <>
      <button onClick={goToSignIn}>로그인</button>
      <button onClick={goToSignUp}>회원가입</button>
    </>
  );
}
