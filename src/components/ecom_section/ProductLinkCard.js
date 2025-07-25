// components/ProductLinkCard.js
import { Link } from "react-router-dom";

export default function ProductLinkCard({
  product,
  imageHeight = "h-40",
  className = "",
}) {
  const formattedName =
    product.name?.charAt(0).toUpperCase() +
    product.name?.slice(1).toLowerCase();

  const price = parseFloat(
    product.variations?.[0]?.purchase_price || 0
  ).toLocaleString();

  return (
    <Link
      to={`/boutique/produit/${product.product_id}`}
      state={{ product }}
      className={`text-inherit ${className}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className={`w-full ${imageHeight} object-contain mb-3`}
        />
      ) : (
        <div
          className={`w-full ${imageHeight} bg-gray-100 flex items-center justify-center text-blue-400 mb-3`}
        >
          <i className="fas fa-image fa-lg"></i>
        </div>
      )}

      <small className="text-start text-xs text-gray-500">
        SKU : {product.sku}
      </small>

      <h6 className="font-bold text-gray-800 text-start text-sm line-clamp-2">
        {formattedName}
      </h6>

      <div className="my-2 text-sm font-semibold text-gray-700">
        {price} FCFA
      </div>
    </Link>
  );
}
