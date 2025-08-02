package com.booknest.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.booknest.dto.BookUpdateRequest;
import com.booknest.dto.BookUploadRequest;
import com.booknest.model.Book;
import com.booknest.service.BookService;

import java.io.*;
import java.security.Principal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.Resource;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // File storage directories
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.cover-upload-dir}")
    private String coverUploadDir;

    /**
     * ✅ Get all books OR search books (combined endpoint)
     */
    @GetMapping
    public List<Book> listBooks(@RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return bookService.search(search);
        }
        return bookService.getAllBooks();
    }

    /**
     * ✅ Read book PDF by book id
     */
    @GetMapping("/{id}/pdf")
    public ResponseEntity<InputStreamResource> readPdf(@PathVariable Long id) throws IOException {
        Book book = bookService.getBook(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        File file = new File(uploadDir + File.separator + book.getFileName());

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + book.getFileName())
                .contentLength(file.length())
                .body(resource);
    }

    /**
     * ✅ Upload a new book (ADMIN only)
     */
//    @PostMapping("/upload")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Book> uploadBook(@RequestParam("file") MultipartFile file,
//                                           @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
//                                           @Valid @ModelAttribute BookUploadRequest request) throws IOException {
//
//        // Save PDF file
//        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
//        File destination = new File(uploadDir + File.separator + fileName);
//        file.transferTo(destination);
//
//        // Save cover image if provided
//        String coverFileName = null;
//        if (coverImage != null && !coverImage.isEmpty()) {
//            String originalName = coverImage.getOriginalFilename().toLowerCase();
//            if (!(originalName.endsWith(".jpg") || originalName.endsWith(".jpeg") || originalName.endsWith(".png"))) {
//                throw new RuntimeException("Only JPG/PNG images are allowed for cover image.");
//            }
//            coverFileName = UUID.randomUUID() + "_" + originalName;
//            File coverDest = new File(coverUploadDir + File.separator + coverFileName);
//            coverImage.transferTo(coverDest);
//        }
//
//        // Save book details
//        Book book = new Book();
//        book.setTitle(request.getTitle());
//        book.setAuthor(request.getAuthor());
//        book.setDescription(request.getDescription());
//        book.setFileName(fileName);
//        book.setUploadedAt(new Timestamp(System.currentTimeMillis()));
//        book.setCoverImageFileName(coverFileName);
//        book.setGenres(request.getGenres());
//
//        return ResponseEntity.ok(bookService.saveBook(book));
//    }
    
 // uploadBook: ensure non-null cover file name
    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> uploadBook(@RequestParam("file") MultipartFile file,
                                           @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
                                           @Valid @ModelAttribute BookUploadRequest request) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File dest = new File(uploadDir + File.separator + fileName);
        file.transferTo(dest);

        String coverFileName;
        if (coverImage != null && !coverImage.isEmpty()) {
            String orig = coverImage.getOriginalFilename().toLowerCase();
            if (!orig.endsWith(".jpg") && !orig.endsWith(".jpeg") && !orig.endsWith(".png")) {
                throw new RuntimeException("Only JPG/PNG images are allowed.");
            }
            coverFileName = UUID.randomUUID() + "_" + orig;
            File coverDest = new File(coverUploadDir + File.separator + coverFileName);
            coverImage.transferTo(coverDest);
        } else {
            coverFileName = "default.png"; // fallback
        }

        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setDescription(request.getDescription());
        book.setFileName(fileName);
        book.setCoverImageFileName(coverFileName);
        book.setUploadedAt(new Timestamp(System.currentTimeMillis()));
        book.setGenres(request.getGenres());

        return ResponseEntity.ok(bookService.saveBook(book));
    }

    // getCoverImage: unchanged (returns default if fileName==null or missing)
    
    
    

    /**
     * ✅ Get cover image for a book
     */
    @GetMapping("/{id}/cover")
    public ResponseEntity<Resource> getCoverImage(@PathVariable Long id) throws IOException {
        Book book = bookService.getBook(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        String fileName = book.getCoverImageFileName();
        File file;

        if (fileName == null) {
            // fallback default
            file = new File(coverUploadDir + File.separator + "default.jpeg");
            if (!file.exists()) return ResponseEntity.notFound().build();
        } else {
            file = new File(coverUploadDir + File.separator + fileName);
            if (!file.exists()) return ResponseEntity.notFound().build();
        }

        Resource resource = new InputStreamResource(new FileInputStream(file));
        String contentType = file.getName().endsWith(".png") ? "image/png" : "image/jpeg";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + file.getName())
                .body(resource);
    }

    /**
     * ✅ Update book metadata (ADMIN only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> updateBook(@PathVariable Long id,
                                           @Valid @RequestBody BookUpdateRequest request) {
        Book book = bookService.getBook(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setDescription(request.getDescription());
        book.setGenres(request.getGenres());

        return ResponseEntity.ok(bookService.saveBook(book));
    }

    /**
     * ✅ Fetch a single book by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBook(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return ResponseEntity.ok(book);
    }

    /**
     * ✅ Delete a book (ADMIN only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        Book book = bookService.getBook(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Delete file if exists
        File file = new File(uploadDir + File.separator + book.getFileName());
        if (file.exists()) file.delete();

        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * ✅ Legacy search endpoint (optional, keeps backward compatibility)
     */
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String q) {
        return bookService.search(q);
    }
}
