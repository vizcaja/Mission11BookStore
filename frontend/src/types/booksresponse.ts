import type { Book } from "./book";

export interface BooksResponse {
  books: Book[];
  totalNumBooks: number;
}