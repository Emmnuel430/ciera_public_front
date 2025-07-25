// import { useState } from "react";
// import ToastMessage from "../../components/Layout/ToastMessage";
// import emailjs from "@emailjs/browser";
// import { useCart } from "../../contexts/CartContext";

// function PanierFormulaireCommande({ totalItems, totalPrice, cart }) {
//   const [nom, setNom] = useState("");
//   const [email, setEmail] = useState("");
//   const [numero, setNumero] = useState("");
//   const [commune, setCommune] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { clearCartAfterSending } = useCart();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!nom || !email || !numero || !commune) {
//       setErrorMsg("Tous les champs sont requis");
//       return;
//     }

//     setIsLoading(true);
//     setErrorMsg("");

//     // Construire le message des produits
//     let produits = "";
//     cart.forEach((item, index) => {
//       const prix = item.prix_promo ? item.prix_promo : item.prix;
//       const total = prix * item.quantity;

//       produits += `${index + 1}. ${item.libelle} (${item.ref})\n`;
//       produits += `   Quantité : ${item.quantity}\n`;
//       produits += `   Total : ${total.toLocaleString()} FCFA\n\n`;
//     });

//     const templateParams = {
//       nom,
//       email,
//       numero,
//       commune,
//       totalItems,
//       totalPrice: totalPrice.toLocaleString(),
//       produits,
//     };

//     try {
//       const result = await emailjs.send(
//         "service_qc3z69q", // à récupérer dans EmailJS
//         "template_urg5gby", // à récupérer dans EmailJS
//         templateParams,
//         "hbcJ72ZoMnlkkf3sp" // à récupérer dans EmailJS
//       );

//       console.log(result.text);
//       setSuccess(true);
//       setSuccessMsg("Commande envoyée avec succès !");
//       setNom("");
//       setEmail("");
//       setNumero("");
//       setCommune("");
//       clearCartAfterSending();
//       setTimeout(() => {
//         setSuccess(false);
//         setSuccessMsg("");
//       }, 5000); // 5 secondes
//     } catch (error) {
//       console.error(error);
//       setErrorMsg("Erreur lors de l'envoi de la commande.");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="w-full lg:w-1/4 border rounded p-4 space-y-4">
//       {/* Notifications */}
//       {errorMsg && (
//         <ToastMessage message={errorMsg} onClose={() => setErrorMsg("")} />
//       )}
//       {success && (
//         <ToastMessage
//           message={successMsg}
//           onClose={() => setSuccess(false)}
//           success={true}
//         />
//       )}

//       {/* Infos Panier */}
//       <div className="text-gray-700">
//         <p className="text-sm">
//           Nombre d’articles :{" "}
//           <span className="font-bold text-lg">{totalItems}</span>
//         </p>
//       </div>

//       <div className="bg-green-900 text-white p-4 rounded">
//         <p className="text-sm">Total facture</p>
//         <p className="text-xl font-bold">{totalPrice.toLocaleString()} FCFA</p>
//       </div>

//       {/* Formulaire */}
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           placeholder="Nom complet"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//           className="w-full border rounded px-3 py-2 text-sm"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded px-3 py-2 text-sm"
//         />
//         <input
//           type="tel"
//           placeholder="Numéro de téléphone"
//           value={numero}
//           onChange={(e) => setNumero(e.target.value)}
//           className="w-full border rounded px-3 py-2 text-sm"
//         />
//         <input
//           type="text"
//           placeholder="Commune"
//           value={commune}
//           onChange={(e) => setCommune(e.target.value)}
//           className="w-full border rounded px-3 py-2 text-sm"
//         />
//         <button
//           type="submit"
//           disabled={isLoading || !nom || !email || !numero || !commune}
//           className={`w-full text-white py-2 rounded font-semibold transition duration-300 ${
//             isLoading || !nom || !email || !numero || !commune
//               ? "bg-orange-400 cursor-not-allowed"
//               : "bg-orange-600 hover:bg-orange-700"
//           }`}
//         >
//           {isLoading ? (
//             <span>
//               <i className="fas fa-spinner fa-spin"></i> Chargement...
//             </span>
//           ) : (
//             "Commander"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PanierFormulaireCommande;

// AsNumeric

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useCart } from "../../contexts/CartContext";

function PanierFormulaireCommande({ totalItems, totalPrice, cart, showToast }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [commune, setCommune] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { clearCartAfterSending } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !email || !numero || !commune) {
      showToast("Tous les champs sont requis", false); // ❌ erreur
      return;
    }

    setIsLoading(true);

    // Construire le message des produits
    let produits = "";
    cart.forEach((item, index) => {
      const total = item.price * item.quantity;

      produits += `${index + 1}. ${item.name}\n`;
      produits += `   Ref : ${item.sku}\n`;
      produits += `   Quantité : ${item.quantity}\n`;
      produits += `   Total : ${total.toLocaleString()} FCFA\n\n`;
    });

    const templateParams = {
      nom,
      email,
      numero,
      commune,
      totalItems,
      totalPrice: totalPrice.toLocaleString(),
      produits,
    };

    try {
      const result = await emailjs.send(
        "service_qc3z69q",
        "template_urg5gby",
        templateParams,
        "hbcJ72ZoMnlkkf3sp"
      );

      console.log(result.text);

      // ✅ succès
      showToast("Commande envoyée avec succès !", true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      setNom("");
      setEmail("");
      setNumero("");
      setCommune("");
      clearCartAfterSending();
    } catch (error) {
      console.error(error);
      showToast("Erreur lors de l'envoi de la commande.", false); // ❌ erreur
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full lg:w-1/4 border rounded p-4 space-y-4">
      {/* Infos Panier */}
      <div className="text-gray-700">
        <p className="text-sm">
          Nombre d’articles :{" "}
          <span className="font-bold text-lg">{totalItems}</span>
        </p>
      </div>

      <div className="bg-green-900 text-white p-4 rounded">
        <p className="text-sm">Total facture</p>
        <p className="text-xl font-bold">{totalPrice.toLocaleString()} FCFA</p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <input
          type="tel"
          placeholder="Numéro de téléphone"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Commune"
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !nom || !email || !numero || !commune}
          className={`w-full text-white py-2 rounded font-semibold transition duration-300 ${
            isLoading || !nom || !email || !numero || !commune
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {isLoading ? (
            <span>
              <i className="fas fa-spinner fa-spin"></i> Chargement...
            </span>
          ) : (
            "Commander"
          )}
        </button>
      </form>
    </div>
  );
}

export default PanierFormulaireCommande;
