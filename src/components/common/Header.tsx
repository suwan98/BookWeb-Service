import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import devBooksLogo from "../../assets/logo/logo2.png";
import {
  IsLoginModalOpenState,
  isDarkMode,
  userDisplayNameState,
} from "../../recoil/atom";
import LoginModal from "./Modal";
import LoginForm from "../LoginContent/LoginForm";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useRecoilState(
    IsLoginModalOpenState
  );
  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  const [userDisplayName, setUserDisplayName] =
    useRecoilState(userDisplayNameState);
  const navigate = useNavigate();

  const bookRecommendHandler = () => {
    navigate("/bookRecommend");
  };
  const bookBoardHandler = () => {
    navigate("/bookBoard");
  };

  const memberJoinPageHandler = () => {
    navigate("/memberJoin");
  };
  const toggleModeHandelr = () => {
    setIsDark((prev: boolean) => !prev);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Link to={"/"} style={{ display: "flex" }}>
            <span>DevBooks</span>
            <LogoImage src={devBooksLogo} alt="DevBooks Logo" />
          </Link>
        </LogoWrapper>
        <ContentWrapper>
          <span onClick={bookRecommendHandler}>개발자 추천 도서 목록🤖</span>
          <span onClick={bookBoardHandler}>개발자 게시판!🎆</span>
        </ContentWrapper>
        {/**다크모드/라이트모드 토글 구현하기 */}
        <UserWrapper>
          <ToggleModeButton onClick={toggleModeHandelr}>
            <ModeToggleIcon>{isDark === false ? "🌞" : "🌙"}</ModeToggleIcon>
          </ToggleModeButton>
          {userDisplayName ? (
            <>
              <span>반갑습니다, {userDisplayName}님</span>
            </>
          ) : (
            <>
              <span onClick={openLoginModal}>로그인</span>
              <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}>
                <LoginForm />
              </LoginModal>
              <span>/</span>
              <span onClick={memberJoinPageHandler}>회원가입</span>
              <BiUser />
            </>
          )}
        </UserWrapper>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  background: ${(props) => props.theme.HeaderBgColor};
  color: ${(props) => props.theme.textColor};
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  margin-right: 20px;
  display: flex;
`;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  gap: 20px;
  cursor: pointer;
`;

const UserWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding-right: 20px;
  cursor: pointer;
`;

const ToggleModeButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 999;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModeToggleIcon = styled.span`
  font-size: 24px;
  line-height: 1;
`;
