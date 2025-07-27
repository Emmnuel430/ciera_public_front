import { useState } from "react";
import { CheckboxGroup } from "./CheckboxGroup";
import FloatingInputField from "./FloatingInputField";

import emailjs from "@emailjs/browser";

export default function FormRDV({ showToast }) {
  const [formData, setFormData] = useState({
    client_nom: "",
    client_prenom: "",
    client_email: "",
    client_tel: "",
    immat: "",
    marque: "",
    modele: "",
    premiere_mise_en_circulation: "",
    kilometrage: "",
    commentaires: "",
    date_prise_rdv: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [checkboxDetails, setCheckboxDetails] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatRdvDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const time = date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = `${date.toLocaleDateString(
      "fr-FR",
      options
    )} à ${time}`;
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      pneus: selectedOptions.includes("pneus"),
      amortisseurs: selectedOptions.includes("amortisseurs"),
      vidange: selectedOptions.includes("vidange"),
      vidange_km: checkboxDetails["vidange"] || null,
      distribution: selectedOptions.includes("distribution"),
      revision: selectedOptions.includes("revision"),
      revision_km: checkboxDetails["revision"] || null,
      climatisation: selectedOptions.includes("climatisation"),
      freinage: selectedOptions.includes("freinage"),
      echappement: selectedOptions.includes("echappement"),
      autres: selectedOptions.includes("autres"),
      autres_details: checkboxDetails["autres"] || null,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rdvs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data?.message || "Erreur lors de l’envoi.";
        showToast(errorMessage, false);
        return;
      }

      // Email de confirmation
      const templateParams = {
        to_name: `${formData.client_prenom} ${formData.client_nom}`,
        vehicule: `${formData.marque} ${formData.modele}`,
        rdv_date_formatted: formatRdvDate(formData.date_prise_rdv),
        email: formData.client_email,
      };

      try {
        await emailjs.send(
          "service_qc3z69q",
          "template_w0egacp",
          templateParams,
          "hbcJ72ZoMnlkkf3sp"
        );
        showToast("Commande envoyée et mail de confirmation envoyé !", true);
      } catch (emailError) {
        console.error("Erreur mail :", emailError);
        showToast(
          "Commande envoyée mais l’e-mail n’a pas pu être envoyé.",
          false
        );
      }

      // Reset
      setFormData({
        client_nom: "",
        client_prenom: "",
        client_email: "",
        client_tel: "",
        immat: "",
        marque: "",
        modele: "",
        premiere_mise_en_circulation: "",
        kilometrage: "",
        commentaires: "",
        date_prise_rdv: "",
      });
      setSelectedOptions([]);
      setCheckboxDetails({});
    } catch (error) {
      console.error("Erreur réseau :", error);
      showToast("Erreur de connexion au serveur", false);
    }

    setIsLoading(false);
  };

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const formatDate = (date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  const formatDate2 = (date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const formattedNow = formatDate(now);
  const formattedNow2 = formatDate2(now);
  const oneYearLater = new Date();
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  const formattedMax = formatDate(oneYearLater);

  const clientFields = [
    { label: "Nom", name: "client_nom", type: "text", required: true },
    { label: "Prénom", name: "client_prenom", type: "text", required: true },
    { label: "Email", name: "client_email", type: "email", required: true },
    { label: "Téléphone", name: "client_tel", type: "tel" },
  ];

  const vehiculeFields = [
    { label: "Immatriculation", name: "immat", required: true },
    { label: "Marque", name: "marque", required: true },
    { label: "Modèle", name: "modele", required: true },
    {
      label: "Date de mise en circulation",
      name: "premiere_mise_en_circulation",
      type: "date",
      max: formattedNow2,
    },
    {
      label: "Kilométrage",
      name: "kilometrage",
      type: "number",
    },
  ];

  return (
    <form
      className="bg-green-800 text-white p-6 rounded-xl shadow-md space-y-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center text-white">
        J&apos;en profite et prends RDV !
      </h2>

      {/* Étape 1 */}
      <fieldset className="space-y-6">
        <legend className="text-xl text-center font-semibold mb-4">
          1. Vos infos
        </legend>
        {clientFields.map((field) => (
          <FloatingInputField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleInputChange}
          />
        ))}
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-xl text-center font-semibold mb-4">
          2. Véhicule
        </legend>
        {vehiculeFields.map((field) => (
          <FloatingInputField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleInputChange}
          />
        ))}
      </fieldset>

      {/* Étape 3 */}
      <fieldset className="space-y-4">
        <legend className="text-xl text-center font-semibold mb-2">
          3. Objet du RDV
        </legend>
        <CheckboxGroup
          selected={selectedOptions}
          setSelected={setSelectedOptions}
          details={checkboxDetails}
          setDetails={setCheckboxDetails}
        />
        <textarea
          name="commentaires"
          value={formData.commentaires}
          onChange={handleInputChange}
          rows="5"
          placeholder="Commentaires"
          className="w-full border p-2 rounded bg-white/90 text-black"
        />
      </fieldset>

      {/* Date RDV */}
      <div>
        <label className="block mb-1 font-semibold">Date souhaitée *</label>
        <input
          type="datetime-local"
          name="date_prise_rdv"
          required
          value={formData.date_prise_rdv}
          onChange={handleInputChange}
          min={formattedNow}
          max={formattedMax}
          className="w-full border p-2 rounded bg-white text-black"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-semibold">
          Centre de rendez-vous *
        </label>
        <select
          name="centre"
          required
          value={formData.centre}
          onChange={handleInputChange}
          className="w-full border p-2 rounded bg-white text-black"
        >
          <option value="">-- Sélectionnez un centre --</option>
          {[
            "CIERA ABIDJAN",
            "CIERA Korogho",
            "CIERA Yakro",
            "CIERA Bingerville",
          ].map((centre) => (
            <option key={centre} value={centre}>
              {centre}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
      >
        {isLoading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i> Chargement...
          </span>
        ) : (
          "Envooyer la demande"
        )}
      </button>
    </form>
  );
}
