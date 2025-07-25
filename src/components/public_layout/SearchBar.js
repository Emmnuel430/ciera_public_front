import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync query avec l'URL (ex: ?q=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setQuery(q);
  }, [location.search]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/boutique/catalogue?q=${encodeURIComponent(query.trim())}`);
      // Tu peux vider le champ après navigation, si tu veux :
      // setQuery("");
      // Mais généralement on garde la recherche affichée
    }
  };

  return (
    <>
      {/* Desktop search */}
      <div className="hidden lg:flex flex-1 mx-6 justify-center">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="w-3/4 max-w-xl px-4 py-2 border rounded-l-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-orange-600 text-white px-3 py-2 rounded-r-md"
          onClick={handleSearch}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      {/* Mobile button */}
      <div className="flex lg:hidden items-center">
        <button
          onClick={toggleMobileSearch}
          className="text-xl bg-gray-200 p-2 rounded-full hover:text-green-700 w-10 h-10 flex items-center justify-center"
        >
          <i className="ri-search-line"></i>
        </button>
      </div>

      {/* Mobile floating search input */}
      {showMobileSearch && (
        <div className="lg:hidden fixed top-30 left-0 w-full flex justify-center z-100">
          <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-lg md:w-3/4 max-w-xl">
            <input
              type="text"
              placeholder="Rechercher..."
              className="flex-1 px-3 py-2 border rounded-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoFocus
            />
            <button
              className="bg-orange-600 text-white px-3 py-2 rounded-md"
              onClick={handleSearch}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
            <button className="text-gray-500 ml-2" onClick={toggleMobileSearch}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
