import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
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
    if (e.key === 'Enter' || e.target.nodeName === 'BUTTON') {
      axios
        .post('https://pre-onboarding-selection-task.shop/auth/signin', {
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          data: { email: inputValue.id, password: inputValue.pw },
        })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token);
          window.alert('반갑습니다 회원님🎉');
          navigate('/todo');
        })
        .catch((error) => {
          window.alert(error.response.data.message);
        });
    }
  };

  return (
    <FormSignIn>
      <Title>로그인</Title>
      <FormInput
        testId='email-input'
        name='id'
        type='text'
        changeFunc={saveUserValue}
        keyupFunc={goToNext}
        placeholder='이메일'
      />
      <FormInput
        testId='password-input'
        name='pw'
        type='password'
        changeFunc={saveUserValue}
        keyupFunc={goToNext}
        placeholder='비밀번호'
      />
      <FormButton
        testId='signin-button'
        disabled={!isValidate}
        opacity={opacity}
        clickFunc={goToNext}
        title='로그인'
      />
    </FormSignIn>
  );
}

const FormSignIn = styled.form``;

const Title = styled.h1``;
