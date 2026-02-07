"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from local storage");
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) =>
                    item.id === newItem.id &&
                    item.size === newItem.size &&
                    item.color === newItem.color
            );

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += newItem.quantity;
                return newItems;
            } else {
                return [...prevItems, newItem];
            }
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string, size: string, color: string) => {
        setItems((prevItems) =>
            prevItems.filter(
                (item) => !(item.id === id && item.size === size && item.color === color)
            )
        );
    };

    const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.size === size && item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
