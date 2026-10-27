import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import CartPanel from "./components/CartPanel";
import { getBooks } from "./services/bookService";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      try {
        setLoading(true);
        setError("");

        const data = await getBooks(controller.signal);
        setBooks(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Unable to load books. Check that the Spring Boot API is running."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => controller.abort();
  }, []);

  function addToCart(book) {
  setNotice("");

  const existingItem = cart.find(
    (item) => item.id === book.id
  );

  const quantity = existingItem?.quantity ?? 0;

  if (quantity >= book.stockQuantity) {
    setNotice(`No more copies of "${book.title}" can be added.`);
    return;
  }

  setCart((currentCart) => {
    const item = currentCart.find(
      (entry) => entry.id === book.id
    );

    if (item) {
      return currentCart.map((entry) =>
        entry.id === book.id
          ? { ...entry, quantity: entry.quantity + 1 }
          : entry
      );
    }

    return [
      ...currentCart,
      {
        id: book.id,
        title: book.title,
        author: book.author,
        price: Number(book.price),
        stockQuantity: book.stockQuantity,
        quantity: 1,
      },
    ];
  });
}

  function increaseQuantity(bookId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === bookId &&
        item.quantity < item.stockQuantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(bookId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === bookId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function removeFromCart(bookId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== bookId)
    );
    setNotice("");
  }
  
function handleCheckout() {
  if (cart.length === 0) return;

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const dummyOrder = {
    orderId: `ORD-${Date.now()}`,
    orderDate: new Date().toLocaleString(),
    items: cart.map((item) => ({ ...item })),
    total,
  };

  setOrder(dummyOrder);
  setCart([]);
}


  const filteredBooks = books.filter((book) => {
    const query = search.trim().toLowerCase();

   return (
  String(book.title ?? "").toLowerCase().includes(query) ||
  String(book.author ?? "").toLowerCase().includes(query) ||
  String(book.isbn ?? "").toLowerCase().includes(query)
  );
  });

  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Bookstore home">
          <span>BOOK<span className="brand-accent">STORE</span></span>
        </a>

        <nav className="header-nav">
          <a href="#catalogue">Catalogue</a>
          <a href="#cart">My cart ({totalCartItems})</a>
        </nav>
      </header>

      <main>
         <section className="store-layout">
          <div className="catalogue" id="catalogue">
            <div className="section-heading">
              <div>
                <p className="eyebrow">WELCOME TO BOOK STORE</p>
                 </div>
              <label className="search-box">
                <span className="visually-hidden">Search books</span>
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="Search title, author or ISBN..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>

            {loading && (
              <div className="state-message" role="status">
                Loading books from the bookstore API...
              </div>
            )}

            {!loading && error && (
              <div className="state-message error-message" role="alert">
                <p>{error}</p>
                <button
                  className="primary-button"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && filteredBooks.length === 0 && (
              <div className="state-message">
                {books.length === 0
                  ? "No books are available at the moment."
                  : "No books match your search."}
              </div>
            )}

            {!loading && !error && filteredBooks.length > 0 && (
              <>
                <p className="results-count">
                  Showing {filteredBooks.length} book
                  {filteredBooks.length !== 1 ? "s" : ""}
                </p>

                <div className="book-grid">
                  {filteredBooks.map((book) => {
                    const cartItem = cart.find(
                      (item) => item.id === book.id
                    );

                    return (
                      <BookCard
                        key={book.id}
                        book={book}
                        cartQuantity={cartItem?.quantity ?? 0}
                        onAddToCart={addToCart}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div id="cart" className="cart-column">
            <CartPanel
              cart={cart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
              onCheckout={handleCheckout}
            />

            {notice && (
              <p className="notice-message" role="status">
                {notice}
              </p>
            )}
          </div>
               </section>
      </main>

      <CheckoutModal
        order={order}
        onClose={() => setOrder(null)}
      />
    </div>
  );
}