// import React, { useEffect, useState, useMemo } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Loader from "../../components/Layout/Loader";
// import ToastMessage from "../../components/Layout/ToastMessage";
// import { BoutonAjouterPanier } from "../../components/ecom_section/BoutonAjouterPanier";

// const Catalogue = () => {
//   const [produits, setProduits] = useState([]);
//   const [filtre, setFiltre] = useState({ type: "", categorie: "", prix: "" });
//   const [showModal, setShowModal] = useState(false);
//   const [mobileFiltre, setMobileFiltre] = useState(filtre);
//   const [query, setQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFiltering, setIsFiltering] = useState(false);
//   const [toast, setToast] = useState({ message: "", success: true });

//   const showToast = (message, success = true) => {
//     setToast({ message, success });
//   };

//   const handleCloseToast = () => {
//     setToast({ message: "", success: true });
//   };

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduits = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_BASE_URL}/produits-public/light`
//         );
//         const data = await res.json();
//         setProduits(data.produits);
//       } catch (error) {
//         console.error("Erreur chargement des produits :", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProduits();
//   }, []);

//   // Chargement des filtres + query depuis l'URL (incluant prix maintenant)
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     setFiltre({
//       type: params.get("type") || "",
//       categorie: params.get("categorie") || "",
//       prix: params.get("prix") || "",
//     });
//     setQuery(params.get("q") || "");
//   }, [location.search]);

//   useEffect(() => {
//     setIsFiltering(true);
//     const timeout = setTimeout(() => setIsFiltering(false), 300);
//     return () => clearTimeout(timeout);
//   }, [filtre, query]);

//   const updateURLParams = (newFiltre, q) => {
//     const params = new URLSearchParams();

//     // Ajout des filtres si définis
//     Object.entries(newFiltre).forEach(([key, val]) => {
//       if (val && val.trim() !== "") {
//         params.set(key, val);
//       }
//     });

//     // Ajout de la recherche si définie et non vide
//     if (q && q.trim() !== "") {
//       params.set("q", q.trim());
//     }

//     navigate({
//       pathname: location.pathname,
//       search: params.toString(),
//     });
//   };

//   const getCategories = (typeId) => {
//     const map = {};
//     produits.forEach((p) => {
//       if (
//         p.categorie &&
//         (!typeId || p.categorie.type_id === parseInt(typeId))
//       ) {
//         map[p.categorie.id] = p.categorie;
//       }
//     });
//     return Object.values(map);
//   };

//   const Filtres = ({ mobile = false, values, onChange }) => {
//     const categoriesFiltrees = getCategories(values.type);

//     return (
//       <>
//         <h3 className="font-semibold mb-2">Filtrer par</h3>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">Type</label>
//           <select
//             name="type"
//             className="w-full border rounded p-1"
//             onChange={onChange}
//             value={values.type}
//           >
//             <option value="">Tous</option>
//             {types.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.libelle}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">Catégorie</label>
//           <select
//             name="categorie"
//             className="w-full border rounded p-1"
//             onChange={onChange}
//             value={values.categorie}
//             disabled={!values.type}
//           >
//             <option value="">Toutes</option>
//             {categoriesFiltrees.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.nom}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">Prix</label>
//           <select
//             name="prix"
//             className="w-full border rounded p-1"
//             value={values.prix}
//             onChange={onChange}
//           >
//             <option value="">Tous</option>
//             <option value="1">Moins de 50 000 FCFA</option>
//             <option value="2">Moins de 200 000 FCFA</option>
//             <option value="3">Moins de 1 000 000 FCFA</option>
//             <option value="4">Moins de 5 000 000 FCFA</option>
//             <option value="5">Moins de 10 000 000 FCFA</option>
//             <option value="6">Plus de 10 000 000 FCFA</option>
//           </select>
//         </div>
//         <button
//           type="button"
//           className="text-sm text-red-600 underline"
//           onClick={() => {
//             const resetFiltre = { type: "", categorie: "", prix: "" };
//             setFiltre(resetFiltre);
//             updateURLParams(resetFiltre, query);
//           }}
//         >
//           Réinitialiser les filtres
//         </button>

//         {mobile && (
//           <button
//             type="button"
//             className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded mt-4"
//             onClick={validerMobileFiltre}
//           >
//             Valider
//           </button>
//         )}
//       </>
//     );
//   };

//   const handleFiltreChange = (e) => {
//     const { name, value } = e.target;
//     let newFiltre = { ...filtre, [name]: value };

//     if (name === "type" && value !== filtre.type) {
//       newFiltre = { ...newFiltre, categorie: "", prix: "" };
//     }

//     setFiltre(newFiltre);
//     updateURLParams(newFiltre, query);
//   };

//   const handleMobileFiltreChange = (e) => {
//     const { name, value } = e.target;
//     setMobileFiltre((prev) => {
//       let updated = { ...prev, [name]: value };
//       if (name === "type" && value !== prev.type) {
//         updated = { ...updated, categorie: "", prix: "" };
//       }
//       // Ici on met à jour l'URL dès que ça change dans mobileFiltre
//       updateURLParams(updated, query);
//       return updated;
//     });
//   };

//   // Memorisation du filtrage pour optimiser le render
//   const produitsFiltres = useMemo(() => {
//     let filtered = produits.filter((p) => {
//       const parType = filtre.type ? p.type?.id === parseInt(filtre.type) : true;

//       const parCategorie = filtre.categorie
//         ? p.categorie?.id === parseInt(filtre.categorie) &&
//           p.categorie?.type_id === parseInt(filtre.type)
//         : true;

//       const parPrix =
//         filtre.prix === "1"
//           ? parseFloat(p.prix) <= 50000
//           : filtre.prix === "2"
//           ? parseFloat(p.prix) <= 200000
//           : filtre.prix === "3"
//           ? parseFloat(p.prix) <= 1000000
//           : filtre.prix === "4"
//           ? parseFloat(p.prix) <= 5000000
//           : filtre.prix === "5"
//           ? parseFloat(p.prix) <= 10000000
//           : filtre.prix === "6"
//           ? parseFloat(p.prix) >= 10000000
//           : true;

//       return p && parType && parCategorie && parPrix;
//     });

//     if (query.trim() !== "") {
//       const q = query.toLowerCase();
//       filtered = filtered
//         .filter(
//           (p) =>
//             p.libelle?.toLowerCase().includes(q) ||
//             p.ref?.toLowerCase().includes(q)
//         )
//         .sort((a, b) => {
//           const aExact = a.libelle?.toLowerCase() === q;
//           const bExact = b.libelle?.toLowerCase() === q;
//           return bExact - aExact;
//         });
//     }

//     return filtered;
//   }, [produits, filtre, query]);

//   const types = useMemo(() => {
//     const map = {};
//     produits.forEach((p) => {
//       if (p.type && !map[p.type.id]) {
//         map[p.type.id] = p.type;
//       }
//     });
//     return Object.values(map);
//   }, [produits]);

//   const openModal = () => {
//     setMobileFiltre(filtre);
//     setShowModal(true);
//   };

//   const validerMobileFiltre = () => {
//     const params = new URLSearchParams();
//     Object.entries(mobileFiltre).forEach(([k, v]) => {
//       if (v && v.trim() !== "") {
//         params.set(k, v);
//       }
//     });
//     if (query && query.trim() !== "") {
//       params.set("q", query.trim());
//     }
//     navigate(`/boutique/catalogue?${params.toString()}`);
//     setShowModal(false);
//   };

//   const calculerMoyenneAvis = (avis) => {
//     if (!avis || avis.length === 0) return "";
//     const total = avis.reduce((acc, a) => acc + a.note, 0);
//     return `⭐ ${(total / avis.length).toFixed(1)} / 5`;
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
//       </nav>
//       <div className="flex flex-col lg:flex-row gap-4 p-4">
//         {/* Sidebar PC */}
//         <aside className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow hidden lg:block lg:sticky lg:top-50 self-start h-fit">
//           <Filtres values={filtre} onChange={handleFiltreChange} />
//         </aside>

//         {/* Container Produits */}
//         <div className="w-full lg:w-3/4">
//           {produitsFiltres.length !== 0 && (
//             <div className="w-full lg:w-3/4 my-4">
//               <h2 className="text-xl font-semibold text-orange-600">
//                 {produitsFiltres.length.toLocaleString()} produit
//                 {produitsFiltres.length > 1 && "s"} trouvé
//                 {produitsFiltres.length > 1 && "s"}
//               </h2>
//             </div>
//           )}
//           <div
//             className={`py-4 ${
//               produitsFiltres.length !== 0
//                 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//                 : ""
//             }  gap-4`}
//           >
//             {isLoading || isFiltering ? (
//               <div className="flex justify-center items-center h-[50vh]">
//                 <Loader />
//               </div>
//             ) : produitsFiltres.length === 0 ? (
//               <div className="flex flex-col items-center justify-center my-16 text-gray-500">
//                 <i className="fas fa-box-open text-4xl text-orange-500 mb-4"></i>
//                 <p className="text-lg font-medium">
//                   Aucun produit trouvé{" "}
//                   {query && (
//                     <>
//                       pour "<span className="font-bold">{query}</span>"
//                     </>
//                   )}
//                   ..
//                 </p>
//               </div>
//             ) : (
//               produitsFiltres.map((prod) => (
//                 <div
//                   key={prod.id}
//                   className="bg-white rounded-2xl shadow-lg p-4 text-center flex flex-col min-h-[375px] hover:-translate-y-1 transition-all duration-300"
//                 >
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
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Mobile: Bouton Tri Flottant */}
//         <div className="lg:hidden sticky fixed bottom-4 left-0 z-50 w-full flex justify-center">
//           <button
//             className="bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg"
//             onClick={openModal}
//           >
//             <i className="fas fa-filter mr-2"></i> Tri
//           </button>
//         </div>

