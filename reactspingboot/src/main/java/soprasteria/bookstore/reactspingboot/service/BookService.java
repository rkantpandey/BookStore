package soprasteria.bookstore.reactspingboot.service;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soprasteria.bookstore.reactspingboot.dto.BookResponse;
import soprasteria.bookstore.reactspingboot.entity.Book;
import soprasteria.bookstore.reactspingboot.exception.ResourceNotFoundException;
import soprasteria.bookstore.reactspingboot.repository.BookRepository;

@Service
@Transactional(readOnly = true)
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookResponse> getAllActiveBooks() {
        return bookRepository.findByActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .filter(Book::isActive)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Active book not found with ID: " + id
                    )
                );

        return toResponse(book);
    }

    private BookResponse toResponse(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getPrice(),
                book.getStockQuantity()
        );
    }
}