import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import styled from "styled-components";

const GoogleLoginButton = () => {
  const clientId =
    "174494825553-7pibqo4ded9rrg4h63s8fuj9tgaddliq.apps.googleusercontent.com";
  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <StyledGoogleButton
          onSuccess={() => {
            console.log("로그인성공");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

const StyledGoogleButton = styled(GoogleLogin)`
  display: block;
  width: 90%;
  max-width: 680px;
  margin: 20px auto;
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  line-height: 40px;
  background: #5b90f0;
  color: white;
  box-shadow: 0 15px 30px;
  transition: 0.2s linear;
`;

export default GoogleLoginButton;
