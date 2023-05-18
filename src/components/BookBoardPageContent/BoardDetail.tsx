import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { commentsDataState } from "../../recoil/atom";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../FireBase/fireBase";
import { Comments } from "../../recoil/atomInterface";
import styled from "styled-components";
import Header from "../common/Header";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useRecoilState(commentsDataState);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Comments | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapShot = await getDocs(collection(database, "userDatas"));
    const data = querySnapShot.docs.map((doc) => doc.data() as Comments);
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      const targetPost = posts.find((post) => post.id === id);
      if (targetPost) {
        setPost(targetPost);
      }
    }
  }, [id, loading, posts]);

  if (post === null) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <DetailContainer>
        <Header />
        <StyledCard>
          <CardActionArea>
            <Typography gutterBottom variant="h5" component="div">
              <h2>{post.title}</h2>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p>작성자: {post.author}</p>
              <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
              <p>작성일자: {post.date}</p>
            </Typography>
          </CardActionArea>
          <Button
            onClick={() => {
              navigate(`/bookBoard/detail/${post.id}/edit`);
            }}>
            수정하기
          </Button>
        </StyledCard>
      </DetailContainer>
    </>
  );
};

export default BoardDetail;

const DetailContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 50px 50px;
`;
