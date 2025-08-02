# BookNest

**An e-Library Platform**

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Team](#team)
- [License](#license)

## Overview
BookNest is a full-stack e-library web application that allows administrators to manage book collections and users to browse, search, and read e-books online. Developed during the Tata STRIVE apprenticeship program, BookNest demonstrates secure authentication, role-based access control, and efficient file streaming.

## Features
- **User Management**: Registration, login, profile management, and password reset via email
- **Role-Based Access**: Separate Admin and User roles with appropriate permissions
- **CRUD Operations**: Create, read, update, and delete books
- **File Streaming**: Inline streaming of PDF books and cover images
- **Search & Filter**: Case-insensitive search by title, author, and genre with partial matching
- **JWT Authentication**: Stateless security with token blacklisting on logout
- **Responsive UI**: Mobile-first design built with React and Bootstrap

## Technology Stack
- **Frontend**: React.js (Vite), React Router, Bootstrap 5, Axios
- **Backend**: Java 17, Spring Boot 3.x, Spring Security, JPA/Hibernate
- **Database**: MySQL 8
- **Email Service**: JavaMailSender for password reset functionality
- **Build Tools**: npm (frontend), Maven (backend)
