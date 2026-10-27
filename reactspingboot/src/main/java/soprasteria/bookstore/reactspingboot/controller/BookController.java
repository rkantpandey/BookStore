package soprasteria.bookstore.reactspingboot.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import soprasteria.bookstore.reactspingboot.dto.BookResponse;
import soprasteria.bookstore.reactspingboot.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<BookResponse> getAllBooks() {
        return bookService.getAllActiveBooks();
    }

    @GetMapping("api/{id}")
    public BookResponse getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }
}