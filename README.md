# 원티드 프리온보딩 프론트엔드 - 선발과제

## TODO 애플리케이션 만들기

<br />

## 1. 실행 방법

```zsh
$ npm install
$ npm start
```

<br />

## 2. 배포 링크 (데모)

[https://sujeong-todo.netlify.app](https://sujeong-todo.netlify.app)

<br />

## 3. 구현 내용

### 1. 로그인 / 회원가입

1. 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능

- 이메일 조건: `@` 포함
- 비밀번호 조건: 8자 이상

- 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여

2. 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동

3. 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동

- 응답받은 JWT는 로컬 스토리지에 저장

4. 로그인 여부에 따른 리다이렉트 처리를 구현해주세요

- 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트
- 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트

---

### 2. TODO LIST

1. `/todo`경로에 접속하면 투두 리스트 목록 표시

- 목록에서는 TODO의 내용과 완료 여부가 표시
- 카테고리별로 all, active, complted 3가지로 나뉨

2. 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button

- 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가

3. TODO의 체크박스를 통해 완료 여부를 수정

4. TODO 우측에 수정버튼과 삭제 버튼

- 투두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제

- 투두 리스트의 수정 기능 구현

  - TODO 우측의 수정 버튼을 누르면 수정모드가 활성화
  - 수정모드에서는 TODO의 내용을 변경
  - 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경
  - 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시
  - 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트
  - 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화
  
 <br />
 
 ## ⭐️ 인상깊은 코드
 ```jsx
 import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 1000,
});

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    window.alert(error.response.data.message);
    return Promise.reject(error);
  }
);

export default instance;
```
> api호출 시 범용적으로 사용되는 axios를 사용하기로 하였고 `반복되는 api호출을 어떻게하면 중복하지 않고 한번에 처리할 수 있을까?` 고민하다가 axios instance, interceptor에 대해 알게되었다.
`create()`를 통해 instance를 생성하고 interceptor로 요청과 응답값을 가로채어 토큰값이 필요한 경우에만 헤더에 토큰값을 추가하여 요청하고 응답시에 에러메세지를 받아 alert로 보여주게 하였다.

