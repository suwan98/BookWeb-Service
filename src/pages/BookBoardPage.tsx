import styled from "styled-components";
import BoardList from "../components/BookBoardPageContent/BoardList";
import Header from "../components/common/Header";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { database } from "../FireBase/fireBase";
import { commentsDataState } from "../recoil/atom";
import { useRecoilState } from "recoil";
const BookBoardPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useRecoilState(commentsDataState);

  const handleDeleteAll = async () => {
    const querySnapShot = await getDocs(collection(database, "userDatas"));
    if (!querySnapShot.empty) {
      const ok = window.confirm("정말로 모든 내용을 삭제하시나요?");
      if (ok) {
        // 모든 문서를 순회하면서 삭제
        querySnapShot.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        setPosts([]);
      }
    } else {
      alert("작성된 게시글이 없습니다!");
    }
  };
  return (
    <div>
      <Header />
      <BoardContainer>
        <BoadrWrapper>
          <BoardTitle>개발자 게시판💁‍♂️</BoardTitle>
          {/** 게시글 작성 리스트 페이지  */}
          <BoadrListWrapper>
            <BoardList />
          </BoadrListWrapper>
          <ButtonWrapper>
            <StyledButtons
              variant="outlined"
              onClick={() => {
                navigate("/bookBoard/write");
              }}>
              게시글 작성하기
            </StyledButtons>
            <StyledButtons variant="outlined" onClick={handleDeleteAll}>
              전체삭제
            </StyledButtons>
            <StyledButtons variant="outlined">수정</StyledButtons>
          </ButtonWrapper>
        </BoadrWrapper>
      </BoardContainer>
    </div>
  );
};

export default BookBoardPage;

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoadrWrapper = styled.div`
  width: 80%;
  max-width: 800px;
`;

const BoardTitle = styled.h2`
  margin-bottom: 30px;
`;

const BoadrListWrapper = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
  justify-content: center;
`;

const StyledButtons = styled(Button)`
  background: ${(props) => props.theme.background};
`;
