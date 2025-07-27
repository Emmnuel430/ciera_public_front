import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSecureFetch } from "../../utils/useSecureFetch";
// -----------

export function HeroDefault({ section }) {
  const bgImage =
    `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}` ||
    `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}` ||
    "";
  return (
    <section
      className="relative bg-white text-white h-[90vh] flex items-center px-6 md:px-12"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {section.image && <div className="absolute inset-0 bg-black/40 z-0" />}
      <div className="relative bg-black bg-opacity-50 p-6 rounded max-w-xl">
        {section.title && (
          <h1 className="text-4xl font-bold mb-2">{section.title}</h1>
        )}
        {section.subtitle && (
          <h2 className="text-xl mb-4">{section.subtitle}</h2>
        )}
        {section.content && <p className="mb-6">{section.content}</p>}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded font-semibold"
          >
            {section.button_text}
          </a>
        )}
      </div>
    </section>
  );
}
/* 
export function HeroDefault({ section }) {
  const bgImage = section.image_mobile || section.image || "";

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center px-6 md:px-12"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${bgImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded max-w-3xl text-center text-white drop-shadow-lg">
        {section.title && (
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {section.title}
          </h1>
        )}
        {section.subtitle && (
          <h2 className="text-xl md:text-2xl mb-6 font-light">
            {section.subtitle}
          </h2>
        )}
        {section.content && (
          <p className="mb-8 text-md md:text-lg leading-relaxed">
            {section.content}
          </p>
        )}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 transition-colors duration-300 px-8 py-3 rounded font-semibold shadow-lg"
          >
            {section.button_text}
          </a>
        )}
      </div>
    </section>
  );
}
 */
