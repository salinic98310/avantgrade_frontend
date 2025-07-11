import React, { useState } from "react";

const CheckoutPage = () => {
  const [deliveryOption, setDeliveryOption] = useState("ship");
  const [selectedPayment, setSelectedPayment] = useState("creditCard");

  const handleDeliveryChange = (option) => {
    setDeliveryOption(option);
  };

  const handlePaymentChange = (option) => {
    setSelectedPayment(option);
  };

  return (
    <div className="min-h-screen bg-purple-50 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 px-4">
        {/* LEFT SIDE FORM */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Contact</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded mb-2"
            />
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" />
              Email me with news and offers
            </label>
          </div>

          {/* Delivery */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Delivery</h2>
            <div className="relative border rounded overflow-hidden">
              <div className="flex">
                <button
                  className={`flex-1 p-3 text-pink-700 font-medium relative transition-all duration-300 ${
                    deliveryOption === "ship" ? "bg-pink-100" : "bg-white"
                  }`}
                  onClick={() => handleDeliveryChange("ship")}
                >
                  Ship
                  {deliveryOption === "ship" && (
                    <div className="absolute left-0 bottom-0 w-full h-1 bg-pink-700"></div>
                  )}
                </button>
                <button
                  className={`flex-1 p-3 text-gray-500 relative transition-all duration-300 ${
                    deliveryOption === "pickup" ? "bg-pink-100" : "bg-white"
                  }`}
                  onClick={() => handleDeliveryChange("pickup")}
                >
                  Pickup in store
                  {deliveryOption === "pickup" && (
                    <div className="absolute left-0 bottom-0 w-full h-1 bg-pink-700"></div>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <select className="w-full border p-3 rounded">
                <option>Country/Region</option>
                <option>India</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input className="border p-3 rounded" placeholder="First name" />
                <input className="border p-3 rounded" placeholder="Last name" />
              </div>
              <input className="w-full border p-3 rounded" placeholder="Address" />
              <input className="w-full border p-3 rounded" placeholder="Apartment, suite, etc." />
              <div className="grid grid-cols-3 gap-3">
                <input className="border p-3 rounded" placeholder="City" />
                <input className="border p-3 rounded" placeholder="State" />
                <input className="border p-3 rounded" placeholder="PIN code" />
              </div>
              <input className="w-full border p-3 rounded" placeholder="Phone" />
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" />
                Save this information for next time
              </label>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Payment</h2>
            <p className="text-xs text-gray-500 mb-2">
              All transactions are secure and encrypted.
            </p>
            <div className="border rounded p-4 space-y-3">
              {/* Credit Card Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "creditCard"}
                  onChange={() => handlePaymentChange("creditCard")}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium">Credit card</span>
                <div className="space-x-1 ml-2">
                  <img
                    src="https://img.icons8.com/color/32/visa.png"
                    alt="Visa"
                    className="inline"
                  />
                  <img
                    src="https://img.icons8.com/color/32/mastercard-logo.png"
                    alt="MC"
                    className="inline"
                  />
                </div>
              </div>

              {selectedPayment === "creditCard" && (
                <>
                  <input className="w-full border p-2 rounded" placeholder="Card number" />
                  <div className="grid grid-cols-2 gap-2">
                    <input className="border p-2 rounded" placeholder="MM / YY" />
                    <input className="border p-2 rounded" placeholder="Security code" />
                  </div>
                  <input className="w-full border p-2 rounded" placeholder="Name on card" />
                  <label className="flex items-center gap-2 text-gray-700">
                    <input type="checkbox" defaultChecked />
                    Use shipping address as billing address
                  </label>
                </>
              )}

              {/* PayPal Option */}
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "paypal"}
                  onChange={() => handlePaymentChange("paypal")}
                  className="h-4 w-4"
                />
                <img
                  src="https://img.icons8.com/color/32/000000/paypal.png"
                  alt="PayPal"
                  className="h-6"
                />
                <span className="text-sm">Pay with PayPal</span>
              </div>

              {/* Google Pay Option */}
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "googlePay"}
                  onChange={() => handlePaymentChange("googlePay")}
                  className="h-4 w-4"
                />
                <img
                  src="https://w7.pngwing.com/pngs/667/120/png-transparent-google-pay-2020-hd-logo-thumbnail.png"
                  alt="Google Pay"
                  className="h-6"
                />
                <span className="text-sm">Pay with Google Pay</span>
              </div>
            </div>
          </div>

          {/* Pay Now */}
          <button className="w-full bg-pink-600 text-white p-3 rounded text-center text-sm font-semibold mt-4">
            Pay now
          </button>

          <div className="flex gap-4 mt-6 text-xs text-gray-500 underline">
            <a href="#">Refund policy</a>
            <a href="#">Shipping policy</a>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-gray-50 p-6 rounded space-y-4 border">
          <div className="flex gap-3 items-center">
            <img
              src="https://via.placeholder.com/70"
              className="w-16 h-16 object-cover rounded"
              alt="Product"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Zadig&Voltaire white 3/4-sleeve top</p>
              <p className="text-xs text-gray-600">size 34</p>
            </div>
            <p className="text-sm font-medium">Rs 190.00</p>
          </div>

          <input
            type="text"
            placeholder="Discount code"
            className="w-full border p-2 rounded"
          />
          <button className="text-sm text-gray-700 underline">Apply</button>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs 190.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-gray-500 text-sm">Enter shipping address</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>Rs 190.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
