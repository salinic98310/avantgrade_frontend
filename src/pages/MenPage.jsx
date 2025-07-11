import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MenPage = () => {
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const [products, setProducts] = useState([]);
  const priceConversionFactor = 80;

  // Refs for animation targets
  const bannerRefs = useRef([]);
  const productRefs = useRef([]);

  // Intersection Observer for fade-in + slide-up animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    bannerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    productRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [products]);

  // Initialize products on mount
  useEffect(() => {
    const womenProducts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Women's Product ${i + 1}`,
      description: 'Elegant and stylish outfits for every occasion.',
      price: `₹${(80 + i * 2) * priceConversionFactor}`,
      image: `/assets/women/product-${i + 1}.jpg`,
    }));

    const menProducts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 13,
      name: `Men's Product ${i + 1}`,
      description: 'Modern fashion with comfort and quality.',
      price: `₹${(90 + i * 2) * priceConversionFactor}`,
      image: `/assets/men/product-${i + 1}.jpg`,
    }));

    const allProducts = shuffleArray([...womenProducts, ...menProducts]);
    setProducts(allProducts);
  }, []);

  const categories = [
    { name: 'Suits & Dresses', description: 'Elegant and formal' },
    { name: 'Jeans & T-Shirts', description: 'Casual comfort' },
    { name: 'Tops & Bottoms', description: 'Everyday chic' },
    { name: 'Coats & Jackets', description: 'Warm & Stylish' },
  ];

  return (
    <div className="text-center font-sans text-gray-800 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Header */}
      <header className="border-b py-4 sticky top-0 bg-white z-10">
        <div className="text-2xl font-bold">All Products</div>
        <nav className="mt-2 text-sm">
          <a href="/" className="mx-2 hover:underline hover:text-pink-500">Home /</a>
          <a href="/products" className="mx-1 hover:underline hover:text-pink-500">All Products</a>
        </nav>
      </header>

      {/* Banner Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-100 mt-8">
        {categories.map((cat, i) => (
          <div
            key={i}
            ref={(el) => (bannerRefs.current[i] = el)}
            className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 opacity-0 translate-y-10"
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <img
              src={`/assets/banner-${i + 1}.jpg`}
              alt={cat.name}
              className="w-full h-48 sm:h-60 md:h-72 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white px-2">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="text-sm">{cat.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Product Section */}
      <section className="mt-12 mb-12">
        <h2 className="text-3xl font-semibold mb-4">Explore All Styles</h2>
        <p className="text-sm max-w-xl mx-auto mb-8 px-2 sm:px-0">
          Browse a wide selection of men’s and women’s fashion in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2 sm:px-8">
          {products.map((product, idx) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[idx] = el)}
              className="relative bg-white p-4 rounded shadow hover:shadow-xl transform transition-transform duration-300 hover:scale-105 opacity-0 translate-y-10"
              style={{ transitionProperty: 'opacity, transform' }}
            >
              {/* Wishlist Heart */}
              <button
                className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-2xl transition-colors duration-300 ${
                  isWishlisted(product.id) ? 'text-pink-500' : 'text-gray-300'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                aria-label="Toggle Wishlist"
              >
                ♥
              </button>

              {/* Product Image & Name */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 sm:h-72 md:h-80 object-contain rounded cursor-pointer"
                  loading="lazy"
                />
                <h3 className="mt-3 font-semibold hover:underline hover:text-pink-500 truncate">
                  {product.name}
                </h3>
              </Link>

              <p className="text-sm text-gray-600 truncate">{product.description}</p>
              <p className="text-red-600 font-semibold mt-1">{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 my-12">
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className="px-3 py-1 border rounded hover:bg-gray-200"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenPage;
