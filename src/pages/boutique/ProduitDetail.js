// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import Loader from "../../components/Layout/Loader";
// import NotFound from "../../components/NotFound";
// import ToastMessage from "../../components/Layout/ToastMessage";
// import { BoutonAjouterPanier } from "../../components/ecom_section/BoutonAjouterPanier";

// const DétailProduit = () => {
//   const { id } = useParams();
//   const [produit, setProduit] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);
//   const [toast, setToast] = useState({ message: "", success: true });

//   const showToast = (message, success = true) => {
//     setToast({ message, success });
//   };

//   const handleCloseToast = () => {
//     setToast({ message: "", success: true });
//   };

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API_BASE_URL}/produits-public/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProduit(data.produit);
//         setLoading(false);
//         if (!data.produit) setNotFound(true);
//       })
//       .catch((err) => {
//         console.error("Erreur de chargement:", err);
//         setNotFound(true);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading)
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   if (notFound) return <NotFound />;

//   const isVehicule = produit.type?.slug === "vehicule";

//   const calculerMoyenneAvis = (avis) => {
//     if (!avis || avis.length === 0) return "";
//     const total = avis.reduce((acc, a) => acc + a.note, 0);
//     return `⭐ ${(total / avis.length).toFixed(1)} / 5`;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date)) return ""; // Si invalide
//     return date.toLocaleDateString("fr-FR"); // Formate en DD/MM/YYYY
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Affichage du toast au niveau global de la page */}
//       <ToastMessage
//         message={toast.message}
//         success={toast.success}
//         onClose={handleCloseToast}
//       />
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
//         <span className="text-gray-800 font-bold">
//           {produit.libelle.trim().length > 10
//             ? produit.libelle.trim().slice(0, 10) + "..."
//             : produit.libelle.trim()}
//         </span>
//       </nav>
//       {/* Image & infos */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Swiper carousel */}
//         <Swiper
//           modules={[Pagination]}
//           pagination={{ clickable: true }}
//           loop
//           spaceBetween={12}
//           slidesPerView={1}
//           className="w-full max-h-[400px] rounded-xl overflow-hidden"
//         >
//           {Array.isArray(produit.images) && produit.images.length > 0 ? (
//             produit.images.map((img, idx) => (
//               <SwiperSlide key={idx}>
//                 <img
//                   src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${img}`}
//                   alt={produit.libelle}
//                   className="w-full h-80 object-contain"
//                 />
//               </SwiperSlide>
//             ))
//           ) : (
//             <SwiperSlide>
//               <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400">
//                 <i className="fas fa-image fa-2x"></i>
//               </div>
//             </SwiperSlide>
//           )}
//         </Swiper>

//         {/* Détails */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <h1 className="text-2xl font-bold mb-2">{produit.libelle}</h1>
//             {/* <div className="text-sm text-gray-500 mb-2">
//               Ref : {produit.ref}
//             </div> */}
//             <div className="text-sm text-yellow-600 mb-4">
//               {calculerMoyenneAvis(produit.avis)}
//             </div>

//             {/* Prix */}
//             <div className="mb-4 text-lg">
//               {produit.prix_promo ? (
//                 <>
//                   <span className="line-through text-gray-500 mr-2">
//                     {parseFloat(produit.prix).toLocaleString()} FCFA
//                   </span>
//                   <span className="text-green-600 font-bold">
//                     {parseFloat(produit.prix_promo).toLocaleString()} FCFA
//                   </span>
//                 </>
//               ) : (
//                 <span className="text-gray-800 font-bold">
//                   {parseFloat(produit.prix).toLocaleString()} FCFA
//                 </span>
//               )}
//             </div>

//             {/* Infos spécifiques */}
//             <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
//               {/* Marque & Modèle */}
//               <div className="min-w-[45%]">
//                 <strong>Marque:</strong> {produit.marque}
//               </div>
//               <div className="min-w-[45%]">
//                 <strong>Modèle:</strong> {produit.modele}
//               </div>

//               {/* Description */}
//               {produit.description && (
//                 <div className="w-full text-sm text-gray-700 whitespace-pre-line my-2">
//                   {produit.description}
//                 </div>
//               )}

//               {/* Séparateur personnalisé */}
//               <div className="w-full border-t border-gray-300 my-4" />

//               {/* Pièce détachée */}
//               {produit.type?.slug === "piece" && produit.piece?.poids && (
//                 <div className="min-w-[45%]">
//                   <strong>Poids:</strong> {produit.piece.poids} kg
//                 </div>
//               )}

//               {/* Véhicule */}
//               {isVehicule && (
//                 <>
//                   <div className="w-full " />

//                   {produit.vehicule.etat && (
//                     <div className="min-w-[45%]">
//                       <strong>État:</strong> {produit.vehicule.etat}
//                     </div>
//                   )}
//                   {produit.vehicule.date_immatriculation && (
//                     <div className="min-w-[45%]">
//                       <strong>Date immatriculation:</strong>{" "}
//                       {formatDate(produit.vehicule.date_immatriculation)}
//                     </div>
//                   )}
//                   {produit.vehicule.transmission && (
//                     <div className="min-w-[45%]">
//                       <strong>Transmission:</strong>{" "}
//                       {produit.vehicule.transmission}
//                     </div>
//                   )}
//                   {produit.vehicule.carburant && (
//                     <div className="min-w-[45%]">
//                       <strong>Carburant:</strong> {produit.vehicule.carburant}
//                     </div>
//                   )}
//                   {produit.vehicule.kilometrage != null && (
//                     <div className="min-w-[45%]">
//                       <strong>Kilométrage:</strong>{" "}
//                       {produit.vehicule.kilometrage.toLocaleString()} km
//                     </div>
//                   )}
//                   {produit.vehicule.puissance != null && (
//                     <div className="min-w-[45%]">
//                       <strong>Puissance:</strong> {produit.vehicule.puissance}
//                     </div>
//                   )}
//                   {produit.vehicule.cylindree && (
//                     <div className="min-w-[45%]">
//                       <strong>Cylindrée:</strong> {produit.vehicule.cylindree}
//                     </div>
//                   )}
//                   {produit.vehicule.nb_places != null && (
//                     <div className="min-w-[45%]">
//                       <strong>Places:</strong> {produit.vehicule.nb_places}
//                     </div>
//                   )}
//                   {produit.vehicule.nb_portes != null && (
//                     <div className="min-w-[45%]">
//                       <strong>Portes:</strong> {produit.vehicule.nb_portes}
//                     </div>
//                   )}
//                   {produit.vehicule.nb_proprietaires != null && (
//                     <div className="min-w-[45%]">
//                       <strong>Propriétaires:</strong>{" "}
//                       {produit.vehicule.nb_proprietaires}
//                     </div>
//                   )}
//                   {produit.vehicule.prochaine_revision && (
//                     <div className="min-w-[45%]">
//                       <strong>Prochaine révision:</strong>{" "}
//                       {formatDate(produit.vehicule.prochaine_revision)}
//                     </div>
//                   )}
//                   {produit.vehicule.couleur && (
//                     <div className="min-w-[45%]">
//                       <strong>Couleur:</strong> {produit.vehicule.couleur}
//                     </div>
//                   )}
//                   {produit.vehicule.type_entraînement && (
//                     <div className="min-w-[45%]">
//                       <strong>Type d'entraînement:</strong>{" "}
//                       {produit.vehicule.type_entraînement}
//                     </div>
//                   )}
//                   {produit.vehicule.consommation && (
//                     <div className="min-w-[45%]">
//                       <strong>Consommation:</strong>{" "}
//                       {produit.vehicule.consommation}
//                     </div>
//                   )}
//                   {produit.vehicule.emission_co2 && (
//                     <div className="min-w-[45%]">
//                       <strong>Émission CO2:</strong>{" "}
//                       {produit.vehicule.emission_co2}
//                     </div>
//                   )}
//                   {produit.vehicule.radar_recul != null && (
//                     <div className="min-w-[45%]">
//                       <strong>Radar de recul:</strong>{" "}
//                       {produit.vehicule.radar_recul ? "Oui" : "Non"}
//                     </div>
//                   )}
//                   {produit.vehicule.climatisation && (
//                     <div className="min-w-[45%]">
//                       <strong>Climatisation:</strong>{" "}
//                       {produit.vehicule.climatisation}
//                     </div>
//                   )}