// -----------------------
export function HeroMinimal({ section }) {
  const bgImage = `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`;
  return (
    <section
      className="relative text-white  h-[60vh] py-24 px-6 md:px-12 text-center"
      style={{
        backgroundImage: section.image ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay sombre */}
      {section.image && <div className="absolute inset-0 bg-black/40 z-0" />}

      {/* Contenu */}
      {/* <div className="relative z-10 max-w-4xl mx-auto">
    {section.title && (
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
        {section.title}
      </h1>
    )}
    {section.subtitle && (
      <h2 className="text-lg md:text-xl mb-4 text-gray-200">
        {section.subtitle}
      </h2>
    )}
    {section.content && (
      <p className="text-md md:text-lg mb-6 text-gray-300">
        {section.content}
      </p>
    )}
    {section.button_text && section.button_link && (
      <a
        href={section.button_link}
        className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded shadow transition duration-300"
      >
        {section.button_text}
      </a>
    )}
  </div> */}
    </section>
  );
}

// -------------------------
export function HeroSplit({ section }) {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {(section.image || section.image_mobile) && (
          <div className="md:w-1/2 w-full">
            <img
              src={
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}` ||
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`
              }
              alt={section.title || "hero image"}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
        )}
        <div className="md:w-1/2 w-full text-gray-900">
          {section.title && (
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {section.title}
            </h1>
          )}
          {section.subtitle && (
            <h2 className="text-xl mb-3 text-gray-600">{section.subtitle}</h2>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded shadow transition duration-300"
            >
              {section.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------
export function HeroSplitInverse({ section }) {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
        {(section.image || section.image_mobile) && (
          <div className="md:w-1/2 w-full">
            <img
              src={
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}` ||
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`
              }
              alt={section.title || "hero image"}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
        )}
        <div className="md:w-1/2 w-full text-gray-900">
          {section.title && (
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {section.title}
            </h1>
          )}
          {section.subtitle && (
            <h2 className="text-xl mb-3 text-gray-600">{section.subtitle}</h2>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded shadow transition duration-300"
            >
              {section.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// HeroCarousel.js

export function HeroCarousel({ section }) {
  const slides = section.subsections || [];
  // // ✅ Corrigé : on teste d'abord image_mobile si dispo, sinon image
  // const bgImage = slides.image
  //   ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${slides.image}`
  //   : "";
  // console.log("section:", section);

  return (
    <div className="relative text-white min-h-[80vh] bg-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full hero-carousel"
      >
        {slides.map((item, i) => {
          const slideBg = item.image
            ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`
            : "";

          return (
            <SwiperSlide key={i}>
              <div
                className="relative min-h-[90vh] flex items-center px-6 md:px-12"
                style={{
                  backgroundImage: slideBg ? `url("${slideBg}")` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {slideBg && (
                  <div className="absolute inset-0 bg-black/40 z-0" />
                )}
                <div className="relative p-6 max-w-2xl text-white">
                  <h2 className="font-bold mb-2">{item.title}</h2>
                  {item.subtitle && <h5 className="mb-2">{item.subtitle}</h5>}
                  {item.content && <p className="mb-4">{item.content}</p>}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export function HeroLocalisation({ section }) {
  return (
    <div
      className="py-16 px-6 md:px-12 relative text-white"
      style={{
        backgroundImage: section.image
          ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {section.image && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
      )}
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {section.image_mobile && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
              alt={section.title || "Image"}
              className="w-full rounded shadow"
            />
          </div>
        )}
        <div>
          <h1 className="font-bold mb-2 text-3xl text-center">
            {section.title}
          </h1>
          {section.subtitle && <p className="mb-2">{section.subtitle}</p>}
          {section.content && <p className="mb-4">{section.content}</p>}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// HeroInfo.js
export function HeroInfo({ section }) {
  return (
    <div className="py-16 px-6 md:px-12 bg-white text-black">
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {section.image_mobile && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
              alt={section.title || "Image"}
              className="w-full rounded"
            />
          </div>
        )}
        <div>
          <p className="mb-2 text-gray-800">{section.title}</p>
          {section.subtitle && (
            <h1 className="font-bold mb-2 text-3xl">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="mb-4 text-gray-700">{section.content}</p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeroInfoInverse({ section }) {
  return (
    <section
      className="py-16 px-6 md:px-12 relative bg-white"
      style={{
        backgroundImage: section.image
          ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {section.image && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      )}
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 ">
        <div>
          <p className="mb-2">{section.title}</p>
          {section.subtitle && (
            <h1 className="font-bold mb-2">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="mb-4 text-gray-700">{section.content}</p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {section.image_mobile && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
              alt={section.title || "Image"}
              className="w-full rounded shadow"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ----------------------------------
// Ecom Components
// ----------------------------------

// HERO AVEC FILTRES
// export function HeroWithFilters({ section }) {
//   const [filters, setFilters] = useState({
//     type: "",
//     categorie: "",
//     brand: "",
//   });
//   const [produits, setProduits] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduits = async () => {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/produits-public/light`
//       );
//       const data = await res.json();
//       setProduits(data.produits);
//     };
//     fetchProduits();
//   }, []);

//   const types = useMemo(() => {
//     const map = {};
//     produits.forEach((p) => {
//       if (p.type && !map[p.type.id]) {
//         map[p.type.id] = p.type;
//       }
//     });
//     return Object.values(map);
//   }, [produits]);

//   const categories = useMemo(() => {
//     const map = {};
//     produits.forEach((p) => {
//       if (
//         p.categorie &&
//         (!filters.type || p.categorie.type_id === parseInt(filters.type))
//       ) {
//         map[p.categorie.id] = p.categorie;
//       }
//     });
//     return Object.values(map);
//   }, [produits, filters.type]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const goToCatalogue = () => {
//     const query = new URLSearchParams(filters).toString();
//     navigate(`/boutique/catalogue?${query}`);
//   };
//   return (
//     <section
//       className="relative h-[80vh] flex items-center px-6 md:px-12 text-white"
//       style={{
//         backgroundImage: section.image
//           ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
//           : "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/50 z-0" />
//       <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
//         <h1 className="text-4xl font-bold mb-6">{section.title}</h1>
//         <div className="bg-white/90 rounded-xl p-4 md:p-6 flex flex-wrap gap-4 justify-center items-center shadow-lg w-full mx-auto">
//           <select
//             name="type"
//             onChange={handleChange}
//             value={filters.type}
//             className="py-2 rounded border text-black border-gray-700 px-5 flex-1 min-w-[140px]"
//           >
//             <option value="">Tous les types</option>
//             {types.map((type) => (
//               <option key={type.id} value={type.id}>
//                 {type.libelle}
//               </option>
//             ))}
//           </select>

//           <select
//             name="categorie"
//             onChange={handleChange}
//             value={filters.categorie}
//             className="py-2 rounded border text-black border-gray-700 px-5 flex-1 min-w-[140px]"
//             disabled={!filters.type}
//           >
//             <option value="">Toutes les Catégories</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.nom}
//               </option>
//             ))}
//           </select>

//           <button
//             className="bg-orange-600 text-white px-4 py-2 rounded"
//             onClick={goToCatalogue}
//           >
//             Recherchez
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// AsNumeric
export function HeroWithFilters({ section }) {
  const [filters, setFilters] = useState({
    type_unit: "",
    categorie: "",
    brand: "",
  });

  const navigate = useNavigate();

  const { db, loading } = useSecureFetch("product");

  const produits = useMemo(() => db.data || [], [db]);

  const typeUnits = useMemo(() => {
    const set = new Set();
    produits.forEach((p) => {
      if (p.type_unit) set.add(p.type_unit);
    });
    return Array.from(set);
  }, [produits]);

  const categories = useMemo(() => {
    const map = {};
    produits.forEach((p) => {
      if (p.category) {
        map[p.category] = p.category;
      }
    });
    return Object.values(map);
  }, [produits]);

  const produitsFiltres = useMemo(() => {
    return produits.filter((p) => {
      const matchType = !filters.type_unit || p.type_unit === filters.type_unit;
      const matchCat = !filters.categorie || p.category === filters.categorie;
      return matchType && matchCat;
    });
  }, [produits, filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const goToCatalogue = () => {
    const query = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });

    navigate(`/boutique/catalogue?${query.toString()}`);
  };

  const capitalize = (text) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Majuscule 1ère lettre de chaque mot
  };

  return (
    <section
      className="relative h-[80vh] flex items-center px-6 md:px-12 text-white"
      style={{
        backgroundImage: section.image
          ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">{section.title}</h1>
        {loading ? (
          // ✅ Skeleton loading
          <div className="bg-white/90 rounded-xl p-4 md:p-6 flex flex-wrap gap-4 justify-center items-center shadow-lg w-full mx-auto animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-[140px]"></div>
            <div className="h-10 bg-gray-300 rounded w-[140px]"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </div>
        ) : (
          // ✅ Version normale une fois chargée
          <div className="bg-white/90 rounded-xl p-4 md:p-6 flex flex-wrap gap-4 justify-center items-center shadow-lg w-full mx-auto">
            <select
              name="type_unit"
              onChange={handleChange}
              value={filters.type_unit}
              className="py-2 rounded border text-black border-gray-700 px-5 flex-1 min-w-[140px]"
            >
              <option value="">Tous les types</option>
              {typeUnits.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              name="categorie"
              onChange={handleChange}
              value={filters.categorie}
              className="py-2 rounded border text-black border-gray-700 px-5 flex-1 min-w-[140px]"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {capitalize(cat)}
                </option>
              ))}
            </select>

            <p className="text-black font-semibold w-full text-center">
              {produitsFiltres.length} produit
              {produitsFiltres.length > 1 ? "s" : ""} trouvé
              {produitsFiltres.length > 1 ? "s" : ""}
            </p>

            <button
              className="bg-orange-600 text-white px-4 py-2 rounded"
              onClick={goToCatalogue}
            >
              Recherchez
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
