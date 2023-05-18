import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService, database } from "../FireBase/fireBase";
import { addDoc, collection } from "firebase/firestore";
type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const MemberJoinPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    const result = await createUserWithEmailAndPassword(
      authService,
      email,
      password
    );
    if (result.user) {
      const { uid, email } = result.user;
      const userData = {
        uid,
        email,
      };
      const usersColleciton = collection(database, "users");
      await addDoc(usersColleciton, userData);
    }
  };
  return (
    <>
      <Header />
      <Container>
        <Title>회원가입</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTextFiled
            id="email"
            type="text"
            placeholder="Email을 입력해주세요"
            {...register("email", {
              required: "이메일 입력은 필수입니다",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식이 맞지 않습니다",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage role="alert">{errors.email.message}</ErrorMessage>
          )}
          <StyledTextFiled
            id="password"
            type="password"
            {...register("password", {
              required: "비밀번호 입력은 필수입니다",
              minLength: {
                value: 7,
                message: "7자리 이상 입력해주세요",
              },
            })}
            placeholder="비밀번호를 입력해주세요"
          />
          {errors.password && (
            <ErrorMessage role="alert">{errors.password.message}</ErrorMessage>
          )}
          <StyledTextFiled
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues("password") ||
                "비밀번호가 일치하지 않습니다",
            })}
            placeholder="비밀번호를 확인해주세요"
          />
          {errors.confirmPassword && (
            <ErrorMessage role="alert">
              {errors.confirmPassword.message}
            </ErrorMessage>
          )}
          <SignUpButton type="submit">회원가입 하기</SignUpButton>
        </form>
      </Container>
    </>
  );
};

export default MemberJoinPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-bottom: 20px;
    gap: 20px;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.accentColor};
  letter-spacing: -3px;
  transition: 0.2s linear;
`;

const StyledTextFiled = styled(TextField)`
  max-width: 680px;
  height: 50px;
  margin: 0 auto;
  border-radius: 20px;
  border: none;
  background: rgba(#0f132a, 0.1);
  color: rgba(#0f132a, 0.3);
  padding: 0 0 0 15px;
  font-size: 14px;
  &:focus,
  &:active {
    outline: none;
    border: none;
    color: rgba(#0f132a, 1);
  }
`;

const ErrorMessage = styled.small`
  color: red;
`;

const SignUpButton = styled.button`
  background: ${(props) => props.theme.accentColor};
  color: white;
  display: block;
  width: 92.5%;
  max-width: 680px;
  height: 50px;
  border-radius: 8px;
  margin: 0 auto;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;
