import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { commentsDataState } from "../../recoil/atom";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { database } from "../../FireBase/fireBase";
import { Comments } from "../../recoil/atomInterface";
import Button from "@mui/material/Button";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useRecoilState(commentsDataState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapShot = await getDocs(collection(database, "userDatas"));
    const data = querySnapShot.docs.map((doc) => doc.data() as Comments);
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("정말로 삭제하시나요?");
    if (ok) {
      const docRef = doc(database, "userDatas", id);
      await deleteDoc(docRef);
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  if (loading) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <StyledTable bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>작성자</th>
            <th>내용</th>
            <th>작성시간</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <>
              <tr
                key={post.id}
                onClick={() => {
                  navigate(`/bookBoard/detail/${post.id}`);
                }}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>
                  <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                </td>
                <td>{post.date}</td>
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    handleDelete(post.id);
                  }}>
                  삭제
                </Button>
              </tr>
            </>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

const StyledTable = styled(Table)`
  width: 720px;
`;

export default BoardList;
