import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';

const allProducts = [
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Women's Product ${i + 1}`,
    price: (25 + i * 2) * 90,
    originalPrice: (25 + i * 2 + 40) * 90,
    image: `/assets/women/product-${i + 1}.jpg`,
    description: `Elegant Women's Product ${i + 1} made with high-quality fabric.`,
    sku: `WOMEN-${i + 1}`,
    vendor: 'CL001',
    type: 'Dresses',
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 13,
    name: `Men's Product ${i + 1}`,
    price: (30 + i * 2) * 90,
    originalPrice: (30 + i * 2 + 40) * 90,
    image: `/assets/men/product-${i + 1}.jpg`,
    description: `Stylish Men's Product ${i + 1} perfect for modern fashion.`,
    sku: `MEN-${i + 1}`,
    vendor: 'CL002',
    type: 'T-Shirts',
  })),
];

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { wishlist, toggleWishlist } = useWishlist();

  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans text-gray-800 ">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> / {product.type} / <span className="text-pink-500">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        <div className="relative">
          <button
            className={`absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-4xl z-10 transition-colors duration-300 ${isInWishlist ? 'text-pink-500' : 'text-gray-300'}`}
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle Wishlist"
          >
            ♥
          </button>
          <img src={product.image} alt={product.name} className="w-full object-contain mb-4 rounded" />
          <div className="flex space-x-2 overflow-x-auto">
            {[1, 2, 3, 4].map((_, i) => (
              <img
                key={i}
                src={product.image}
                alt={`Thumb ${i + 1}`}
                className="w-20 h-28 object-cover border"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-pink-600 text-lg font-medium">₹ {product.price.toFixed(0)}</span>
            <del className="text-gray-400">₹ {product.originalPrice.toFixed(0)}</del>
            <span className="text-white bg-red-600 px-2 py-1 text-xs rounded">SALE</span>
          </div>
          <p className="text-sm text-pink-700">IN STOCK</p>

          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-16 border p-2 text-center"
            />
            <button
              onClick={() => addToCart(product, quantity)}
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
            >
              Add to Cart
            </button>
            <button className="bg-white border border-pink-600 text-pink-600 px-6 py-2 rounded hover:bg-pink-50">Buy it Now</button>
          </div>

          <div className="text-sm mt-4 space-y-1">
            <p><strong>Vendor:</strong> {product.vendor}</p>
            <p><strong>Type:</strong> {product.type}</p>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Available:</strong> Yes</p>
            <p>Currently there are <span className="text-pink-600 font-semibold">20</span> people looking at this product</p>
          </div>

          <div className="flex space-x-4 mt-2">
            {["facebook", "twitter", "pinterest"].map(platform => (
              <a key={platform} href="#" className="text-gray-500 hover:text-black">
                <i className={`fab fa-${platform}`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-sm leading-relaxed">{product.description}</p>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li>Condition: Good</li>
          <li>Material: 100% premium fabric</li>
        </ul>
      </div>

      <div className="mt-6 text-sm text-pink-700 underline">
        <a href="#">✅ Verified and authenticated by our experts</a>
      </div>
    </div>
  );
};

export default ProductDetail;
