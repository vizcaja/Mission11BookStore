import { useEffect, useState } from "react";
import axios from "axios";
import type { Book } from "../types/book";
import type { BooksResponse } from "../types/booksresponse";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalNumBooks, setTotalNumBooks] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get<BooksResponse>(
        `https://localhost:7192/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`
      );

      setBooks(response.data.books);
      setTotalNumBooks(response.data.totalNumBooks);
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder]);

  const totalPages = Math.ceil(totalNumBooks / pageSize);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Online Bookstore</h1>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Results per page:</label>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Sort by Title:</label>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {books.map((b) => (
        <div key={b.bookID} className="card mb-3">
          <div className="card-body">
            <h3>{b.title}</h3>
            <p><strong>Author:</strong> {b.author}</p>
            <p><strong>Publisher:</strong> {b.publisher}</p>
            <p><strong>ISBN:</strong> {b.isbn}</p>
            <p><strong>Classification:</strong> {b.classification}</p>
            <p><strong>Category:</strong> {b.category}</p>
            <p><strong>Pages:</strong> {b.pageCount}</p>
            <p><strong>Price:</strong> ${b.price.toFixed(2)}</p>
          </div>
        </div>
      ))}

      <div className="d-flex gap-2 flex-wrap">
        <button
          className="btn btn-primary"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className="btn btn-outline-primary"
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-primary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;