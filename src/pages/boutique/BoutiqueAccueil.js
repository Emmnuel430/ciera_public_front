import React from "react";
import { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";

// Import des composants principaux
import Loader from "../../components/Layout/Loader";
import NotFound from "../../components/NotFound";
import { RenderSection } from "../RenderSections";

const EcomHomePage = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const LINK = process.env.REACT_APP_API_BASE_URL;

    fetch(`${LINK}/pages-public-by-template?template=ecom`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setPage(data); // On suppose une seule page ecom_home
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (notFound) return <NotFound />;

  return <>{page.sections.map((section) => RenderSection(section))}</>;
};

export default EcomHomePage;
