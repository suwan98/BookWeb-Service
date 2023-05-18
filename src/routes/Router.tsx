import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MemberJoinPage from "../pages/MemberJoinPage";
import BookBoardPage from "../pages/BookBoardPage";
import BookOfTheMonthPage from "../pages/BookOfTheMonthPage";
import BookRecommedPage from "../pages/BookRecommedPage";
import MainPageContentDetailPage from "../pages/MainPageContentDetailPage";
import BoardWritePage from "../components/BookBoardPageContent/BoardWritePage";
import BookRecommedDetailPage from "../pages/BookRecommedDetailPage";
import BoadrEdit from "../components/BookBoardPageContent/BoadrEdit";
import BoardDetail from "../components/BookBoardPageContent/BoardDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memberJoin" element={<MemberJoinPage />} />
        <Route path="/bookBoard" element={<BookBoardPage />} />
        <Route path="/bookBoard/write" element={<BoardWritePage />} />
        <Route path="/bookOfTheMonth" element={<BookOfTheMonthPage />} />
        <Route path="/bookRecommend" element={<BookRecommedPage />} />
        <Route
          path="/MainPageContentDetailPage/:isbn"
          element={<MainPageContentDetailPage />}
        />
        <Route
          path="bookRecommend/:bookId"
          element={<BookRecommedDetailPage />}
        />
        <Route path="bookBoard/detail/:id" element={<BoardDetail />} />
        <Route path="bookBoard/detail/:id/edit" element={<BoadrEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
