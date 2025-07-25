// import { useCart } from "../../contexts/CartContext";

// export const BoutonAjouterPanier = ({ product, showToast }) => {
//   const { cartItems, addToCart } = useCart();

//   const isInCart = cartItems.some((item) => item.id === product.id);

//   const handleAddToCart = () => {
//     if (!isInCart) {
//       addToCart(product);
//       showToast?.(`Produit ajouté au panier`, true);
//     }
//   };

//   return (
//     <>
//       <button
//         className={`mt-auto bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded w-full flex items-center justify-center gap-2 ${
//           isInCart ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={handleAddToCart}
//         disabled={isInCart}
//       >
//         <i className="fas fa-shopping-cart"></i>{" "}
//         {isInCart ? "Déjà ajouté" : "Ajouter"}
//       </button>
//     </>
//   );
// };

// AsNumeric
import { useCart } from "../../contexts/CartContext";

export const BoutonAjouterPanier = ({ product, showToast }) => {
  const { cartItems, addToCart } = useCart();

  // La première variation (pour le prix uniquement)
  const variation = product.variations?.[0];

  // Vérifie si le produit est déjà dans le panier
  const isInCart = cartItems.some(
    (item) => item.product_id === product.product_id
  );

  const handleAddToCart = () => {
    if (!isInCart && variation) {
      addToCart(product);
      showToast?.(`Produit ajouté au panier`, true);
    }
  };

  return (
    <button
      className={`mt-auto bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded w-full flex items-center justify-center gap-2 ${
        isInCart ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleAddToCart}
      disabled={isInCart}
    >
      <i className="fas fa-shopping-cart"></i>{" "}
      {isInCart ? "Déjà ajouté" : "Ajouter"}
    </button>
  );
};
