import { useRecoilValue } from "recoil";
import { bookDataState } from "../recoil/atom";
import { Book } from "../recoil/atomInterface";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/common/Header";

const MainPageContentDetailPage = () => {
  const { isbn } = useParams(); // URL에서 ISBN값을 추출
  const selectedBookISBN = localStorage.getItem("selectedBookISBN");
  if (!selectedBookISBN || selectedBookISBN !== isbn) {
    return <h1>일치하는 책 데이터가 없어요</h1>;
  }

  const books = useRecoilValue<Book[]>(bookDataState);
  const findBooks = books.find((book) => book.isbn === selectedBookISBN);

  return (
    <>
      <Header />
      <Container>
        <Title>{findBooks?.title}</Title>
        <ContentWrapper>
          <hr />
          <ImageWrapper>
            <img src={findBooks?.thumbnail} />
          </ImageWrapper>
          <DescWrapper>
            <span>저자 : {findBooks?.authors}</span>
            <span>출판사 : {findBooks?.publisher}</span>
            <span>발행일 : {findBooks?.datetime.slice(0, 10)}</span>
            <span>가격 : {findBooks?.price}원</span>
            <span>설명 : {findBooks?.contents.slice(0, 100) + "..."}</span>
          </DescWrapper>
        </ContentWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  height: 100vh;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  display: flex;
  padding-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  height: 300px;
  width: 300px;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
`;

export default MainPageContentDetailPage;
