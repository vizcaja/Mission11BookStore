import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartSummary() {
  const { getCartCount, getCartTotal } = useCart();

  return (
    <div className="card p-3 shadow-sm">
      <h4>Cart Summary</h4>
      <p><strong>Items:</strong> {getCartCount()}</p>
      <p><strong>Total:</strong> ${getCartTotal().toFixed(2)}</p>
      <Link to="/cart" className="btn btn-primary">
        View Cart
      </Link>
    </div>
  );
}

export default CartSummary;