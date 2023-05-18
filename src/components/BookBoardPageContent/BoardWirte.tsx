import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import { ContentState } from "../../recoil/atom";
import styled from "styled-components";

const BoardWirte = () => {
  const [content, setContent] = useRecoilState(ContentState);
  const onContentChangeHandler = (value: string) => {
    setContent(value);
  };

  const modules = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
  };
  const style = {
    background: "white",
    minHeight: "500px",
  };

  return (
    <Container>
      <ReactQuill
        modules={modules}
        style={style}
        value={content}
        onChange={onContentChangeHandler}
        placeholder="내용을 입력해주세요"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default BoardWirte;
