export const GridColumns = ({ section }) => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-100 px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        {section.title}
      </h2>
      {section.subtitle && (
        <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {section.subsections.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition-all duration-300"
        >
          {item.image && (
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                alt={item.title}
                className="h-10 w-10"
              />
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          <p className="mt-3 text-gray-600">{item.content}</p>
        </div>
      ))}
    </div>
  </section>
);

export const GridIcons = ({ section }) => (
  <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* ➕ Gauche : Infos de la section */}
      <div>
        {section.title && (
          <p className="text-lg text-gray-600 mb-2">{section.title}</p>
        )}
        {section.subtitle && (
          <h1 className="font-bold mb-4">{section.subtitle}</h1>
        )}
        {section.content && (
          <p className="text-gray-700 mb-6 leading-relaxed">
            {section.content}
          </p>
        )}
        {/* {section.image && (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`}
            alt={section.title}
            className="mb-6 w-full h-80 object-contain rounded shadow"
          />
        )} */}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            {section.button_text}
          </a>
        )}
      </div>

      {/* ➕ Droite : Cartes des sous-sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow pt-5 flex flex-col"
          >
            {/* Icône ou image */}
            <span className="px-4 rounded-full overflow-hidden w-fit text-green-600 text-xl">
              {item.icon ? (
                <i className={`${item.icon}`} />
              ) : (
                <i className="fas fa-circle-question" />
              )}
            </span>

            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              {item.subtitle && (
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              )}
              {item.content && (
                <p className="text-gray-600 mt-2 text-sm">{item.content}</p>
              )}
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  className="inline-block mt-4 text-orange-600 hover:underline text-sm"
                >
                  {item.button_text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GridCards = ({ section }) => (
  <section className="py-20 bg-white px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center mb-14">
      <h1 className="text-3xl md:text-4xl font-bold text-orange-700">
        {section.title}
      </h1>
      {section.subtitle && (
        <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
      {section.subsections.map((item, index) => (
        <div
          key={index}
          className="hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300"
        >
          {item.image && (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
              alt={item.title}
              className="w-full h-56 object-contain"
            />
          )}
          <div className="p-6 flex flex-col justify-between flex-1 text-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">{item.content}</p>
            </div>
            {item.button_text && item.button_link && (
              <a
                href={item.button_link}
                className="mt-6 inline-block text-center bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-primary-700 transition"
              >
                {item.button_text}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const GridSplit = ({ section }) => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Gauche : Infos de la section */}
        <div>
          {section.title && (
            <p className="text-lg text-gray-600 mb-2">{section.title}</p>
          )}
          {section.subtitle && (
            <h1 className="font-bold mb-4">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.image && (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`}
              alt={section.title}
              className="mb-6 w-full h-80 object-contain rounded shadow"
            />
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
            >
              {section.button_text}
            </a>
          )}
        </div>

        {/* Droite : Cartes des sous-sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {section.subsections?.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow pt-5"
            >
              {item.image && (
                <div className="w-25 h-25 rounded-full overflow-hidden bg-gray-300 ms-8">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    style={{ transform: "scale(0.65)" }}
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                )}
                {item.content && (
                  <p className="text-gray-300 mt-2 text-sm">{item.content}</p>
                )}
                {item.button_text && item.button_link && (
                  <a
                    href={item.button_link}
                    className="inline-block mt-4 text-orange-600 hover:underline text-sm"
                  >
                    {item.button_text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GridSplitDark = ({ section }) => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Gauche : Infos de la section */}
        <div>
          {section.title && (
            <p className="text-lg text-gray-600 mb-2">{section.title}</p>
          )}
          {section.subtitle && (
            <h1 className="font-bold mb-4">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.image && (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`}
              alt={section.title}
              className="mb-6 w-full h-80 object-contain rounded shadow"
            />
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
            >
              {section.button_text}
            </a>
          )}
        </div>

        {/* Droite : Cartes des sous-sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {section.subsections?.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow bg-zinc-900 pt-5 text-white"
            >
              <div className="w-25 h-25 rounded-full overflow-hidden bg-gray-300 ms-8 flex items-center justify-center">
                {item.icon ? (
                  <i
                    className={`${item.icon} text-5xl text-orange-700`}
                    style={{ transform: "scale(0.8)" }}
                  />
                ) : item.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    style={{ transform: "scale(0.65)" }}
                  />
                ) : (
                  <i className="fas fa-circle-question text-3xl text-orange-500" />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                )}
                {item.content && (
                  <p className="text-gray-300 mt-2 text-sm">{item.content}</p>
                )}
                {item.button_text && item.button_link && (
                  <a
                    href={item.button_link}
                    className="inline-block mt-4 text-orange-600 hover:underline text-sm"
                  >
                    {item.button_text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GridSections = ({ section }) => (
  <div className="bg-orange-700 pt-16 text-white">
    {/* Titre + Sous-titre */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold">{section.title}</h2>
      {section.subtitle && <p className="mt-2">{section.subtitle}</p>}
    </div>

    {/* Cartes des sous-sections */}
    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y md:divide-y lg:divide-y-0 lg:divide-x divide-gray-300 text-center mb-12 bg-transparent rounded shadow-sm mx-10">
      {section.subsections.map((item, index) => (
        <div key={index} className="p-6">
          <div className="flex justify-between items-center gap-4 p-4">
            <h1 className="text-5xl font-bold me-2 w-1/2 flex">
              <span className="hidden lg:block">+</span> {item.content}
            </h1>
            <h4 className="w-1/2">{item.title}</h4>
          </div>

          {item.button_text && item.button_link && (
            <a
              href={item.button_link}
              className="inline-block mt-2 text-orange-600 hover:underline font-medium"
            >
              {item.button_text}
            </a>
          )}
        </div>
      ))}
    </div>

    {/* Ligne d’images (desktop uniquement) */}
    <div className="hidden md:grid grid-cols-3 gap-0">
      {section.subsections.map((item, index) =>
        item.image ? (
          <img
            key={index}
            src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
            alt={item.title || `img-${index}`}
            className="w-full h-80 object-cover object-top"
          />
        ) : null
      )}
    </div>
  </div>
);
