import { atom } from "recoil";
import { Book, IUserDatas } from "../recoil/atomInterface";
import { Comments } from "../recoil/atomInterface";

/*다크 모드 / 라이트모드 관리를 위한 아톰 */
export const isDarkMode = atom({
  key: "DarkMode",
  default: false,
});

export const bookDataState = atom<Book[]>({
  key: "bookDataState",
  default: [],
});

export const commentsDataState = atom<Comments[]>({
  key: "commentsDataState",
  default: [],
});

/*게시판 구현에 필요한 상태관리 컴포넌트들을 위한 아톰*/
export const TitleState = atom<string>({
  key: "titleState",
  default: "",
});

export const ContentState = atom<string>({
  key: "ContentState",
  default: "",
});

export const AuthorState = atom<string>({
  key: "AuthorState",
  default: "",
});

/** 로그인  창 모달 아톰 */
export const IsLoginModalOpenState = atom<boolean>({
  key: "isLoginModalOpen",
  default: false,
});

//**유저 이름 상태 관리 창 아톰 */
export const userDisplayNameState = atom<string | null>({
  key: "userDisplayNameState",
  default: null,
});
