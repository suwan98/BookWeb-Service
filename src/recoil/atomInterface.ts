export interface Book {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

export interface Comments {
  id: string;
  title: string;
  author: string;
  date: number;
  content: string;
}

export interface IUserDatas {
  id: number;
  author: string;
  content: string;
}
