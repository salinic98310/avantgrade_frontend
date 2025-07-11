import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Section Components
import Hero from "./components/HeroSection.jsx";
import NewArrivals from "./components/NewArrivals.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Benefits from "./components/Benefits.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Navbar from "./components/Navbar.jsx";

// Pages
import Register from "./pages/Register.jsx";
import UserPage from "./pages/UserPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import MenPage from "./pages/MenPage.jsx";
import WomenPage from "./pages/WomenPage.jsx";
import LoyalCustomerPage from "./components/LoyalCustomerPage.jsx";

// Context
import { WishlistProvider } from './context/WishlistContext.jsx';

function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Newsletter />
      <Benefits />
      <Footer />
    </>
  );
}

// Close cart drawer on route change
function LayoutWrapper({ children, closeCart }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/cart") {
      closeCart();
    }
  }, [location, closeCart]);

  return children;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    // Listen for localStorage updates in case another tab logs in/out
    const syncUser = () => {
      const stored = localStorage.getItem("loggedInUser");
      setLoggedInUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <WishlistProvider>
      <Router>
        <LayoutWrapper closeCart={() => setIsCartOpen(false)}>
          <div className="font-sans relative">
            <Navbar
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={<UserPage setLoggedInUser={setLoggedInUser} />}
              />
              <Route
                path="/wishlist"
                element={<WishlistPage addToCart={addToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <CartPage
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/mens" element={<MenPage />} />
              <Route path="/loyal-customer" element={<LoyalCustomerPage />} />
              <Route path="/women" element={<WomenPage />} />
              <Route
                path="/product/:id"
                element={<ProductDetail addToCart={addToCart} />}
              />
            </Routes>

            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          </div>
        </LayoutWrapper>
      </Router>
    </WishlistProvider>
  );
}

export default App;
