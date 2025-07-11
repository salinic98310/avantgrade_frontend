import React from "react";
import { Link } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose, cartItems, removeFromCart, updateQuantity }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-purple-50 z-50 shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 text-xl font-bold">
            ×
          </button>
        </div>

        <div className="p-4 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex gap-3 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price} x {item.quantity}
                  </p>
                  {/* Quantity controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-600"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-600"
                    >
                      +
                    </button>
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="p-4 border-t">
          <p className="font-semibold text-right mb-2">
            Total:{" "}
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
          {/* CHECK OUT BUTTON */}
          <div className="mt-4">
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 block text-center"
            >
              Check Out
            </Link>
          </div>

          {/* UPDATED VIEW CART BUTTON */}
          <div className="mt-4">
            <Link
              to="/cart"
              onClick={onClose}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 block text-center"
            >
              View Cart
            </Link>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              to="/"
              onClick={onClose}
              className="p-2 text-pink-500 underline hover:text-pink-500 transition text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
