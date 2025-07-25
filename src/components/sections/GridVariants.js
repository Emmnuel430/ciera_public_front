import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BoutonAjouterPanier } from "../ecom_section/BoutonAjouterPanier";
import ToastMessage from "../../components/Layout/ToastMessage";
import { useSecureFetch } from "../../utils/useSecureFetch";
import ProductLinkCard from "../ecom_section/ProductLinkCard";

export const GridColumns = ({ section }) => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-100 px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        {section.title}
      </h2>
      {section.subtitle && (
        <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {section.subsections.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition-all duration-300"
        >
          {item.image && (
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                alt={item.title}
                className="h-10 w-10"
              />
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          <p className="mt-3 text-gray-600">{item.content}</p>
        </div>
      ))}
    </div>
  </section>
);

export const GridIcons = ({ section }) => (
  <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* ➕ Gauche : Infos de la section */}
      <div>
        {section.title && (
          <p className="text-lg text-gray-600 mb-2">{section.title}</p>
        )}
        {section.subtitle && (
          <h1 className="font-bold mb-4">{section.subtitle}</h1>
        )}
        {section.content && (
          <p className="text-gray-700 mb-6 leading-relaxed">
            {section.content}
          </p>
        )}
        {/* {section.image && (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`}
            alt={section.title}
            className="mb-6 w-full h-80 object-contain rounded shadow"
          />
        )} */}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            {section.button_text}
          </a>
        )}
      </div>

      {/* ➕ Droite : Cartes des sous-sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow pt-5 flex flex-col"
          >
            {/* Icône ou image */}
            <span className="px-4 rounded-full overflow-hidden w-fit text-green-600 text-xl">
              {item.icon ? (
                <i className={`${item.icon}`} />
              ) : (
                <i className="fas fa-circle-question" />
              )}
            </span>

            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              {item.subtitle && (
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              )}
              {item.content && (
                <p className="text-gray-600 mt-2 text-sm">{item.content}</p>
              )}
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  className="inline-block mt-4 text-orange-600 hover:underline text-sm"
                >
                  {item.button_text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GridCards = ({ section }) => (
  <section className="py-20 bg-white px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center mb-14">
      <h1 className="text-3xl md:text-4xl font-bold text-orange-700">
        {section.title}
      </h1>
      {section.subtitle && (
        <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
      {section.subsections.map((item, index) => (
        <div
          key={index}
          className="hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300"
        >
          {item.image && (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
              alt={item.title}
              className="w-full h-56 object-contain"
            />
          )}
          <div className="p-6 flex flex-col justify-between flex-1 text-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">{item.content}</p>
            </div>
            {item.button_text && item.button_link && (
              <a
                href={item.button_link}
                className="mt-6 inline-block text-center bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-primary-700 transition"
              >
                {item.button_text}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const GridSplit = ({ section }) => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Gauche : Infos de la section */}
        <div>
          {section.title && (
            <p className="text-lg text-gray-600 mb-2">{section.title}</p>
          )}
          {section.subtitle && (
            <h1 className="font-bold mb-4">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.image && (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`}
              alt={section.title}
              className="mb-6 w-full h-80 object-contain rounded shadow"
            />
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
            >
              {section.button_text}
            </a>
          )}
        </div>

        {/* Droite : Cartes des sous-sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {section.subsections?.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow pt-5"
            >
              {item.image && (
                <div className="w-25 h-25 rounded-full overflow-hidden bg-gray-300 ms-8">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    style={{ transform: "scale(0.65)" }}
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                )}
                {item.content && (
                  <p className="text-gray-300 mt-2 text-sm">{item.content}</p>
                )}
                {item.button_text && item.button_link && (
                  <a
                    href={item.button_link}
                    className="inline-block mt-4 text-orange-600 hover:underline text-sm"
                  >
                    {item.button_text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GridSplitDark = ({ section }) => {
  const imageUrl = `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`;
  const isVideo = /\.(mp4|webm|ogg)$/i.test(section.image);
  return (
    <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Gauche : Infos de la section */}
        <div>
          {section.title && (
            <p className="text-lg text-gray-600 mb-2">{section.title}</p>
          )}
          {section.subtitle && (
            <h1 className="font-bold mb-4">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.image &&
            (isVideo ? (
              <video
                src={imageUrl}
                autoPlay
                muted
                loop
                playsInline
                className="mb-6 w-full h-80 object-contain rounded shadow"
              />
            ) : (
              <img
                src={imageUrl}
                alt={section.title}
                className="mb-6 w-full h-80 object-contain rounded shadow"
              />
            ))}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
            >
              {section.button_text}
            </a>
          )}
        </div>

        {/* Droite : Cartes des sous-sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {section.subsections?.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow bg-zinc-900 pt-5 text-white"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 ms-8 flex items-center justify-center">
                {item.icon ? (
                  <i
                    className={`${item.icon} text-5xl text-orange-700`}
                    style={{ transform: "scale(0.8)" }}
                  />
                ) : item.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    style={{ transform: "scale(0.65)" }}
                  />
                ) : (
                  <i className="fas fa-circle-question text-3xl text-orange-500" />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                )}
                {item.content && (
                  <p className="text-gray-300 mt-2 text-sm">{item.content}</p>
                )}
                {item.button_text && item.button_link && (
                  <a
                    href={item.button_link}
                    className="inline-block mt-4 text-orange-600 hover:underline text-sm"
                  >
                    {item.button_text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GridSections = ({ section }) => (
  <div className="bg-orange-700 pt-16 text-white">
    {/* Titre + Sous-titre */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">{section.title}</h2>
      {section.subtitle && <p className="mt-2">{section.subtitle}</p>}
    </div>

    {/* Cartes des sous-sections */}
    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y md:divide-y lg:divide-y-0 lg:divide-x divide-gray-300 text-center mb-12 bg-transparent rounded shadow-sm mx-10">
      {section.subsections.map((item, index) => (
        <div key={index} className="p-6">
          <div className="flex justify-between items-center gap-4 p-4">
            <h1 className="text-5xl font-bold me-2 w-1/2 flex">
              <span className="hidden lg:block">+</span> {item.content}
            </h1>
            <h4 className="w-1/2">{item.title}</h4>
          </div>

          {item.button_text && item.button_link && (
            <a
              href={item.button_link}
              className="inline-block mt-2 text-orange-600 hover:underline font-medium"
            >
              {item.button_text}
            </a>
          )}
        </div>
      ))}
    </div>

    {/* Ligne d’images (desktop uniquement) */}
    <div className="hidden md:grid grid-cols-3 gap-0">
      {section.subsections.map((item, index) =>
        item.image ? (
          <img
            key={index}
            src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
            alt={item.title || `img-${index}`}
            className="w-full h-80 object-cover object-top"
          />
        ) : null
      )}
    </div>
  </div>
);

// -----------------------------
// Ecom Components
// -----------------------------

export function TwoCardsGrid({ section }) {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="text-center mb-12">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {section.title}
          </h2>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {(section.subsections || []).map((item, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden group shadow-lg"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-center text-white text-start p-6">
              <h2 className="font-bold mb-4">{item.title}</h2>
              <Link
                to={item.button_link || "#"}
                className="bg-orange-700 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold transition"
              >
                {item.button_text || "Voir"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// export function CategoryGrid({ section }) {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_BASE_URL}/categories`
//         );
//         const data = await res.json();
//         setCategories(data);
//       } catch (err) {
//         console.error("Erreur de chargement des catégories :", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <section className="py-20 px-6 md:px-12 bg-gray-200">
//       <div className="max-w-6xl mx-auto text-center mb-14">
//         <h2 className="text-3xl md:text-4xl font-bold text-orange-700">
//           {section.title}
//         </h2>
//         {section.subtitle && (
//           <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
//         )}
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {categories.slice(0, 6).map((cat) => (
//           <div
//             key={cat.id}
//             className="bg-gray-50 rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
//           >
//             {/* HEADER */}
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-10 h-10 bg-orange-100 text-orange-700 flex items-center justify-center rounded-full mr-3">
//                 <i className="fa fa-tools"></i>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">{cat.nom}</h3>
//               <div className="w-12 h-12 bg-gray-100 text-gray-700 flex items-center justify-center rounded-full ml-3">
//                 {cat.products?.length}
//               </div>
//             </div>

//             {/* PRODUITS */}
//             <ul className="text-left mt-4 text-gray-700 text-sm">
//               {cat.products?.slice(0, 5).map((prod) => (
//                 <li key={prod.id} className="mb-1 truncate">
//                   •{" "}
//                   <Link
//                     to={`/boutique/produit/${prod.id}`}
//                     className="product-link"
//                   >
//                     {prod.libelle}
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             {/* LIEN */}
//             {/* <div className="text-center">
//               <a
//                 href={`/boutique/categorie`}
//                 className="inline-block mt-4 text-orange-600 hover:underline font-medium"
//               >
//                 Voir tous les produits
//               </a>
//             </div> */}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export function LatestProductsGrid({ section }) {
//   const [toast, setToast] = useState({ message: "", success: true });

//   const showToast = (message, success = true) => {
//     setToast({ message, success });
//   };

//   const handleCloseToast = () => {
//     setToast({ message: "", success: true });
//   };
//   const image = section.image
//     ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`
//     : null;

//   const imageMobile = section.image_mobile
//     ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`
//     : null;

//   const [produits, setProduits] = useState([]);
//   useEffect(() => {
//     const fetchProduits = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_BASE_URL}/produits-public/light`
//         );
//         const data = await res.json();
//         setProduits(data.produits);
//       } catch (err) {
//         console.error("Erreur de chargement des produits :", err);
//       }
//     };

//     fetchProduits();
//   }, []);

//   const calculerMoyenneAvis = (avis) => {
//     if (!avis || avis.length === 0) return "";
//     const total = avis.reduce((acc, a) => acc + a.note, 0);
//     return `⭐ ${(total / avis.length).toFixed(1)} / 5`;
//   };

//   return (
//     <section className="py-16 px-4 md:px-12">
//       <ToastMessage
//         message={toast.message}
//         success={toast.success}
//         onClose={handleCloseToast}
//       />
//       {/* Titre et sous-titre */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//           {section.title}
//         </h2>
//         {section.subtitle && (
//           <p className="mt-2 text-gray-600 text-lg">{section.subtitle}</p>
//         )}
//       </div>

//       {/* Affichage mobile */}
//       <div className="md:hidden flex flex-col gap-6 items-center">
//         {image && (
//           <img
//             src={image}
//             alt="illustration mobile"
//             className="w-full max-h-52 object-cover rounded-xl border border-gray-200 shadow-sm"
//           />
//         )}
//         <Swiper
//           modules={[Pagination]}
//           pagination={{ clickable: true }}
//           loop
//           spaceBetween={12}
//           slidesPerView={2}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="w-full h-full items-stretch product-carousel py-10"
//         >
//           {produits?.map((prod, i) => (
//             <SwiperSlide key={i}>
//               <div className="bg-white rounded-2xl shadow-lg p-2 text-center flex flex-col min-h-[290px] max-w-xs mx-auto">
//                 <Link
//                   to={`/boutique/produit/${prod.id}`}
//                   className="text-inherit"
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   {Array.isArray(prod.images) && prod.images.length > 0 ? (
//                     <img
//                       src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${prod.images[0]}`}
//                       alt={prod.libelle}
//                       className="w-full h-28 object-contain mb-2"
//                     />
//                   ) : (
//                     <div className="w-full h-28 bg-gray-100 flex items-center justify-center text-blue-400 mb-2">
//                       <i className="fas fa-image fa-lg"></i>
//                     </div>
//                   )}

//                   {/* Texte avec espace réparti */}
//                   <div className="flex flex-col justify-between flex-1">
//                     <div className="text-left">
//                       <small className="text-gray-500 block">
//                         Ref : {prod.ref}
//                       </small>
//                       <h5 className="font-bold text-gray-800 text-sm line-clamp-2">
//                         {prod.libelle.charAt(0).toUpperCase() +
//                           prod.libelle.slice(1).toLowerCase()}
//                       </h5>
//                     </div>

//                     <div className="mt-1 text-xs text-yellow-600">
//                       {calculerMoyenneAvis(prod.avis)}
//                     </div>

//                     <div className="my-1 text-xs">
//                       <span
//                         className={
//                           prod.prix_promo
//                             ? "text-muted line-through text-gray-500"
//                             : "font-bold text-gray-800"
//                         }
//                       >
//                         {parseFloat(prod.prix).toLocaleString()} FCFA
//                       </span>
//                       {prod.prix_promo && (
//                         <>
//                           <br />
//                           <span className="ms-2 text-green-600 font-bold ml-2">
//                             {parseFloat(prod.prix_promo).toLocaleString()} FCFA
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </Link>

//                 {/* Bouton */}
//                 <BoutonAjouterPanier
//                   product={prod}
//                   showToast={showToast}
//                   className="mt-auto"
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       {/* ------------------------------ */}
//       {/* ------------------------------ */}
//       {/* ------------------------------ */}
//       {/* Affichage PC */}
//       <div className="hidden md:flex items-start gap-10 max-w-6xl mx-auto mt-12">
//         {/* Image à gauche (img_mobile désactivée sur PC) */}
//         {imageMobile && (
//           <img
//             src={imageMobile}
//             alt="illustration"
//             className="w-1/4 max-h-[400px] object-cover rounded-xl border border-gray-200 shadow-sm"
//           />
//         )}

//         {/* Carrousel à droite */}
//         <div className="w-3/4">
//           <Swiper
//             modules={[Pagination]}
//             pagination={{ clickable: true }}
//             loop
//             spaceBetween={20}
//             // slidesPerView={2}
//             breakpoints={{
//               1024: { slidesPerView: 3 },
//             }}
//             className="w-full h-full items-stretch product-carousel p-8"
//           >
//             {produits?.map((prod, i) => (
//               <SwiperSlide key={i}>
//                 <div className="bg-white rounded-2xl shadow-lg p-4 text-center flex flex-col min-h-[375px] hover:-translate-y-1 transition-all duration-300">
//                   <Link
//                     to={`/boutique/produit/${prod.id}`}
//                     className="text-inherit"
//                     style={{ textDecoration: "none", color: "inherit" }}
//                   >
//                     {Array.isArray(prod.images) && prod.images.length > 0 ? (
//                       <img
//                         src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${prod.images[0]}`}
//                         alt={prod.libelle}
//                         className="w-full h-40 object-contain mb-3"
//                       />
//                     ) : (
//                       <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-blue-400 mb-3">
//                         <i className="fas fa-image fa-lg"></i>
//                       </div>
//                     )}

//                     <small className="text-start text-xs text-gray-500">
//                       Ref : {prod.ref}
//                     </small>
//                     <h6 className="font-bold text-gray-800 text-start line-clamp-2">
//                       {prod.libelle.charAt(0).toUpperCase() +
//                         prod.libelle.slice(1).toLowerCase()}
//                     </h6>

//                     <div className="mt-1 text-sm text-yellow-600">
//                       {calculerMoyenneAvis(prod.avis)}
//                     </div>

//                     <div className="my-2">
//                       <div className="text-sm">
//                         <span
//                           className={
//                             prod.prix_promo
//                               ? "text-muted line-through text-gray-500"
//                               : "font-bold text-gray-800"
//                           }
//                         >
//                           {parseFloat(prod.prix).toLocaleString()} FCFA
//                         </span>
//                         {prod.prix_promo && (
//                           <>
//                             <br />
//                             <span className="ms-2 text-green-600 font-bold ml-2">
//                               {parseFloat(prod.prix_promo).toLocaleString()}{" "}
//                               FCFA
//                             </span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </Link>
//                   <BoutonAjouterPanier
//                     product={prod}
//                     showToast={showToast}
//                     className="mt-auto"
//                   />{" "}
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// }

// AsNumeric

export function CategoryGrid({ section }) {
  const { db, loading } = useSecureFetch("product");

  const produits = useMemo(() => db.data || [], [db]);
  const navigate = useNavigate();
  const location = useLocation();

  // On regroupe les produits par catégorie (clé = nom de la catégorie)
  const produitsParCategorie = useMemo(() => {
    const map = {};

    produits.forEach((prod) => {
      const cat = prod.category;
      if (!cat) return;

      if (!map[cat]) {
        map[cat] = [];
      }

      map[cat].push(prod);
    });

    // On trie chaque liste de produits par product_id DESC
    Object.keys(map).forEach((cat) => {
      map[cat] = map[cat].sort((a, b) => b.product_id - a.product_id);
    });

    return map;
  }, [produits]);

  // On limite à 6 catégories max pour l'affichage
  const categoriesAffichees = useMemo(() => {
    return Object.keys(produitsParCategorie)
      .sort((a, b) => a.localeCompare(b))
      .slice(0, 6)
      .map((cat) => ({
        nom: cat,
        produits: produitsParCategorie[cat],
      }));
  }, [produitsParCategorie]);

  const goToCatalogueWithCategory = (category) => {
    const currentParams = new URLSearchParams(location.search);

    currentParams.set("categorie", category);

    navigate(`/boutique/catalogue?${currentParams.toString()}`);
  };

  const capitalize = (text) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Majuscule 1ère lettre de chaque mot
  };

  // console.log(categoriesAffichees);

  return (
    <section className="py-20 px-6 md:px-12 bg-gray-200">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-700">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}
      </div>

      {loading ? (
        // ✅ SKELETON
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-8 shadow-md flex flex-col justify-between min-h-[200px]"
            >
              {/* Skeleton Header */}
              <div className="flex items-center justify-center mb-4 gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>

              {/* Skeleton Produits */}
              <ul className="mt-4 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-3 w-3/4 bg-gray-300 rounded"></li>
                ))}
              </ul>

              {/* Skeleton bouton */}
              <div className="mt-6 w-1/2 mx-auto h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categoriesAffichees.map((cat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
            >
              {/* HEADER */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-700 flex items-center justify-center rounded-full mr-3">
                  <i className="fa fa-tools"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {capitalize(cat.nom)}
                </h3>
                <div className="w-12 h-12 bg-gray-100 text-gray-700 flex items-center justify-center rounded-full ml-3">
                  {cat.produits.length}
                </div>
              </div>

              {/* PRODUITS */}
              <ul className="text-left mt-4 text-gray-700 text-sm">
                {cat.produits.slice(0, 5).map((prod) => (
                  <li key={prod.product_id} className="mb-1 truncate">
                    •{" "}
                    <Link
                      to={`/boutique/produit/${prod.product_id}`}
                      className="product-link"
                    >
                      {capitalize(prod.name)}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <button
                  onClick={() => goToCatalogueWithCategory(cat.nom)}
                  className="inline-block mt-4 text-orange-600 hover:underline font-medium"
                >
                  Voir tous les produits
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function LatestProductsGrid({ section }) {
  const { db, loading } = useSecureFetch("product");

  const produits = useMemo(() => db.data || [], [db]);

  const produitsFiltres = useMemo(() => {
    return produits
      .filter((prod) => {
        const variation = prod.variations?.[0];
        return variation && parseFloat(variation.purchase_price || "0") > 0;
      })
      .sort((a, b) => b.product_id - a.product_id);
  }, [produits]);

  const [toast, setToast] = useState({ message: "", success: true });

  const showToast = (message, success = true) => {
    setToast({ message, success });
  };
  const handleCloseToast = () => {
    setToast({ message: "", success: true });
  };

  const image = section.image
    ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`
    : null;

  const imageMobile = section.image_mobile
    ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`
    : null;

  return (
    <section className="py-16 px-4 md:px-12">
      <ToastMessage
        message={toast.message}
        success={toast.success}
        onClose={handleCloseToast}
      />

      {/* Titre */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-2 text-gray-600 text-lg">{section.subtitle}</p>
        )}
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col gap-6 items-center">
        {image && (
          <img
            src={image}
            alt="illustration"
            className="w-full max-h-52 object-cover rounded-xl border border-gray-200 shadow-sm"
          />
        )}
        {loading ? (
          <Swiper
            slidesPerView={2}
            spaceBetween={12}
            className="w-full py-10 animate-pulse"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-2xl shadow-md p-2 flex flex-col min-h-[290px] max-w-xs mx-auto">
                  <div className="w-full h-28 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-20 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 w-full bg-gray-300 rounded mt-auto"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full h-full product-carousel py-10"
          >
            {produitsFiltres.slice(0, 12).map((prod, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-2xl shadow-lg p-2 text-center flex flex-col min-h-[290px] max-w-xs mx-auto">
                  <ProductLinkCard product={prod} imageHeight="h-28" />

                  <BoutonAjouterPanier
                    product={prod}
                    showToast={showToast}
                    className="mt-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-start gap-10 max-w-6xl mx-auto mt-12">
        {imageMobile && (
          <img
            src={imageMobile}
            alt="illustration"
            className="w-1/4 max-h-[400px] object-cover rounded-xl border border-gray-200 shadow-sm"
          />
        )}
        <div className="w-3/4">
          {loading ? (
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              className="w-full p-8 animate-pulse"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col min-h-[375px]">
                    <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 w-24 bg-gray-300 rounded mb-1"></div>
                    <div className="h-4 w-40 bg-gray-300 rounded mb-1"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
                    <div className="h-8 w-full bg-gray-300 rounded mt-auto"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              loop
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full h-full product-carousel p-8"
            >
              {produitsFiltres.slice(0, 12).map((prod, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white rounded-2xl shadow-lg p-4 text-center flex flex-col min-h-[375px] hover:-translate-y-1 transition-all duration-300">
                    <ProductLinkCard product={prod} />

                    <BoutonAjouterPanier
                      product={prod}
                      showToast={showToast}
                      className="mt-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
