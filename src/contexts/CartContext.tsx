import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    stock_quantity: number;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage for guests
  const loadGuestCart = () => {
    try {
      const savedCart = localStorage.getItem('guestCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
    }
  };

  // Save cart to localStorage for guests
  const saveGuestCart = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  };

  const fetchCartItems = async () => {
    if (!user) {
      // Load guest cart from localStorage
      loadGuestCart();
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_2025_11_07_14_31')
        .select(`
          id,
          product_id,
          quantity,
          product:products_2025_11_07_14_31(
            id,
            name,
            price,
            image_url,
            stock_quantity
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      toast({
        title: "Fehler beim Laden des Warenkorbs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      // Handle guest cart with localStorage
      try {
        // Get product details
        const { data: product, error } = await supabase
          .from('products_2025_11_07_14_31')
          .select('id, name, price, image_url, stock_quantity')
          .eq('id', productId)
          .single();

        if (error) throw error;

        // Check if item already exists in guest cart
        const existingItemIndex = items.findIndex(item => item.product_id === productId);
        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item
          newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `guest-${productId}-${Date.now()}`,
            product_id: productId,
            quantity: quantity,
            product: product
          };
          newItems = [...items, newItem];
        }

        setItems(newItems);
        saveGuestCart(newItems);
        
        toast({
          title: "Artikel hinzugefügt",
          description: `${product.name} wurde zum Warenkorb hinzugefügt.`,
        });
        return;
      } catch (error: any) {
        console.error('Error adding to guest cart:', error);
        toast({
          title: "Fehler",
          description: "Artikel konnte nicht hinzugefügt werden.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const { error } = await supabase
        .from('cart_2025_11_07_14_31')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity: quantity
        }, {
          onConflict: 'user_id,product_id'
        });

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Artikel hinzugefügt",
        description: "Der Artikel wurde zum Warenkorb hinzugefügt.",
      });
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Fehler beim Hinzufügen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) {
      // Handle guest cart
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const newItems = items.map(item => 
        item.product_id === productId 
          ? { ...item, quantity }
          : item
      );
      setItems(newItems);
      saveGuestCart(newItems);
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_2025_11_07_14_31')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
      await fetchCartItems();
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Fehler beim Aktualisieren",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) {
      // Handle guest cart
      const newItems = items.filter(item => item.product_id !== productId);
      setItems(newItems);
      saveGuestCart(newItems);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_2025_11_07_14_31')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
      await fetchCartItems();
      toast({
        title: "Artikel entfernt",
        description: "Der Artikel wurde aus dem Warenkorb entfernt.",
      });
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Fehler beim Entfernen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user) {
      // Handle guest cart
      setItems([]);
      localStorage.removeItem('guestCart');
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_2025_11_07_14_31')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setItems([]);
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Fehler beim Leeren des Warenkorbs",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};