//         {showModal && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
//             onClick={() => setShowModal(false)}
//           >
//             <div
//               className="bg-white rounded-xl p-6 w-11/12 max-w-sm mx-auto relative"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="absolute top-4 right-4 text-gray-500 text-xl"
//                 onClick={() => setShowModal(false)}
//                 aria-label="Fermer"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//               <Filtres
//                 mobile
//                 values={mobileFiltre}
//                 onChange={handleMobileFiltreChange}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Catalogue;

// AsNumeric

import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Layout/Loader";
import ToastMessage from "../../components/Layout/ToastMessage";
import { BoutonAjouterPanier } from "../../components/ecom_section/BoutonAjouterPanier";
import { useSecureFetch } from "../../utils/useSecureFetch";
import ProductLinkCard from "../../components/ecom_section/ProductLinkCard";

const Catalogue = () => {
  const [filtre, setFiltre] = useState({
    type_unit: "",
    categorie: "",
    brand: "",
    prix: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(filtre);
  const [pendingFilters, setPendingFilters] = useState(filtre);

  // messages temporaires (toast) de succès ou erreur
  const [toast, setToast] = useState({ message: "", success: true });
  const showToast = (message, success = true) => {
    setToast({ message, success });
  };

  const handleCloseToast = () => {
    setToast({ message: "", success: true });
  };

  // accéder à l’URL courante et la modifier pour synchroniser les filtres avec l’URL
  const location = useLocation();
  const navigate = useNavigate();

  const { db, loading } = useSecureFetch("product");
  const produits = useMemo(() => db.data || [], [db]);

  const [currentPage, setCurrentPage] = useState(1);
  const produitsPerPage = 15;

  // Filtrage et recherche des produits
  const produitsFiltres = useMemo(() => {
    let filtered = produits.filter((p) => {
      const parType = filtre.type_unit
        ? p.type_unit === filtre.type_unit
        : true;

      const parCategorie = filtre.categorie
        ? p.category?.toLowerCase() === filtre.categorie.toLowerCase()
        : true;

      const prix = parseFloat(p.variations?.[0]?.purchase_price || "0");

      const parPrix =
        filtre.prix === "1"
          ? prix >= 0 && prix <= 5000
          : filtre.prix === "2"
          ? prix > 5000 && prix <= 10000
          : filtre.prix === "3"
          ? prix > 10000 && prix <= 50000
          : filtre.prix === "4"
          ? prix > 50000 && prix <= 100000
          : filtre.prix === "5"
          ? prix > 100000 && prix <= 250000
          : filtre.prix === "6"
          ? prix > 250000 && prix <= 500000
          : filtre.prix === "7"
          ? prix > 500000 && prix <= 750000
          : filtre.prix === "8"
          ? prix > 750000
          : filtre.prix === "9"
          ? prix >= 0 && prix <= 1000
          : true; // Tous

      return p && parType && parCategorie && parPrix;
    });

    if ((query || "").trim() !== "") {
      const q = (query || "").toLowerCase();
      filtered = filtered
        .filter(
          (p) =>
            p.name?.toLowerCase().includes(q) ||
            p.sku?.toLowerCase().includes(q)
        )
        .sort((a, b) => {
          const aExact = a.name?.toLowerCase() === q;
          const bExact = b.name?.toLowerCase() === q;
          return bExact - aExact;
        });
    }

    return filtered;
  }, [produits, filtre, query]);

  const totalPages = Math.ceil(produitsFiltres.length / produitsPerPage);

  const currentProduits = useMemo(() => {
    const startIndex = (currentPage - 1) * produitsPerPage;
    return produitsFiltres.slice(startIndex, startIndex + produitsPerPage);
  }, [produitsFiltres, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Pour revenir à la page 1 lors d’un filtre/catégorie
  useEffect(() => {
    setCurrentPage(1);
  }, [produits]);

  // Charger les filtres depuis l'URL + query depuis l'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      type_unit: params.get("type_unit") || "",
      categorie: params.get("categorie") || "",
      brand: params.get("brand") || "",
      prix: params.get("prix") || "",
    };
    setFiltre(newFilters);
    setPendingFilters(newFilters);
    setMobileFilters(newFilters);
    setQuery(params.get("q") || "");
  }, [location.search]);

  // indicateur de filtrage visuel
  useEffect(() => {
    setIsFiltering(true);
    const timeout = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timeout);
  }, [filtre, query]);

  // Génère dynamiquement l’URL avec les bons filtres
  const updateURLParams = (newFilters, q) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, val]) => {
      if (val && val.trim() !== "") {
        params.set(key, val);
      }
    });

    if (q && q.trim() !== "") {
      params.set("q", q.trim());
    }

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  // Handlers de changement de filtre
  // Desktop
  const handleFiltreChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...pendingFilters, [name]: value };
    setPendingFilters(updated);
  };

  // Mobile
  const handleMobileFilterChange = (e) => {
    const { name, value } = e.target;
    setMobileFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Appliquer les filtres mobiles
  const validerMobileFiltre = () => {
    setFiltre(mobileFilters);
    updateURLParams(mobileFilters, query);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowModal(false);
  };

  // listes uniques pour alimenter les select
  // Types
  const typeUnits = useMemo(() => {
    const set = new Set();
    produits.forEach((p) => {
      if (p.type_unit) set.add(p.type_unit);
    });
    return Array.from(set);
  }, [produits]);

  // Catégories
  // On utilise un Set pour éviter les doublons
  const categories = useMemo(() => {
    const set = new Set();
    produits.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [produits]);

  // Ouvrir modal filtres sur mobile
  const openModal = () => {
    setMobileFilters(filtre);
    setShowModal(true);
  };

  const Filtres = ({ mobile = false, values, onChange }) => {
    return (
      <>
        <h3 className="font-semibold mb-2">Filtrer par</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium">Type d’unité</label>
          <select
            name="type_unit"
            className="w-full border rounded p-1"
            onChange={onChange}
            value={values.type_unit}
          >
            <option value="">Tous</option>
            {typeUnits.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Catégorie</label>
          <select
            name="categorie"
            className="w-full border rounded p-1"
            onChange={onChange}
            value={values.categorie}
          >
            <option value="">Toutes</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Prix</label>
          <select
            name="prix"
            className="w-full border rounded p-1"
            value={values.prix}
            onChange={onChange}
          >
            <option value="">Tous</option>
            <option value="1">0 à 5 000 FCFA</option>
            <option value="2">5 000 à 10 000 FCFA</option>
            <option value="3">10 000 à 50 000 FCFA</option>
            <option value="4">50 000 à 100 000 FCFA</option>
            <option value="5">100 000 à 250 000 FCFA</option>
            <option value="6">250 000 à 500 000 FCFA</option>
            <option value="7">500 000 à 750 000 FCFA</option>
            <option value="8">Plus de 750 000 FCFA</option>
            <option value="9">test</option>
          </select>
        </div>

        {!mobile && (
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            onClick={() => {
              setFiltre(pendingFilters);
              updateURLParams(pendingFilters, query);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Appliquer
          </button>
        )}

        {mobile && (
          <button
            type="button"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded mt-4"
            onClick={validerMobileFiltre}
          >
            Valider
          </button>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Affichage du toast au niveau global de la page */}
      <ToastMessage
        message={toast.message}
        success={toast.success}
        onClose={handleCloseToast}
      />
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
      </nav>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        {/* Sidebar PC */}
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow hidden lg:block lg:sticky lg:top-50 self-start h-fit">
          <Filtres values={pendingFilters} onChange={handleFiltreChange} />
        </aside>

        {/* Container Produits */}
        <div className="w-full lg:w-3/4">
          {produitsFiltres.length !== 0 && (
            <div className="w-full lg:w-3/4 my-4">
              <h2 className="text-xl font-semibold text-orange-600">
                {produitsFiltres.length.toLocaleString()} produit
                {produitsFiltres.length > 1 && "s"} trouvé
                {produitsFiltres.length > 1 && "s"}
              </h2>
            </div>
          )}
          <nav className="mt-4 flex justify-center">
            <ul className="flex items-center gap-1">
              {/* Bouton Précédent */}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Précédent
                </button>
              </li>

              {/* Pages dynamiques */}
              {[...Array(totalPages).keys()]
                .map((_, index) => index + 1)
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, filteredPages) => (
                  <React.Fragment key={page}>
                    {/* ... si saut entre pages */}
                    {index > 0 && page !== filteredPages[index - 1] + 1 && (
                      <li>
                        <span className="px-3 py-1 text-gray-500">...</span>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded border text-sm ${
                          currentPage === page
                            ? "bg-green-600 text-white font-bold"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  </React.Fragment>
                ))}

              {/* Bouton Suivant */}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Suivant
                </button>
              </li>
            </ul>
          </nav>
          <div
            className={`py-4 ${
              produitsFiltres.length !== 0
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : ""
            }  gap-4`}
          >
            {loading || isFiltering ? (
              <div className="flex justify-center items-center h-[50vh]">
                <Loader />
              </div>
            ) : currentProduits.length === 0 ? (
              <div className="flex flex-col items-center justify-center my-16 text-gray-500">
                <i className="fas fa-box-open text-4xl text-orange-500 mb-4"></i>
                <p className="text-lg font-medium">
                  Aucun produit trouvé{" "}
                  {query && (
                    <>
                      pour "<span className="font-bold">{query}</span>"
                    </>
                  )}
                  ..
                </p>
              </div>
            ) : (
              currentProduits.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl shadow-lg p-4 text-center flex flex-col min-h-[375px] hover:-translate-y-1 transition-all duration-300"
                >
                  <ProductLinkCard product={prod} />

                  <BoutonAjouterPanier
                    product={prod}
                    showToast={showToast}
                    className="mt-auto"
                  />
                </div>
              ))
            )}
          </div>
          {/* <nav className="mt-4 flex justify-center">
            <ul className="flex items-center gap-1">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Précédent
                </button>
              </li>

              {[...Array(totalPages).keys()]
                .map((_, index) => index + 1)
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, filteredPages) => (
                  <React.Fragment key={page}>
                    {index > 0 && page !== filteredPages[index - 1] + 1 && (
                      <li>
                        <span className="px-3 py-1 text-gray-500">...</span>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded border text-sm ${
                          currentPage === page
                            ? "bg-green-600 text-white font-bold"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  </React.Fragment>
                ))}

              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Suivant
                </button>
              </li>
            </ul>
          </nav> */}
        </div>

        {/* Mobile: Bouton Tri Flottant */}
        <div className="lg:hidden sticky fixed bottom-4 left-0 z-50 w-full flex justify-center">
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg"
            onClick={openModal}
          >
            <i className="fas fa-filter mr-2"></i> Tri
          </button>
        </div>

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-xl p-6 w-11/12 max-w-sm mx-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 text-xl"
                onClick={() => setShowModal(false)}
                aria-label="Fermer"
              >
                <i className="fas fa-times"></i>
              </button>
              <Filtres
                mobile
                values={mobileFilters}
                onChange={handleMobileFilterChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;
