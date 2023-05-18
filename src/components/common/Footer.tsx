import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <LeftSection>
        <Description>개발자를 위한 도서 추천 및 게시판</Description>
      </LeftSection>
      <RightSection>
        <LinkList>
          <li>이용약관</li>
          <li>개인정보 처리방침</li>
          <li>문의하기</li>
        </LinkList>
        <CopyRight>&copy; 2023 Dev Books. All rights reserved.</CopyRight>
      </RightSection>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
  background-color: ${(props) => props.theme.FooterBgColor};

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.textColor};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const LinkList = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: 10px;

  li {
    margin-right: 20px;
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;

    &:hover {
      color: #0077c2;
    }
  }

  @media (max-width: 768px) {
    li {
      margin-right: 10px;
      font-size: 12px;
    }
  }
`;

const CopyRight = styled.p`
  font-weight: 300;
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;
