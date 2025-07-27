import FormRDV from "../components/rdv_form/FormRDV";
import { RenderSection } from "./RenderSections";
import React, { useState } from "react";
import ToastMessage from "../components/Layout/ToastMessage";

export default function PageSidebarRDVLayout({ page }) {
  const hero = page.sections[0];
  const contentSection = page.sections[1];
  const remainingSections = page.sections.slice(2, -1);
  const lastSection = page.sections[page.sections.length - 1];

  const [toast, setToast] = useState({ message: "", success: true });

  const showToast = (message, success = true) => {
    setToast({ message, success });
    setTimeout(() => setToast({ message: "", success: true }), 4000);
  };

  const handleCloseToast = () => {
    setToast({ message: "", success: true });
  };

  return (
    <>
      {/* Hero */}
      {toast.message && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={handleCloseToast}
        />
      )}
      {RenderSection(hero)}

      {/* Section prise de RDV avec layout 2 colonnes */}
      <div className="flex flex-col lg:flex-row gap-8 px-6 py-16 bg-white">
        {/* Partie gauche : contenu (60%) */}
        <div className="lg:w-[55%]">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {contentSection.title}
          </h2>
          <div className="space-y-6">
            {contentSection.subsections?.map((sub) => (
              <div key={sub.id}>
                <h3 className="text-xl font-semibold mb-2">{sub.title}</h3>
                <div className="text-gray-700">{sub.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partie droite : formulaire (40%) */}
        <div className="lg:w-[45%]">
          <FormRDV showToast={showToast} />
        </div>
      </div>

      {/* Autres sections rendues normalement */}
      {remainingSections.map((section) => RenderSection(section))}

      {/* Dernière section */}
      {RenderSection(lastSection)}
    </>
  );
}
