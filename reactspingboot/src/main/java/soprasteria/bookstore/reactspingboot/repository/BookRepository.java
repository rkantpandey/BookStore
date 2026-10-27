package soprasteria.bookstore.reactspingboot.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import soprasteria.bookstore.reactspingboot.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByActiveTrue();
    boolean existsByIsbn(String isbn);
}
