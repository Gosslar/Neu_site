import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import ProfilePage from '@/pages/ProfilePage';
import JagdhundePage from '@/pages/JagdhundePage';
import RehkitzrettungPage from '@/pages/RehkitzrettungPage';
import StapelteichePage from '@/pages/StapelteichePage';
import RevierPage from '@/pages/RevierPage';
import PraedatorenPage from '@/pages/PraedatorenPage';
import AdminPage from '@/pages/AdminPage';
import AuthPage from '@/pages/AuthPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/jagdhunde" element={<JagdhundePage />} />
                <Route path="/rehkitzrettung" element={<RehkitzrettungPage />} />
                <Route path="/stapelteiche" element={<StapelteichePage />} />
                <Route path="/revier" element={<RevierPage />} />
                <Route path="/praedatoren" element={<PraedatorenPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;