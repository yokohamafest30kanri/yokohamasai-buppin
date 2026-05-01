"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Item } from "../lib/items";

export type CartItem = Item & {
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Item, qty: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ 初回だけ localStorage から復元
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // ✅ cart が変わるたびに保存
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Item, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);

      if (existing) {
        const newQty = Math.min(existing.qty + qty, item.maxQty);
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: newQty } : c
        );
      }

      const initialQty = Math.min(qty, item.maxQty);
      return [...prev, { ...item, qty: initialQty }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart は CartProvider の中で使ってください");
  }
  return context;
}