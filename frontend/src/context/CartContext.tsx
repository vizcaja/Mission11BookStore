import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "../types/book";

type CartItem = {
  book: Book;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookID: number) => void;
  updateQuantity: (bookID: number, quantity: number) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adds a book to the cart. If the book is already in the cart, increase quantity.
  const addToCart = (book: Book) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.book.bookID === book.bookID);

      if (existingItem) {
        return prev.map((item) =>
          item.book.bookID === book.bookID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookID: number) => {
    setCart((prev) => prev.filter((item) => item.book.bookID !== bookID));
  };

  const updateQuantity = (bookID: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookID);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.book.bookID === bookID ? { ...item, quantity } : item
      )
    );
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}