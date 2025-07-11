import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext.jsx'; // Importing cart context

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useWishlist(); // Destructure from context

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="p-10 max-w-6xl mx-auto ">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {/* Headings */}
      <div className="grid grid-cols-12 font-semibold text-gray-700 border-b pb-2 mb-4">
        <div className="col-span-6">PRODUCT</div>
        <div className="col-span-2 text-right">PRICE</div>
        <div className="col-span-2 text-center">QUANTITY</div>
        <div className="col-span-2 text-right">TOTAL</div>
      </div>

      {/* Items */}
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="grid grid-cols-12 items-center border-b py-4">
            <div className="col-span-6 flex items-start gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-sm mt-1 text-gray-500">
                  Color: {item.color} <br />
                  Size: {item.size} <br />
                  Material: {item.material}
                </p>
              </div>
            </div>

            <div className="col-span-2 text-right text-lg font-medium">
              ₹ {item.price.toFixed(2)}
            </div>

            <div className="col-span-2 flex justify-center items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                className="w-8 h-8 rounded-full bg-gray-100 text-lg"
                disabled={item.quantity === 1}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 text-lg"
              >
                +
              </button>
            </div>

            <div className="col-span-2 text-right text-lg font-medium">
              ₹ {(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove button */}
            <div className="col-span-12 text-right">
              <button
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer text-red-500 mt-2 flex items-center gap-2"
              >
                <FaTrashAlt className="text-lg" />
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      )}

      {/* Order Note */}
      <div className="mt-10 border-t pt-6">
        <label className="block text-sm font-medium mb-2">
          Add a note to your order
        </label>
        <textarea
          className="w-full border p-3 h-32 resize-none text-sm rounded"
          placeholder="How can we help you?"
        />
      </div>

      {/* Summary */}
      <div className="mt-10 text-right space-y-3">
        <p className="text-xl font-semibold">Subtotal: ₹ {subtotal.toFixed(2)}</p>
        <p className="text-sm text-gray-600">
          Tax included. <span className="underline">Shipping</span> calculated at checkout.
        </p>

        <div className="space-y-4 mt-4">
          <button
            onClick={handleCheckout}
            className="cursor-pointer w-full bg-pink-600 hover:bg-pink-600 text-white py-3 text-sm font-semibold"
          >
            CHECK OUT
          </button>

          <div className="flex gap-3">
            <button className="cursor-pointer flex-1 bg-pink-300 text-black py-3 font-semibold rounded">
              PayPal
            </button>
            <button className="cursor-pointer flex-1 bg-pink-500 text-white py-3 font-semibold rounded">
              G Pay
            </button>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="mt-6 underline text-m text-gray-600 hover:text-pink-500"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
