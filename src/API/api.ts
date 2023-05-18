import axios from "axios";

const API_KEY = "528aa72da6f451747b162c3ad6dc6fda";
const BASE_URL = "https://dapi.kakao.com/v3/search/book";

export const toDayBooks = async (query: string) => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
      params: {
        query: query,
        size: 50,
      },
    });
    const data = res.data;
    const documents = data.documents;

    return documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const openLibraryBook = async (category: string) => {
  const url = `https://openlibrary.org/subjects/${category}.json`;
  const res = await axios.get(url);
  const works = res.data.works;

  const books = works.map((work: any) => ({
    isbn: work.isbn,
    title: work.title,
    author: work.authors[0]?.name,
    category: category,
    image: work.cover_id
      ? `http://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
      : "no image",
  }));
  return books;
};
