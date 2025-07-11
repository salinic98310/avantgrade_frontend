import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaCrown, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Navbar({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
      <motion.div
        className="sticky top-0 z-50 flex justify-between items-center bg-white/50 backdrop-blur-md shadow-sm px-10 py-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <h1
          className="text-3xl font-bold text-pink-700 cursor-pointer"
          onClick={() => navigate('/')}
        >
          AVANTGARDE
        </h1>

        <div className="flex gap-14 text-sm font-medium text-pink-700">
          <button onClick={() => navigate('/')} className="hover:underline transition">Home</button>
          <button onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}>New Arrivals</button>
          <button onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}>Newsletter</button>
          <button onClick={() => setIsAboutOpen(!isAboutOpen)}>About</button>
        </div>

        <div className="flex items-center gap-4 text-xl text-gray-600 relative">
          {/* Search */}
          <div className="flex items-center gap-2">
            <FaSearch
              className="cursor-pointer hover:text-pink-700 transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {isSearchOpen && (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search..."
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-pink-700 transition"
              />
            )}
          </div>

          <FaHeart
            className="cursor-pointer hover:text-pink-700 transition"
            onClick={() => navigate('/wishlist')}
          />

          <FaShoppingCart
            className="cursor-pointer hover:text-pink-700 transition"
            onClick={() => navigate('/cart')}
          />

          {/* User icon or logged in avatar */}
          {loggedInUser ? (
            <div className="relative">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-600 text-white font-bold cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {loggedInUser.name.charAt(0).toUpperCase()}
              </div>
              {isDropdownOpen && (
  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
    <div className="flex justify-end p-2">
      <button
        className="text-gray-500 hover:text-gray-700 text-lg"
        onClick={() => setIsDropdownOpen(false)}
      >
        ×
      </button>
    </div>
    <div className="flex flex-col items-center p-4 pt-0">
      <div className="w-20 h-20 rounded-full bg-pink-600 text-white text-3xl font-bold flex items-center justify-center">
        {loggedInUser.name.charAt(0).toUpperCase()}
      </div>
      <div className="mt-2 text-gray-800 font-semibold text-center text-lg">
        Hi, {loggedInUser.name.toUpperCase()}!
      </div>
      <div className="text-sm text-gray-500 text-center">
        {loggedInUser.email}
      </div>
      <button
        className="mt-2 text-blue-600 text-sm hover:underline"
        onClick={() => {
          alert("Redirect to manage account (demo)");
        }}
      >
        Manage your Google Account
      </button>
    </div>
    <div className="flex border-t border-gray-200">
      <button
        className="flex-1 text-sm text-gray-700 p-3 hover:bg-gray-100 border-r border-gray-200"
        onClick={() => {
          alert("Add account clicked (demo)");
        }}
      >
        + Add account
      </button>
      <button
        className="flex-1 text-sm text-gray-700 p-3 hover:bg-gray-100"
        onClick={handleLogout}
      >
        Sign out
      </button>
    </div>
  </div>
)}


            </div>
          ) : (
            <FaUser
              className="cursor-pointer hover:text-pink-700 transition"
              onClick={() => navigate('/login')}
            />
          )}

          <div
            className="flex items-center gap-2 px-3 py-1 border border-yellow-400 rounded-full bg-yellow-100 text-yellow-600 cursor-pointer hover:bg-yellow-200 hover:shadow transition"
            onClick={() => navigate('/loyal-customer')}
            title="Loyal Customer Subscription"
          >
            <FaCrown />
            <span className="text-sm font-medium hidden md:inline">Loyal Customer</span>
          </div>
        </div>
      </motion.div>

      {/* About Drawer */}
      {isAboutOpen && (
        <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 p-6 flex flex-col gap-4 animate-slide-in">
          <button
            onClick={() => setIsAboutOpen(false)}
            className="text-pink-700 font-bold self-end text-lg"
          >
            ×
          </button>
          <h2 className="text-pink-700 text-xl font-semibold">About Avantgarde</h2>
          <p className="text-gray-600 text-sm">
            Avantgarde is a premier destination for avant-garde fashion lovers. Our mission is to
            bring unique, bold, and artistic fashion pieces to style enthusiasts worldwide.
          </p>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
