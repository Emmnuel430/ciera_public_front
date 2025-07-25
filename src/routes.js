// Importation des dépendances React et des composants nécessaires de React Router
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./components/NotFound";
// ---------------
import Page from "./pages/Page";
import ScrollToTop from "./components/ScrollToTop";
import HomeBoutique from "./pages/boutique/HomeBoutique";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 1️⃣ Route pour la page d'accueil */}
        <Route path="/" element={<Navigate to="/accueil" replace />} />
        {/* 1️⃣ Route pour les pages de la boutique */}
        <Route path="/boutique/*" element={<HomeBoutique />} />

        {/* 2️⃣ Route dynamique pour toutes les pages CMS via slug */}
        <Route path="/:slug" element={<Page />} />
        {/* 404 si la page n'est pas reconnue */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
