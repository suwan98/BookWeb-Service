import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bookDataState } from "../../recoil/atom";
import { toDayBooks } from "../../API/api";
import { Book } from "../../recoil/atomInterface";
import { Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const Main = () => {
  //**카카오 북api 데이터 중 검색어("개발자")쿼리를 가져와 렌더링해주는 함수 */

  const navigate = useNavigate();

  const [books, setBooks] = useRecoilState<Book[]>(bookDataState);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await toDayBooks("프론트엔드");
      setBooks(data);
    };
    fetchBooks();
  }, []);

  //**캐러셀 로직 구현 */
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  //**캐러셀 아이템이 버튼을눌러서 바뀔때마다 books에 대한 설명도 바뀌는 로직 */
  const getSelectedBook = () => {
    return books[activeIndex];
  };

  //*캐러셀 아이템이 끝에 다다르면 다시 첫번째 페이지아이템으로 렌더링 */

  //*디테일 페이지 라우팅 */
  const detailPageRouting = () => {
    const selectedBook = books[activeIndex];
    return selectedBook ? selectedBook.isbn : "";
  };

  //* 선택한 책의 isbn값을 로컬스트로지에 저장하고 디테일 페이지에서는 해당 값을 로컬 스토리지에서 불러오기
  const handleClick = () => {
    const selectedBook = books[activeIndex];
    if (selectedBook) {
      localStorage.setItem("selectedBookISBN", selectedBook.isbn);
    }
  };

  return (
    <MainContainer>
      <MainLeftContentWrapper>
        <MainLeftTitle>
          <Title
            onClick={() => {
              navigate("bookOfTheMonth");
            }}>
            오늘의 도서 추천✨
          </Title>
          <MainBooktTitle>{getSelectedBook()?.title}</MainBooktTitle>
          <MainBookAutuor>{getSelectedBook()?.authors}</MainBookAutuor>
        </MainLeftTitle>
        <MainLeftDesc>
          <Desc>
            {books[activeIndex] && books[activeIndex].contents !== "" ? (
              getSelectedBook()?.contents
            ) : (
              <Desc>해당 책에 대한 설명이 없습니다😱</Desc>
            )}
          </Desc>
        </MainLeftDesc>
      </MainLeftContentWrapper>
      <MainRightContentWrapper>
        <Link to={`/MainPageContentDetailPage/${detailPageRouting()}`}>
          <Carousel
            onClick={handleClick}
            activeIndex={activeIndex}
            onSelect={handleSelect}
            interval={null}>
            {books.map((book, index) => {
              return (
                <Carousel.Item key={index}>
                  <MainRigthImage src={book.thumbnail} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Link>
        <Pagination>
          <Pagination.Prev onClick={() => setActiveIndex(activeIndex - 1)} />
          <Pagination.Next onClick={() => setActiveIndex(activeIndex + 1)} />
        </Pagination>
      </MainRightContentWrapper>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-wrap: wrap;
`;

/* 홈화면 왼쪽 부분 구현 UI */
const MainLeftContentWrapper = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  margin: 40px;

  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex: 1 0 100%;
  }
`;
const MainLeftTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  font-size: 48px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const MainBooktTitle = styled.span`
  font-size: 28px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.accentColor};
`;

const MainBookAutuor = styled.span`
  font-size: 28px;
  margin-bottom: 10px;
`;

const MainLeftDesc = styled.div`
  font-size: 20px;
`;
const Desc = styled.span`
  font-size: 20px;
`;

/* 홈화면 우측 부분 구현 UI */
const MainRightContentWrapper = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const MainRigthImage = styled.img`
  margin: 60px;
  width: 360px;
  height: 360px;
  background-size: cover;
  object-fit: contain;
  z-index: -1;

  &:hover {
    transition: all 0.5s ease;

    transform: scale(1.2);
  }
`;
