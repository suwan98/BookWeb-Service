import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../FireBase/fireBase";
import { useRecoilState } from "recoil";
import { commentsDataState } from "../../recoil/atom";

const BoardEdit = () => {
  const [posts, setPosts] = useRecoilState(commentsDataState);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <h3>안녕</h3>
    </div>
  );
};

export default BoardEdit;
