import { useEffect, useState } from "react";
import axios from "axios";
import type { Book } from "./types/book";

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = "https://localhost:7192";

  const fetchBooks = async () => {
    const response = await axios.get(
      `${apiUrl}/Book/AllBooks?pageSize=1000&pageNum=1`
    );

    setBooks(response.data.books || response.data.Books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "bookID" || name === "pageCount" || name === "price"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      await axios.put(
        `${apiUrl}/Book/UpdateBook/${formData.bookID}`,
        formData
      );
    } else {
      await axios.post(`${apiUrl}/Book/AddBook`, formData);
    }

    resetForm();
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setFormData(book);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${apiUrl}/Book/DeleteBook/${id}`);
    fetchBooks();
  };

  const resetForm = () => {
    setFormData({
      bookID: 0,
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      classification: "",
      category: "",
      pageCount: 0,
      price: 0,
    });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2>Admin Books</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input className="form-control mb-2" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input className="form-control mb-2" name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
        <input className="form-control mb-2" name="publisher" placeholder="Publisher" value={formData.publisher} onChange={handleChange} />
        <input className="form-control mb-2" name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} />
        <input className="form-control mb-2" name="classification" placeholder="Classification" value={formData.classification} onChange={handleChange} />
        <input className="form-control mb-2" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input className="form-control mb-2" name="pageCount" type="number" placeholder="Page Count" value={formData.pageCount} onChange={handleChange} />
        <input className="form-control mb-2" name="price" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} />

        <button type="submit" className="btn btn-primary me-2">
          {isEditing ? "Update Book" : "Add Book"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetForm}>
          Cancel
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>${b.price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(b)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(b.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooks;