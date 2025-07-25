// import React from "react";
// import { useCart } from "../../contexts/CartContext";
// import { Link } from "react-router-dom";
// import PanierFormulaireCommande from "../../components/ecom_section/PanierFormulaireCommande";

// const Panier = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//     clearCart,
//     totalItems,
//     totalPrice,
//   } = useCart();

//   return (
//     <div className="mx-4 p-4">
//       {/* Fil d'ariane */}
//       <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2">
//         <Link
//           to="/boutique"
//           className="hover:underline text-orange-500 font-semibold"
//         >
//           Accueil
//         </Link>
//         <span>/</span>
//         <Link
//           to="/boutique/catalogue"
//           className="hover:underline text-orange-500 font-semibold"
//         >
//           Catalogue
//         </Link>
//         <span>/</span>
//         <Link
//           to="/boutique/panier"
//           className="hover:underline text-orange-500 font-semibold"
//         >
//           Panier
//         </Link>
//       </nav>

//       <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-600">
//           Votre panier est vide. Ajoutez des produits pour les voir ici.
//         </p>
//       ) : (
//         <div className="flex flex-col-reverse lg:flex-row gap-2">
//           {/* Colonne produits */}
//           {/* DESKTOP */}
//           <div className="hidden lg:block w-full lg:w-3/4">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="border rounded p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-6"
//               >
//                 {/* Image */}
//                 <div className="w-full md:w-32 flex-shrink-0">
//                   {item.images?.[0] ? (
//                     <img
//                       src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.images[0]}`}
//                       alt={item.libelle}
//                       className="w-32 h-32 object-contain"
//                     />
//                   ) : (
//                     <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-blue-400">
//                       <i className="fas fa-image fa-lg"></i>
//                     </div>
//                   )}
//                 </div>

//                 {/* Infos principales */}
//                 <div className="text-center md:text-left w-1/4">
//                   <h4 className="font-semibold">{item.libelle}</h4>
//                   <p className="text-sm">
//                     Prix unitaire <br />
//                     {item.prix_promo ? (
//                       <>
//                         <span className="line-through text-gray-500">
//                           {parseFloat(item.prix).toLocaleString()} FCFA
//                         </span>
//                         <br />
//                         <strong className="text-green-700">
//                           {parseFloat(item.prix_promo).toLocaleString()} FCFA
//                         </strong>
//                       </>
//                     ) : (
//                       <strong>
//                         {parseFloat(item.prix).toLocaleString()} FCFA
//                       </strong>
//                     )}
//                   </p>
//                 </div>

//                 {/* Prix unitaire + quantité */}
//                 <div className="text-center flex items-center flex-col">
//                   {item.type?.slug !== "vehicule" && (
//                     <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full px-1 py-2 w-fit shadow-inner">
//                       <button
//                         onClick={() => decreaseQuantity(item.id)}
//                         className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={item.quantity <= 1}
//                       >
//                         −
//                       </button>
//                       <span className="text-center font-semibold text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => increaseQuantity(item.id)}
//                         className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={item.quantity >= item.quantite}
//                       >
//                         +
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Total */}
//                 <div className="text-center">
//                   <p>
//                     Total <br />
//                     <strong>
//                       {(
//                         (item.prix_promo ?? item.prix) * item.quantity
//                       ).toLocaleString()}{" "}
//                       FCFA
//                     </strong>
//                   </p>
//                 </div>

//                 {/* Supprimer */}
//                 <div>
//                   <button
//                     className="px-4 py-2 bg-red-500 rounded-md text-sm text-white hover:bg-red-600"
//                     onClick={() => removeFromCart(item.id)}
//                   >
//                     <i className="fa fa-trash"></i>
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//               onClick={clearCart}
//             >
//               Vider le panier
//             </button>
//           </div>

//           {/* MOBILE */}
//           <div className="block lg:hidden w-full">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="border rounded p-4 mb-4 flex flex-col gap-4"
//               >
//                 {/* Ligne image + infos */}
//                 <div className="flex gap-4 items-center">
//                   <div className="w-24 h-24 flex-shrink-0">
//                     {item.images?.[0] ? (
//                       <img
//                         src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.images[0]}`}
//                         alt={item.libelle}
//                         className="w-full h-full object-contain"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gray-100 flex items-center justify-center text-blue-400">
//                         <i className="fas fa-image fa-lg"></i>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-col text-sm">
//                     <h4 className="font-semibold text-gray-800">
//                       {item.libelle}
//                     </h4>
//                     <p className="text-sm">
//                       Prix unitaire <br />
//                       {item.prix_promo ? (
//                         <>
//                           <span className="line-through text-gray-500">
//                             {parseFloat(item.prix).toLocaleString()} FCFA
//                           </span>
//                           <br />
//                           <strong className="text-green-700">
//                             {parseFloat(item.prix_promo).toLocaleString()} FCFA
//                           </strong>
//                         </>
//                       ) : (
//                         <strong>
//                           {parseFloat(item.prix).toLocaleString()} FCFA
//                         </strong>
//                       )}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Ligne action */}
//                 <div className="flex justify-between items-center gap-2 text-sm">
//                   <button
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                     onClick={() => removeFromCart(item.id)}
//                   >
//                     <i className="fa fa-trash"></i>
//                   </button>

//                   <div>
//                     Total :{" "}
//                     <strong>
//                       {(
//                         (item.prix_promo ?? item.prix) * item.quantity
//                       ).toLocaleString()}{" "}
//                       FCFA
//                     </strong>
//                   </div>

//                   {item.type?.slug !== "vehicule" && (
//                     <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full px-1 py-2 w-fit shadow-inner">
//                       <button
//                         onClick={() => decreaseQuantity(item.id)}
//                         className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={item.quantity <= 1}
//                       >
//                         −
//                       </button>
//                       <span className="text-center font-semibold text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => increaseQuantity(item.id)}
//                         className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={item.quantity >= item.quantite}
//                       >
//                         +
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}

//             <button
//               className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//               onClick={clearCart}
//             >
//               Vider le panier
//             </button>
//           </div>

//           {/* Colonne résumé */}
//           <PanierFormulaireCommande
//             totalItems={totalItems}
//             totalPrice={totalPrice}
//             cart={cartItems}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Panier;

// AsNumeric
import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import PanierFormulaireCommande from "../../components/ecom_section/PanierFormulaireCommande";
import ToastMessage from "../../components/Layout/ToastMessage";

const Panier = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [toast, setToast] = useState({ message: "", success: true });

  const showToast = (message, success = true) => {
    setToast({ message, success });
    setTimeout(() => setToast({ message: "", success: true }), 4000);
  };

  const handleCloseToast = () => {
    setToast({ message: "", success: true });
  };

  return (
    <div className="mx-4 p-4">
      {toast.message && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={handleCloseToast}
        />
      )}
      {/* Fil d'ariane */}
      <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2">
        <Link
          to="/boutique"
          className="hover:underline text-orange-500 font-semibold"
        >
          Accueil
        </Link>
        <span>/</span>
        <Link
          to="/boutique/catalogue"
          className="hover:underline text-orange-500 font-semibold"
        >
          Catalogue
        </Link>
        <span>/</span>
        <Link
          to="/boutique/panier"
          className="hover:underline text-orange-500 font-semibold"
        >
          Panier
        </Link>
      </nav>

      <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Votre panier est vide. Ajoutez des produits pour les voir ici.
        </p>
      ) : (
        <div className="flex flex-col-reverse lg:flex-row gap-2">
          {/* Colonne produits */}
          {/* DESKTOP */}
          <div className="hidden lg:block w-full lg:w-3/4">
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="border rounded p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Image */}
                <div className="w-full md:w-32 flex-shrink-0">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-32 h-32 object-contain"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-blue-400">
                      <i className="fas fa-image fa-lg"></i>
                    </div>
                  )}
                </div>

                {/* Infos principales */}
                <div className="text-center md:text-left w-1/4">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm">
                    Prix unitaire <br />
                    <strong>
                      {parseFloat(item.price).toLocaleString()} FCFA
                    </strong>
                  </p>
                </div>

                {/* Prix unitaire + quantité */}
                <div className="text-center flex items-center flex-col">
                  <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full px-1 py-2 w-fit shadow-inner">
                    <button
                      onClick={() => decreaseQuantity(item.product_id)}
                      className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="text-center font-semibold text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.product_id)}
                      className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-center">
                  <p>
                    Total <br />
                    <strong>
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </strong>
                  </p>
                </div>

                {/* Supprimer */}
                <div>
                  <button
                    className="px-4 py-2 bg-red-500 rounded-md text-sm text-white hover:bg-red-600"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            <button
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={clearCart}
            >
              Vider le panier
            </button>
          </div>

          {/* MOBILE */}
          <div className="block lg:hidden w-full">
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="border rounded p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Image */}
                <div className="w-full md:w-32 flex-shrink-0">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-32 h-32 object-contain"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-blue-400">
                      <i className="fas fa-image fa-lg"></i>
                    </div>
                  )}
                </div>

                {/* Infos principales */}
                <div className="text-center md:text-left w-1/4">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm">
                    Prix unitaire <br />
                    <strong>
                      {parseFloat(item.price).toLocaleString()} FCFA
                    </strong>
                  </p>
                </div>

                {/* Prix unitaire + quantité */}
                <div className="text-center flex items-center flex-col">
                  <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-full px-1 py-2 w-fit shadow-inner">
                    <button
                      onClick={() => decreaseQuantity(item.product_id)}
                      className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="text-center font-semibold text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.product_id)}
                      className="w-8 h-8 flex items-center justify-center text-lg font-bold bg-white rounded-full shadow hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-center">
                  <p>
                    Total <br />
                    <strong>
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </strong>
                  </p>
                </div>

                {/* Supprimer */}
                <div>
                  <button
                    className="px-4 py-2 bg-red-500 rounded-md text-sm text-white hover:bg-red-600"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            <button
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={clearCart}
            >
              Vider le panier
            </button>
          </div>

          {/* Colonne résumé */}
          <PanierFormulaireCommande
            totalItems={totalItems}
            totalPrice={totalPrice}
            cart={cartItems}
            showToast={showToast}
          />
        </div>
      )}
    </div>
  );
};

export default Panier;
