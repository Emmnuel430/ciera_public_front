import { useCart } from "../../contexts/CartContext";
import { Link, useLocation } from "react-router-dom";
export default function LienPanierMobile() {
  const { totalProduits } = useCart();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Link
      to="/boutique/panier"
      className={`text-xl p-2 rounded-full w-10 h-10 flex items-center justify-center relative transition-all duration-300 ${
        isActive("/boutique/panier")
          ? "bg-green-100 text-green-700 border-2 border-green-600 shadow-md scale-110"
          : "bg-gray-200 hover:text-green-700"
      }`}
    >
      <i className="ri-shopping-cart-line"></i>
      {totalProduits > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          {totalProduits}
        </span>
      )}
    </Link>
  );
}
