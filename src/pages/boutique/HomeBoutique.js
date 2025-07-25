import { Routes, Route } from "react-router-dom";
import BoutiqueAccueil from "./BoutiqueAccueil";
import Catalogue from "./Catalogue";
import LayoutPublic from "../../components/public_layout/LayoutPublic";
import ProduitDetail from "./ProduitDetail";
import Panier from "./Panier";
// import Loader from "../components/Layout/Loader";
// import NotFound from "../components/NotFound";

export default function HomeBoutique() {
  return (
    <LayoutPublic>
      {/* <BoutiqueHeader /> */}
      <Routes>
        <Route path="/" element={<BoutiqueAccueil />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="produit/:id" element={<ProduitDetail />} />
        <Route path="panier" element={<Panier />} />
        {/* etc */}
      </Routes>
      {/* <Route path="compte" element={<Compte />} /> */}
    </LayoutPublic>
  );
}
