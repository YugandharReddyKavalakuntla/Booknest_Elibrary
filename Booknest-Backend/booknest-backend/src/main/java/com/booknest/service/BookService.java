package com.booknest.service;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.booknest.model.Book;
import com.booknest.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBook(Long id) {
        return bookRepository.findById(id);
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
    
    public List<Book> search(String q) {
        return bookRepository.search(q);
    }

}


