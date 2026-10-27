package soprasteria.bookstore.reactspingboot;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import soprasteria.bookstore.reactspingboot.entity.Book;
import soprasteria.bookstore.reactspingboot.repository.BookRepository;

@Configuration
public class DataInitializer {

        @Bean
        CommandLineRunner loadBooks(BookRepository repository) {
                return args -> {
                        if (repository.count() == 0) {
                                List<Book> books = List.of(
                                                new Book("Effective Java", "Joshua Bloch",
                                                                "9780134685991",
                                                                new BigDecimal("22.00"), 2),

                                                new Book("Artificial Intelligence", "Stuart Russell",
                                                                "9780134610993",
                                                                new BigDecimal("14.00"), 4),

                                                new Book("React and React Native", "Adam Boduch",
                                                                "9781839211140",
                                                                new BigDecimal("15.00"), 5),

                                                new Book("SWIFT for Developers", "Author 1",
                                                                "9780000000001",
                                                                new BigDecimal("25.00"), 4),

                                                new Book("Payment Systems", "K. C. Chakrabarty",
                                                                "9780000000003",
                                                                new BigDecimal("27.00"), 3),

                                                new Book("CHAPS Payment Systems", "Author 3",
                                                                "9780000000004",
                                                                new BigDecimal("30.00"), 1));

                                repository.saveAll(books);
                        }
                };
        }
}
