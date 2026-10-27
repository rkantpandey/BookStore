import { formatPrice } from "../utils/Currency";
export default function CartPanel({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return (
    <aside className="cart-panel">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h2>Shopping cart</h2>
        </div>

        <span className="cart-count">{itemCount}</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Add a book from the catalogue to get started.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>{formatPrice(item.price)} each</p>
                  <button
                    className="text-button"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="quantity-control">
                  <button
                    aria-label={`Decrease quantity of ${item.title}`}
                    disabled={item.quantity <= 1}
                    onClick={() => onDecrease(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase quantity of ${item.title}`}
                    disabled={item.quantity >= item.stockQuantity}
                    onClick={() => onIncrease(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="summary-row total-row">
              <span>Estimated total</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <p className="cart-note">
              Final prices and stock availability will be verified
              by the server at checkout.
            </p>

            <button
              className="primary-button checkout-button"
              disabled={cart.length === 0}
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}