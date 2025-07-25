import { useCart } from "../../contexts/CartContext";
import { Link, useLocation } from "react-router-dom";

export default function LienPanierDesktop() {
  const { totalProduits } = useCart();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Link
      to="/boutique/panier"
      className={`hover:text-green-700 flex items-center gap-1 relative ${
        isActive("/boutique/panier")
          ? "font-bold text-green-700 border-b-2 border-green-700"
          : ""
      }`}
    >
      <i className="ri-shopping-cart-line text-xl"></i>
      Panier
      {totalProduits > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {totalProduits}
        </span>
      )}
    </Link>
  );
}
