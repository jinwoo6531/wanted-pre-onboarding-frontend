import axios from 'axios';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../api';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from '../../Pages/Auth/common';
import { AccountContext } from '../../store/accountContext';
import { Marginer } from '../marginer';

const SignUpForm = () => {
  const { switchToSignin } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /@+/g;
    if (!emailRegex.test(e.target.value)) {
      setEmailError(true);
      setIsEmail(false);
    } else {
      setIsEmail(true);
      setEmailError(false);
    }
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(e.target.value);

    if (value.length >= 8) {
      setIsPassword(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setIsPassword(false);
    }
  };

  const onSignup = useCallback(async () => {
    await axios
      .post(API.SIGNUP, {
        email,
        password,
      })
      .then((response) => {
        if (response) {
          alert('회원가입에 성공하셨습니다.');
        }
      })
      .catch((error) => {
        alert('회원가입에 실패하셨습니다.');
        return;
      });
  }, [email, password]);

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          required
          onChange={onChangeEmail}
        />
        {emailError && <ErrorMessage>이메일 형식이여야합니다.</ErrorMessage>}
        <Marginer direction="vertical" margin="0.5em" />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          required
          onChange={onChangePassword}
        />
        {passwordError && (
          <ErrorMessage>
            비밀번호는 8-10자 영문,숫자 조합이여야 합니다.
          </ErrorMessage>
        )}
        <Marginer direction="vertical" margin="0.5em" />
      </FormContainer>

      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton
        type="submit"
        onClick={onSignup}
        id="signup_btn"
        disabled={!(isEmail && isPassword)}
      >
        회원가입
      </SubmitButton>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        <BoldLink onClick={switchToSignin}>로그인 하기</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignUpForm;

const ErrorMessage = styled.div`
  color: red;
`;