//                   {/* Continue avec min-w-[45%] pour les autres champs... */}

//                   {produit.vehicule.equipements_interieurs && (
//                     <div className="w-full">
//                       <strong>Équipements intérieurs:</strong>{" "}
//                       {Array.isArray(produit.vehicule.equipements_interieurs)
//                         ? produit.vehicule.equipements_interieurs.join(", ")
//                         : produit.vehicule.equipements_interieurs.replace(
//                             /,/g,
//                             " / "
//                           )}
//                     </div>
//                   )}
//                   {produit.vehicule.equipements_securite && (
//                     <div className="w-full">
//                       <strong>Équipements sécurité:</strong>{" "}
//                       {Array.isArray(produit.vehicule.equipements_securite)
//                         ? produit.vehicule.equipements_securite.join(", ")
//                         : produit.vehicule.equipements_securite.replace(
//                             /,/g,
//                             " / "
//                           )}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Bouton d'action */}
//           <BoutonAjouterPanier
//             product={produit}
//             showToast={showToast}
//             className="mt-auto"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DétailProduit;

// AsNumeric

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { BoutonAjouterPanier } from "../../components/ecom_section/BoutonAjouterPanier";
import ToastMessage from "../../components/Layout/ToastMessage";

export default function ProduitDetail() {
  const { state } = useLocation();
  const product = state?.product;

  const [toast, setToast] = useState({ message: "", success: true });

  const showToast = (message, success = true) => {
    setToast({ message, success });
  };

  const handleCloseToast = () => {
    setToast({ message: "", success: true });
  };

  if (!product) return <div>Produit introuvable</div>;

  // const formattedName =
  //   product.name?.charAt(0).toUpperCase() +
  //   product.name?.slice(1).toLowerCase();

  const price = parseFloat(
    product.variations?.[0]?.purchase_price || 0
  ).toLocaleString();
  const brand = product.brand?.[0] || null;
  const locations = product.product_locations || [];

  return (
    <div className="p-4">
      {toast.message && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={handleCloseToast}
        />
      )}

      {/* Breadcrumb */}
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
        <span className="text-gray-800 font-bold">
          {product.name?.trim().length > 10
            ? product.name.trim().slice(0, 10) + "..."
            : product.name}
        </span>
      </nav>

      {/* Image & Détails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full max-h-[400px] object-contain bg-white rounded shadow"
          />
        ) : (
          <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-blue-400 rounded shadow">
            <i className="fas fa-image fa-2x"></i>
          </div>
        )}

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-1">SKU : {product.sku}</p>
            <p className="text-xl text-green-700 font-semibold mb-4">
              {price} FCFA
            </p>

            {brand && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-semibold">
                  Marque : <span className="text-gray-800">{brand.name}</span>
                </p>
                {brand.description && (
                  <p className="text-sm text-gray-500">
                    Véhicule : {brand.description}
                  </p>
                )}
              </div>
            )}

            {/* Lieux de disponibilité */}
            {locations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Disponible à :</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {locations.map((loc) => (
                    <li key={loc.location_id}>
                      <span className="font-medium">{loc.name}</span> –{" "}
                      {loc.location}
                      {loc.mobile && (
                        <>
                          {" • "}
                          <a
                            href={`tel:${loc.mobile}`}
                            className="text-blue-600 underline"
                          >
                            {loc.mobile}
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bouton Ajouter au panier */}
          <BoutonAjouterPanier
            product={product}
            showToast={showToast}
            className="mt-auto"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-600">
          {product.description || "Aucune description disponible."}
        </p>
      </div>
    </div>
  );
}
