// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     const stored = localStorage.getItem("cart");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         if (existing.quantity >= existing.quantite) return prev;
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const increaseQuantity = (productId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === productId && item.quantity < item.quantite
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (productId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === productId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const clearCart = () => {
//     if (window.confirm("Voulez-vous vraiment vider le panier ?")) {
//       setCartItems([]);
//       localStorage.removeItem("cart");
//     }
//   };

//   const clearCartAfterSending = () => {
//     setCartItems([]);
//     localStorage.removeItem("cart");
//   };

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const totalProduits = cartItems.length;
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + (item.prix_promo ?? item.prix) * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,
//         clearCartAfterSending,
//         totalItems,
//         totalProduits,
//         totalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);

// AsNumeric

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product_id === product.product_id
      );

      if (existing) {
        // Tu peux ajouter une limite max de quantité si tu veux, sinon:
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          product_id: product.product_id,
          name: product.name,
          image_url: product.image_url,
          price: product.variations?.[0]?.purchase_price || 0,
          quantity: 1,
          // Tu peux ajouter une quantité max ici si tu la connais
        },
      ];
    });
  };

  const removeFromCart = (product_id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== product_id)
    );
  };

  const increaseQuantity = (product_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === product_id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    if (window.confirm("Voulez-vous vraiment vider le panier ?")) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  const clearCartAfterSending = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalProduits = cartItems.length;
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        clearCartAfterSending,
        totalItems,
        totalProduits,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
