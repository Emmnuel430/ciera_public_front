import "./App.css";
import React from "react";
import AppRoutes from "./routes"; // Importation des routes de l'application
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <AppRoutes />{" "}
      </CartProvider>
    </div>
  );
}

export default App;
