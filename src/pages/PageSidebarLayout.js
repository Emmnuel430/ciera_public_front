export default function PageSidebarLayout({ mainSection, sidebarSections }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 mt-20">
        {/* ➤ Colonne gauche 2/3 : contenu principal */}
        <div className="w-full md:w-2/3 space-y-6">
          {mainSection.subsections?.map((s, i) => (
            <div
              key={i}
              className="bg-white border rounded shadow-sm p-6 flex flex-col md:flex-row gap-6"
            >
              {/* ➤ Image à gauche */}
              {s.image && (
                <div className="md:w-1/3 w-full">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${s.image}`}
                    alt={s.title}
                    className="rounded w-full h-40 md:h-auto object-contain"
                  />
                </div>
              )}

              {/* ➤ Texte à droite */}
              <div className="md:w-2/3 w-full">
                {s.title && (
                  <h3 className="text-xl font-semibold mb-2">
                    {s.title.charAt(0).toUpperCase() + s.title.slice(1)}
                  </h3>
                )}
                {s.content && <p className="text-gray-700">{s.content}</p>}

                {s.button_text && s.button_link && (
                  <a
                    href={s.button_link}
                    className="inline-block text-orange-600 px-4 py-2 rounded mt-5 border border-orange-600 hover:bg-orange-600 hover:text-white transition-colors duration-300"
                  >
                    {s.button_text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ➤ Colonne droite 1/3 : sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* ➤ Bloc de recherche */}
          <div className="bg-green-950 text-white border border-green-200 rounded p-4 shadow">
            <h4 className="font-semibold mb-2">Recherche</h4>
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* ➤ Autres blocs (sections de la sidebar) */}
          {sidebarSections.map((section, i) => (
            <div
              key={i}
              className="bg-green-950 text-white border border-green-200 rounded p-4 shadow"
            >
              <h4 className="font-semibold mb-3">
                {section.title.charAt(0).toUpperCase() + section.title.slice(1)}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.subsections?.map((sub, j) => (
                  <li key={j} className="relative pl-5">
                    <span
                      className="absolute left-0 top-1.5 w-2 h-2 bg-orange-700"
                      style={{ content: '""' }}
                    ></span>
                    <a
                      href={sub.button_link || "#"}
                      className="text-white hover:underline"
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
