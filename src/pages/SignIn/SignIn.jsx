import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../../components/input/FormInput';
import FormButton from '../../components/button/SignButton';
import styled from 'styled-components';

export default function SignIn() {
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
  });

  const saveUserValue = (e) => {
    const { name, value } = e.target;
    const targetValues = { ...inputValue, [name]: value };
    setInputValue(targetValues);
  };
  const isValidate = inputValue.id.includes('@') && inputValue.pw.length >= 8;

  const opacity = isValidate ? '1' : '0.5';

  const navigate = useNavigate();
  const goToNext = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://pre-onboarding-selection-task.shop/auth/signin',
        { email: inputValue.id, password: inputValue.pw },
        { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
      )
      .then((response) => {
        localStorage.setItem('access_token', response.data.access_token);
        window.alert('반갑습니다 회원님 🎵');
        navigate('/todo');
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <Title>로그인</Title>
      <FormSignIn onSubmit={goToNext}>
        <FormInput
          testId='email-input'
          name='id'
          type='text'
          changeFunc={saveUserValue}
          placeholder='이메일'
        />
        <FormInput
          testId='password-input'
          name='pw'
          type='password'
          changeFunc={saveUserValue}
          placeholder='비밀번호'
        />
        <FormButton
          testId='signin-button'
          disabled={!isValidate}
          opacity={opacity}
          title='로그인'
        />
      </FormSignIn>
      <GoSignupContainer>
        <GoSignupTitle>
          계정이 없으신가요?
          <GoSignup onClick={goToSignup}>가입하기</GoSignup>
        </GoSignupTitle>
      </GoSignupContainer>
    </>
  );
}

const Title = styled.h1`
  margin: 100px auto 50px auto;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  color: var(--color-darkgrey);
`;

const FormSignIn = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  text-align: center;
`;

const GoSignupContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
`;

const GoSignupTitle = styled.h2`
  text-align: left;
  font-size: 15px;
  margin-bottom: 10px;
`;

const GoSignup = styled.span`
  margin-left: 5px;
  color: var(--color-darkblue);

  &:hover {
    cursor: pointer;
  }
`;
