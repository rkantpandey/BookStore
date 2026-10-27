import { formatPrice } from "../utils/Currency";
export default function BookCard({ book, onAddToCart, cartQuantity }) {
  const availableStock = book.stockQuantity;
  const remainingStock = availableStock - cartQuantity;
  const outOfStock = remainingStock <= 0;
  return (
    <article className="book-card">
       <div className="book-details">
        <p className="book-author">{book.author}</p>
        <h3>{book.title}</h3>
        <p className="book-isbn">ISBN: {book.isbn}</p>

        <div className="book-card-footer">
          <div>
            <p className="book-price">
               {formatPrice(book.price)}
            </p>
            <p className={outOfStock ? "stock out" : "stock"}>
              {outOfStock
                ? "Stock limit reached"
                : `${remainingStock} available`}
            </p>
          </div>

          <button
            className="primary-button"
            disabled={outOfStock}
            onClick={() => onAddToCart(book)}
          >
            {outOfStock ? "Unavailable" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}