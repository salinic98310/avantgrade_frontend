import React, { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext.jsx';

const WishlistPage = ({ addToCart }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = wishlist.reduce((acc, item) => {
      acc[item.id] = acc[item.id] || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [wishlist]);

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities(prev => ({
      ...prev,
      [id]: qty
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Favorites ({wishlist.length})</h2>
        <button className="text-sm font-medium text-gray-700">Options</button>
      </div>

      <div className="flex flex-wrap gap-8">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div key={item.id} className="w-72">
              <div className="relative rounded-md overflow-hidden shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-auto"
                />
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-pink-500"
                  aria-label="Remove from wishlist"
                >
                  ♥
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-800 font-medium">{item.name}</p>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  ₹ {Number(item.price).toFixed(0)}
                </p>

                <div className="flex items-center mt-2 space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-16 border p-2 text-center text-sm"
                  />
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-green-600 text-white text-sm py-2 rounded-md hover:bg-green-700"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
