// Importation des dépendances React et des composants nécessaires de React Router
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./components/NotFound";
// ---------------
import Page from "./pages/Page";
import ScrollToTop from "./components/ScrollToTop";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 1️⃣ Route pour la page d'accueil */}
        <Route path="/" element={<Navigate to="/accueil" replace />} />

        {/* 2️⃣ Route dynamique pour toutes les pages CMS via slug */}
        <Route path="/:slug" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

// Exportation du composant AppRoutes pour l'utiliser dans d'autres parties de l'application
export default AppRoutes;
