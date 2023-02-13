import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApis } from '../../apis/api/userApis';
import FormInput from '../../components/input/FormInput';
import FormButton from '../../components/button/SignButton';
import styled from 'styled-components';

export default function SignUp() {
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
  });
  const { id, pw } = inputValue;

  const saveUserValue = (e) => {
    const { name, value } = e.target;
    const targetValues = { ...inputValue, [name]: value };
    setInputValue(targetValues);
  };
  const isValidate = id.includes('@') && pw.length >= 8;

  const opacity = isValidate ? '1' : '0.5';

  const navigate = useNavigate();
  const goToNext = (e) => {
    e.preventDefault();
    userApis.signup({ email: id, password: pw }).then((response) => {
      window.alert('회원가입이 완료되었습니다 🎉');
      navigate('/signin');
    });
  };
  const goToLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <Title>이메일 주소로 가입하기</Title>
      <FormSignUp onSubmit={goToNext}>
        <InputInfo>어떤 이메일로 가입하시겠습니까?</InputInfo>
        <FormInput
          testId='email-input'
          name='id'
          type='text'
          changeFunc={saveUserValue}
          placeholder='internship@wanted.co.kr'
        />
        <InputInfo>
          비밀번호를 설정해주세요. <ValidatePw>8자 이상</ValidatePw>
        </InputInfo>
        <FormInput
          testId='password-input'
          name='pw'
          type='password'
          changeFunc={saveUserValue}
          placeholder='비밀번호'
        />
        <FormButton
          testId='signup-button'
          disabled={!isValidate}
          opacity={opacity}
          title='가입하기'
        />
      </FormSignUp>
      <GoLoginContainer>
        <GoLoginTitle>
          이미 계정이 있으신가요?
          <GoLogin onClick={goToLogin}>로그인하기</GoLogin>
        </GoLoginTitle>
      </GoLoginContainer>
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

const FormSignUp = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  text-align: center;
`;

const InputInfo = styled.h2`
  text-align: left;
  font-size: 13px;
  margin-bottom: 10px;
`;

const ValidatePw = styled.span`
  color: var(--color-accent);
`;

const GoLoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
`;

const GoLoginTitle = styled.h2`
  text-align: left;
  font-size: 15px;
  margin-bottom: 10px;
`;

const GoLogin = styled.span`
  margin-left: 5px;
  color: var(--color-darkblue);

  &:hover {
    cursor: pointer;
  }
`;
