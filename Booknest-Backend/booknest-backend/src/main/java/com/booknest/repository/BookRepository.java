package com.booknest.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.booknest.model.Book;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	
	// title OR author OR at least one genre matches  (case‑insensitive, partial)
    @Query("""
           SELECT DISTINCT b FROM Book b
           LEFT JOIN b.genres g
           WHERE LOWER(b.title)  LIKE LOWER(CONCAT('%', :q, '%'))
              OR LOWER(b.author) LIKE LOWER(CONCAT('%', :q, '%'))
              OR LOWER(g)        LIKE LOWER(CONCAT('%', :q, '%'))
           """)
    List<Book> search(@Param("q") String q);

    // Filter only by genres (optional helper)
    List<Book> findByGenresIgnoreCaseIn(Collection<String> genres);
	
	
}

