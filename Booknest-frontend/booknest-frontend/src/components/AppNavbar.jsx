// src/components/AppNavbar.jsx
import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

export default function AppNavbar({ onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('search') || '');

  const handleSearch = e => {
    e.preventDefault();
    onSearch(query);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand onClick={() => navigate('/user/books')} style={{ cursor: 'pointer' }}>
          📘 BookNest
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar" />
        <Navbar.Collapse id="app-navbar">
          <Form className="d-flex flex-grow-1 mx-3" onSubmit={handleSearch}>
            <FormControl
              name="search"
              placeholder="Search books…"
              className="me-2"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                onSearch(e.target.value);        
              }}
            />
            <Button type="submit" variant="outline-primary">Go</Button>
          </Form>
          <Nav>
            <Nav.Link onClick={() => navigate('/user/change-password')}>Change Password</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
