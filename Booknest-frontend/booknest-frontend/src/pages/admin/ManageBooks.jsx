// src/pages/admin/ManageBooks.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch all books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      await api.delete(`/books/${id}`);
      setMessage("✅ Book deleted successfully");
      fetchBooks();
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Failed to delete book");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">📚 Manage Books</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <table className="table table-bordered table-hover">
        <thead className="table-success">
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Author</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No books found</td>
            </tr>
          )}
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  // onClick={() => navigate(`/admin/edit-book/${book.id}`)}
                  onClick={() => navigate(`/admin/edit/${book.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(book.id)}
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
}
