// src/pages/user/AllBooks.jsx

import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import api from '../../api';

export default function AllBooks() {
  // ✅ Safely get searchQuery from context
  const outletContext = useOutletContext() || {};
  const searchQuery = outletContext.searchQuery || '';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        // ✅ Supports both search and full list
        const endpoint = searchQuery
          ? `/books?search=${encodeURIComponent(searchQuery)}`
          : '/books';

        const { data } = await api.get(endpoint);
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  if (!loading && books.length === 0) {
    return (
      <div className="text-center mt-4">
        No books available.
      </div>
    );
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {books.map(book => (
        <Col key={book.id}>
          <Card className="h-100">
            {/* ✅ Load cover image from backend with cache busting, fallback to default */}
            <Card.Img
              variant="top"
              src={`http://localhost:8080/api/books/${book.id}/cover?ts=${Date.now()}`}
              alt={`${book.title} cover`}
              style={{ objectFit: 'cover', height: '200px' }}
              onError={(e) => { e.target.src = '/images/default-book.png'; }}
            />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {book.author}
              </Card.Subtitle>
              <Card.Text className="text-truncate" style={{ maxHeight: '4.5em' }}>
                {book.description}
              </Card.Text>
              <Link to={`/user/read/${book.id}`} className="btn btn-primary">
                Read
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
