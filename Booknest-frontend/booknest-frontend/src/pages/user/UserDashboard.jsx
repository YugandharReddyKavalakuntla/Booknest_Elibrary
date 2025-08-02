// src/pages/user/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"; // Optional custom styles

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch books on mount
  useEffect(() => {
    api.get("/books")
      .then(res => {
        setBooks(res.data);
        setFilteredBooks(res.data);
      })
      .catch(() => setMessage("❌ Failed to load books"));
  }, []);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase();
    setFilteredBooks(
      books.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    );
  }, [search, books]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRead = (id) => {
    window.open(`http://localhost:8080/api/books/${id}/pdf`, "_blank");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
        <span className="navbar-brand fw-bold">📘 BookNest</span>
        <div className="collapse navbar-collapse">
          <input
            className="form-control me-2 ms-3"
            type="search"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-outline-light" onClick={() => navigate("/change-password")}>
              Change Password
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h4 className="mb-3">📚 All Books</h4>
        {message && <div className="alert alert-warning">{message}</div>}

        <div className="row">
          {filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
                  <p className="card-text">{book.description}</p>
                  <button
                    className="btn btn-sm btn-primary mt-auto"
                    onClick={() => handleRead(book.id)}
                  >
                    📖 Read Book
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredBooks.length === 0 && (
            <div className="text-center text-muted mt-4">No books found</div>
          )}
        </div>
      </div>
    </div>
  );
}
