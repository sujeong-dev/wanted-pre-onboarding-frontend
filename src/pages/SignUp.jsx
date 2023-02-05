import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import styled from 'styled-components';

export default function SignUp() {
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
  });
  console.log(inputValue);

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
      axios('https://pre-onboarding-selection-task.shop/auth/signup', {
        method: 'post',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        data: { email: inputValue.id, password: inputValue.pw },
      })
        .then((response) => {
          console.log(response);
          window.alert('회원가입이 완료되었습니다🎉');
          navigate('/signin');
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    }
  };
  return (
    <FormSignUp>
      <Title>회원가입</Title>
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
        testId='signup-button'
        disabled={!isValidate}
        opacity={opacity}
        clickFunc={goToNext}
        title='회원가입'
      />
    </FormSignUp>
  );
}

const FormSignUp = styled.form``;

const Title = styled.h1`
  color: red;
`;
