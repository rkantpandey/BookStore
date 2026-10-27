
import { formatPrice } from "../utils/Currency";

export default function CheckoutModal({
  order,
  onClose,
}) {
  if (!order) return null;

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <div className="success-icon">✓</div>

        <h2>Order placed successfully!</h2>
        <p className="checkout-message">
          This is a dummy order for demonstration purposes.
        </p>

        <div className="order-details">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Order date:</strong> {order.orderDate}
          </p>
        </div>

        <h3>Order summary</h3>

        <div className="order-items">
          {order.items.map((item) => (
            <div className="order-item" key={item.id}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="order-total">
          <span>Total</span>
          <strong>{formatPrice(order.total)}</strong>
        </div>

        <button
          className="primary-button checkout-button"
          onClick={onClose}
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}
