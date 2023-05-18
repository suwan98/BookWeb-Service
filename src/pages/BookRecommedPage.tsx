import styled from "styled-components";
import Header from "../components/common/Header";
import { useEffect } from "react";
import { openLibraryBook } from "../API/api";
import { useRecoilState } from "recoil";
import { commentsDataState } from "../recoil/atom";
import { Comments } from "../recoil/atomInterface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookRecommedPage = () => {
  // bookRecommendDetailPage 라우팅
  const navigate = useNavigate();
  const handleBookRecommendDetailPageRouting = (bookId: number) => {
    navigate(`/bookRecommend/${bookId}`);
  };

  //카테고리가 아직 선택되지 않았을때의 상태값
  const [isCategroySelected, setIsCategorySelected] = useState(false);

  // Select 함수 구현
  const [newbooks, setNewBooks] = useRecoilState<Comments[]>(commentsDataState);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchCategroyInput, setSearchCategroyInput] = useState("");
  useEffect(() => {
    const fetchBooks = async () => {
      const result = await openLibraryBook(selectedCategory);
      setNewBooks(result);
      localStorage.setItem("selectedCategory", selectedCategory);
      localStorage.setItem("selectedBooks", JSON.stringify(result));
    };

    fetchBooks();
  }, [selectedCategory, setNewBooks]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setIsCategorySelected(true);
  };

  //검색 함수 구현

  const handleSearcrhInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategroyInput(event.target.value);
  };

  return (
    <>
      <Header />
      <BookRecommedContainer>
        {/*좌측 UI */}
        <BookRecommendLeftWrapper>
          {/*추천 책 검색 폼 */}
          <span>여기에서 검색</span>
          <BookRecommendSearchWrapper>
            <BookRecommendSearchForm>
              <BookRecommendSearchInput
                onChange={handleSearcrhInput}
                value={searchCategroyInput}
              />
            </BookRecommendSearchForm>
          </BookRecommendSearchWrapper>
          {/*추천 개발카테고리 선택 폼 */}
          <BookRecommendChoiceForm>
            <label htmlFor="select"></label>
            <BookRecommendChoiceSelect
              value={selectedCategory}
              onChange={handleSelectChange}>
              <option value="java">자바</option>
              <option value="javascript">자바스크립트</option>
              <option value="react">리액트</option>
              <option value="python">파이썬</option>
            </BookRecommendChoiceSelect>
            {!isCategroySelected && <span>선택된 카테고리가 아직 없어요</span>}
          </BookRecommendChoiceForm>
        </BookRecommendLeftWrapper>

        {/*우측 UI */}
        <BookRecommendRightWrapper>
          {/*추천도서 리스트 UI */}
          <BookRecommendList>
            <h2>{selectedCategory}</h2>
          </BookRecommendList>

          {/*추천 도서 리스트 이미지  */}
          <BookRecommendImageWrapper>
            {newbooks
              .filter((book) =>
                book.title
                  .toLowerCase()
                  .includes(searchCategroyInput.toLowerCase())
              )
              .map((book) => (
                <div
                  key={book.image}
                  onClick={() => {
                    handleBookRecommendDetailPageRouting(book.id);
                  }}>
                  <img src={book?.image} alt={book.title} />
                  <span>{book.title}</span>
                </div>
              ))}
          </BookRecommendImageWrapper>
        </BookRecommendRightWrapper>
      </BookRecommedContainer>
    </>
  );
};

export default BookRecommedPage;

const BookRecommedContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 40px;
  padding: 20px;
  height: 100vh;
`;

/*왼쪽 부분 UI 구현 */
const BookRecommendLeftWrapper = styled.div`
  padding: 20px;
  display: flex;
  padding-left: 50px;
  gap: 30px;
  flex-direction: column;
`;

const BookRecommendSearchWrapper = styled.div``;

const BookRecommendSearchForm = styled.form``;
const BookRecommendSearchInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  border: 0;
  border-bottom: 1px solid #cccccc;
  padding: 0.3rem 0;
  outline: none;
`;

const BookRecommendChoiceForm = styled.form``;
const BookRecommendChoiceSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  border: 0;
  border-bottom: 1px solid #cccccc;
  padding: 0.3rem 0;
  outline: none;
`;

/*오른쪽 부분 UI 구현 */

const BookRecommendRightWrapper = styled.div`
  padding-left: 30px;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  scroll-behavior: auto;
`;

const BookRecommendList = styled.div``;

const BookRecommendImageWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  text-align: center;

  div {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    display: flex;
  }
`;
