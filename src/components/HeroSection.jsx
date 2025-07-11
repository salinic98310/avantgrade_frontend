import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FashionModelCanvas from './Canvas/FashionModel';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';

export default function Hero() {
  const [startTransition, setStartTransition] = useState(false);
  const [startRightExit, setStartRightExit] = useState(false);
  const [rotateModel, setRotateModel] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const handleShopNowClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }

    setRotateModel(true);
    setTimeout(() => setStartRightExit(true), 90);
    setTimeout(() => setStartTransition(true), 500);
    setTimeout(() => navigate('/products'), 2300);
  };

  const handleInfoCardClick = () => {
    alert('Navigating to About Us!');
  };

  const handleDiscountClick = () => {
    alert('Navigating to Clothing Discounts!');
  };

  const handleGenderClick = (label) => {
    alert(`Navigating to ${label} Collection!`);
  };

  const handleWatchVideoClick = () => {
    alert('Playing Video...');
  };

  return (
    <div
      className="relative min-h-screen font-sans px-10 pt-6 overflow-hidden"
      style={{
        background: `radial-gradient(circle at top left, rgba(253, 193, 229, 0.9) 0%, transparent 40%),
                     radial-gradient(circle at bottom right, rgba(253, 228, 241, 0.95) 0%, transparent 40%),
                     linear-gradient(to right, rgb(239, 228, 250), hsl(269, 92.00%, 95.10%))`,
      }}
    >
      {/* White blur overlay transition */}
      <AnimatePresence>
        {startTransition && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{
              clipPath: `circle(0% at ${buttonPos.x}px ${buttonPos.y}px)`,
              opacity: 0.5,
            }}
            animate={{
              clipPath: `circle(150% at ${buttonPos.x}px ${buttonPos.y}px)`,
              opacity: 0.5,
              transition: { duration: 2, ease: 'easeInOut' },
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Background Text */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none select-none flex flex-col items-start justify-center pl-20 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <motion.h1 className="text-[190px] font-bold text-pink-400" style={{ fontFamily: '"Bodoni Moda SC", serif' }}>
          AvantGarde
        </motion.h1>
        <motion.h1 className="text-[190px] font-bold text-gray-400 ml-[30%]" style={{ fontFamily: '"Bodoni Moda SC", serif' }}>
          Fashion
        </motion.h1>
      </motion.div>

      {/* Hero Text and button */}
      <motion.div
        className="absolute z-40 left-24 bottom-[17rem] space-y-8 text-left"
        style={{ fontFamily: "'Cantora One', serif" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h2 className="text-5xl font-semibold leading-snug tracking-wider">
          <span className="block text-pink-600 font-bold">DON’T BE SHY</span>
          <span className="block text-black">TO STAND OUT !</span>
        </h2>
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85, rotate: -5 }}
          onClick={handleShopNowClick}
          className="relative z-10 left-4 w-28 px-4 py-2 bg-pink-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-pink-600 transition-all"
        >
          Shop now
        </motion.button>
      </motion.div>

      {/* Hero Model */}
      <div className="relative flex justify-center items-center z-10 min-h-[500px]">
        <motion.div
          className="flex justify-center items-center w-[90%] h-[100%]"
          animate={startTransition ? { x: 600 } : { x: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-150 h-170">
            <FashionModelCanvas rotateRight={rotateModel} />
          </div>
        </motion.div>

        {/* Info Cards */}
        <AnimatePresence>
          {!startRightExit && (
            <motion.div
              className="absolute right-10 top-[2%] w-1/3 space-y-8"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0px 4px 15px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInfoCardClick}
                className="cursor-pointer bg-white/10 backdrop-blur-md shadow-lg border border-white/30 p-6 rounded-3xl max-w-sm ml-auto transition-all"
              >
                <h3 className="text-lg font-semibold text-purple-700">Know more about us !</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Exclusive designer clothes in extraordinary styles. High-quality and unconventional for the individualists.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0px 4px 15px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDiscountClick}
                className="cursor-pointer absolute right-70 top-60 bg-white/10 backdrop-blur-md shadow-xl border border-white/40 p-4 rounded-3xl w-65 flex items-center gap-6 ring-1 ring-white/20 transition-all"
              >
                <img src="/images/jacket.png" alt="jacket" className="w-17 h-17 rounded-full object-cover" />
                <div>
                  <p className="text-purple-700 font-bold">Save up to 25%</p>
                  <p className="text-sm text-gray-600">On Clothing</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom-right Men/Women Buttons */}
      <AnimatePresence>
        {!startRightExit && (
          <motion.div
            className="absolute right-0 bottom-32 space-y-6 z-20"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {['Men', 'Women'].map((label, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleGenderClick(label)}
                className="cursor-pointer flex items-center gap-4 bg-pink-500 px-4 py-2 rounded-full shadow transition-all"
              >
                <img
                  src={label === 'Men' ? '/images/man.png' : '/images/women.png'}
                  alt={label}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-md font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Watch Video button */}
      <motion.div
        className="absolute left-20 bottom-20 text-center cursor-pointer space-y-4"
        onClick={handleWatchVideoClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="bg-pink-600 p-3 rounded-full shadow-md inline-block">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600 text-xs tracking-wide">Watch video</p>
      </motion.div>
    </div>
  );
}
