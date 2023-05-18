import styled from "styled-components";
import BoardWirte from "./BoardWirte";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { database } from "../../FireBase/fireBase";
import { useRecoilState } from "recoil";
import { AuthorState, ContentState, TitleState } from "../../recoil/atom";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";

const BoardWritePage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useRecoilState(ContentState);
  const [title, setTitle] = useRecoilState(TitleState);
  const [author, setAuthor] = useRecoilState(AuthorState);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    const usersRef = collection(database, "userDatas");
    const userRef = doc(usersRef);
    const date = new Date();
    const newDate = date.toLocaleString();
    event.preventDefault();
    await addDoc(collection(database, "userDatas"), {
      content: content,
      id: userRef.id,
      author: author,
      title: title,
      date: newDate,
    });
    setContent("");
    setTitle("");
    setAuthor("");
    navigate("/bookBoard");
  };
  const onAuthorChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setAuthor(value);
  };

  const onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  return (
    <>
      <Header />
      <BoardContainer>
        <BoardForm onSubmit={onSubmitHandler}>
          <TitleWrapper>
            <Title>게시글 작성하기</Title>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              onChange={onTitleChangeHandler}
            />
          </TitleWrapper>
          {/* Quil 라이브러리를 사용해서 내용 작성란 구현 */}
          <BoardWirte />

          <BoardBottomWrapper>
            <input
              type="text"
              placeholder="작성자를 입력해주세요"
              onChange={onAuthorChangeHandler}
              name="author"
            />
            <button>작성하기</button>
          </BoardBottomWrapper>
        </BoardForm>
      </BoardContainer>
    </>
  );
};

export default BoardWritePage;

const BoardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.textColor};
`;
const BoardForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BoardBottomWrapper = styled.div`
  display: flex;
  padding-top: 1.2rem;
`;
