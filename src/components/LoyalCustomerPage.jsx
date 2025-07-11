import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaGift, FaStar, FaUserFriends, FaChartLine, FaComments, FaMagic } from 'react-icons/fa';

export default function LoyalCustomerPage() {
  return (
    <motion.div
      id="loyal-customer"
      className="max-w-5xl mx-auto p-6 mt-10 bg-white/50 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-yellow-600 flex items-center justify-center gap-3 mb-2">
          <FaCrown /> Loyal Customer Benefits
        </h1>
        <p className="text-gray-800 text-lg">
          Thank you for your loyalty! Here’s what we have for you:
        </p>
      </div>

      {/* Highlights Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-yellow-50 rounded-xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/786/786432.png"
            alt="Exclusive Discounts"
            className="w-16 h-16 mb-2"
          />
          <h3 className="text-xl font-semibold text-yellow-700 mb-1">Exclusive Discounts</h3>
          <p className="text-gray-600 text-sm">
            Enjoy special discounts and early access to deals!
          </p>
        </div>
        <div className="bg-green-50 rounded-xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Rewards & Perks"
            className="w-16 h-16 mb-2"
          />
          <h3 className="text-xl font-semibold text-green-700 mb-1">Rewards & Perks</h3>
          <p className="text-gray-600 text-sm">
            Earn points and unlock special perks just for you.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
            alt="Refer & Earn"
            className="w-16 h-16 mb-2"
          />
          <h3 className="text-xl font-semibold text-blue-700 mb-1">Refer & Earn</h3>
          <p className="text-gray-600 text-sm">
            Refer friends and earn bonus points when they shop!
          </p>
        </div>
      </div>

      {/* Discount Section */}
      <section className="mb-10 bg-pink-50 rounded-xl p-6 shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold text-pink-700 flex items-center gap-2 mb-2">
          <FaGift /> Exclusive Discounts
        </h2>
        <p className="text-gray-700 mb-3">
          Unlock special discounts and early access to your favorite products.
        </p>
        <button className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition font-semibold">
          Explore Discounts
        </button>
      </section>

      {/* Rewards Section */}
      <section className="mb-10 bg-green-50 rounded-xl p-6 shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold text-green-700 flex items-center gap-2 mb-2">
          <FaStar /> Rewards & Perks
        </h2>
        <p className="text-gray-700 mb-3">
          Earn points and enjoy exclusive rewards tailored for your loyalty.
        </p>
        <button className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition font-semibold">
          View My Rewards
        </button>
      </section>

      {/* Referral Section */}
      <section className="mb-10 bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-2">
          <FaUserFriends /> Refer & Earn
        </h2>
        <p className="text-gray-700 mb-3">
          Invite your friends and earn bonus points or discounts when they shop through your referral link.
        </p>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-semibold">
          Refer a Friend
        </button>
      </section>

      {/* Subscription Service */}
      <section className="mb-10 bg-purple-50 rounded-xl p-6 shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold text-purple-700 flex items-center gap-2 mb-2">
          <FaChartLine /> VIP Subscription
        </h2>
        <p className="text-gray-700 mb-3">
          Subscribe to our VIP service for monthly perks, early access to new arrivals, and curated picks just for you.
        </p>
        <button className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition font-semibold">
          Set Up Subscription
        </button>
      </section>

      {/* Feedback Section */}
      <section className="mb-10 bg-teal-50 rounded-xl p-6 shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold text-teal-700 flex items-center gap-2 mb-2">
          <FaComments /> Feedback & Reviews
        </h2>
        <p className="text-gray-700 mb-3">
          Your feedback helps us improve. Share your thoughts!
        </p>
        <textarea
          className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-teal-600 transition mb-3"
          placeholder="Leave your feedback here..."
          rows="4"
        />
        <button className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition font-semibold">
          Submit Feedback
        </button>
      </section>

      {/* Personalized Offers */}
      <section className="bg-orange-50 rounded-xl p-6 shadow hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold text-orange-700 flex items-center gap-2 mb-2">
          <FaMagic /> Personalized Offers
        </h2>
        <p className="text-gray-700 mb-3">
          Based on your shopping history, here are some personalized recommendations for you.
        </p>
        <button className="bg-orange-600 text-white px-5 py-2 rounded-full hover:bg-orange-700 transition font-semibold">
          View My Offers
        </button>
      </section>
    </motion.div>
  );
}
