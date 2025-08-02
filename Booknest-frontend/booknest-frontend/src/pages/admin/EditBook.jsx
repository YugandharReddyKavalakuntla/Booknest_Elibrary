// src/pages/admin/EditBook.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    genres: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load book data
  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => {
        setBook({
          ...res.data,
          genres: res.data.genres.join(", "),
        });
      })
      .catch(() => {
        setMessage("❌ Failed to load book data");
      });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      title: book.title,
      author: book.author,
      description: book.description,
      genres: book.genres
        .split(",")
        .map((g) => g.trim().toUpperCase())
        .filter((g) => g),
    };

    try {
      await api.put(`/books/${id}`, payload);  // Send as JSON (default)
      setMessage("✅ Book updated successfully!");
      setTimeout(() => navigate("/admin/manage"), 1000);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Book</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input className="form-control" name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" rows={3} value={book.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Genres</label>
          <input
            className="form-control"
            name="genres"
            value={book.genres}
            onChange={handleChange}
            placeholder="FICTION, TECHNOLOGY"
            required
          />
          <small className="text-muted">Separate multiple genres with commas</small>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}
