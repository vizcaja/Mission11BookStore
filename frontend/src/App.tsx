import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./component/BookList";
import CategoryFilter from "./component/CategoryFilter";
import CartPage from "./component/CartPage";
import CartSummary from "./component/CartSummary";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="mt-4">
            <CartSummary />
          </div>
        </div>

        <div className="col-md-9">
          <BookList category={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;