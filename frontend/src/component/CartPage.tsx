import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="container mt-4">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Book</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.book.bookID}>
                  <td>{item.book.title}</td>
                  <td>${item.book.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="form-control"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        updateQuantity(item.book.bookID, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.book.bookID)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ${getCartTotal().toFixed(2)}</h4>

          <Link to="/" className="btn btn-secondary mt-3">
            Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
}

export default CartPage;