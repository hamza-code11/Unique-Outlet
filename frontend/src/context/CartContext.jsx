// import React, { createContext, useState, useContext, useEffect } from 'react';

// const CartContext = createContext();

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error('useCart must be used within CartProvider');
//   return context;
// };

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const saved = localStorage.getItem('cart');
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     setCartItems(prev => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item =>
//           item.id === product.id 
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, {
//         id: product.id,
//         name: product.name,
//         price: Number(product.price),
//         image: product.image1 || product.image,
//         quantity: 1,
//         slug: product.slug
//       }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     if (quantity < 1) {
//       removeFromCart(id);
//       return;
//     }
//     setCartItems(prev =>
//       prev.map(item => item.id === id ? { ...item, quantity } : item)
//     );
//   };

//   const clearCart = () => setCartItems([]);

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   return (
//     <CartContext.Provider value={{
//       cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
//       cartCount, cartTotal
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };













// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedColor = null) => {
    setCartItems(prev => {
      const uniqueId = selectedColor 
        ? `${product.id}-${selectedColor.replace('#', '')}` 
        : `${product.id}`;
      
      const existing = prev.find(item => item.uniqueId === uniqueId);
      
      if (existing) {
        return prev.map(item =>
          item.uniqueId === uniqueId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, {
        uniqueId: uniqueId,
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image1 || product.image,
        quantity: 1,
        slug: product.slug,
        color: selectedColor
      }];
    });
  };

  // ✅ FIXED: Remove from cart using uniqueId
  const removeFromCart = (uniqueId) => {
    console.log('Removing item with uniqueId:', uniqueId);
    setCartItems(prev => {
      const filtered = prev.filter(item => item.uniqueId !== uniqueId);
      console.log('Items after removal:', filtered);
      return filtered;
    });
  };

  // ✅ FIXED: Update quantity using uniqueId
  const updateQuantity = (uniqueId, quantity) => {
    if (quantity < 1) {
      removeFromCart(uniqueId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => 
        item.uniqueId === uniqueId 
          ? { ...item, quantity: Number(quantity) } 
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};