import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [wishlist, setWishlist] = useState([]); // State for wishlist items

  // Add to cart or update the cart if item already exists
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update quantity of item in cart
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Add or remove item from wishlist
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isExisting = prevWishlist.some(item => item.id === product.id);
      if (isExisting) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // Check if an item is in the wishlist
  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use WishlistContext
export const useWishlist = () => useContext(WishlistContext);
