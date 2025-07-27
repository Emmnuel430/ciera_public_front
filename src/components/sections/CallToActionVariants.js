import { useState } from "react";
import { Link } from "react-router-dom";

export const CtaCentered = ({ section }) => (
  <section className="py-20 px-6 md:px-12 bg-green-900 text-white text-center">
    <h2 className="text-3xl font-bold mb-4 capitalize">{section.title}</h2>
    {section.subtitle && <p className="mb-6 text-lg">{section.subtitle}</p>}
    {section.button_text && section.button_link && (
      <Link
        to={section.button_link || ""}
        className="inline-block bg-orange-700 text-white px-6 py-3 font-semibold rounded shadow hover:bg-orange-500"
      >
        {section.button_text}
      </Link>
    )}
  </section>
);

export const CtaSplit = ({ section }) => {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(section.image);
  return (
    <section
      className="relative py-16 px-6 md:px-12 bg-orange-700 text-white"
      style={{
        backgroundImage: section.image
          ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {section.image && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      )}{" "}
      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-gray-200 mb-4">{section.subtitle}</p>
          )}
          {section.content && (
            <p className="text-gray-200 mb-6">{section.content}</p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 text-white px-10 py-3 font-semibold rounded rounded-10 shadow hover:bg-orange-700"
            >
              {section.button_text}
            </a>
          )}
        </div>
        {section.image_mobile && (
          <div className="w-full">
            {isVideo ? (
              <video
                src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
                autoPlay
                muted
                loop
                playsInline
                className="mb-6 w-full h-80 object-contain rounded shadow"
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
                alt={section.title}
                className="rounded-lg w-full h-auto object-cover"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export function CtaAppDownload({ section }) {
  return (
    <section className="py-16 px-6 md:px-12 bg-green-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Texte + boutons */}
        <div>
          {section.title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className="text-gray-600 mb-6">{section.subtitle}</p>
          )}
          <div className="space-y-3">
            {section.subsections?.map((item, index) => (
              <a
                key={index}
                href={item.button_link || "#"}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded shadow font-medium me-4"
              >
                {/* Cercle contenant l'icône */}
                {item.icon && (
                  <span className="w-8 h-8 flex items-center justify-center bg-white text-green-600 rounded-full me-3">
                    <i className={`${item.icon} text-lg`} />
                  </span>
                )}
                {item.button_text}
              </a>
            ))}
          </div>
        </div>

        {/* Image de droite */}
        {(section.image || section.image_mobile) && (
          <div className="w-full">
            <img
              src={
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}` ||
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`
              }
              alt="Illustration application"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function CtaNewsletter({ section }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔁 Tu pourras remplacer ceci par une vraie requête API
    console.log("Email inscrit :", email);
  };

  return (
    <section className="bg-green-950 py-16 px-6 md:px-12 text-center text-gray-800">
      <div className="max-w-2xl mx-auto">
        {section.title && (
          <h1 className=" text-white text-3xl font-bold mb-2">
            {section.title}
          </h1>
        )}
        {section.subtitle && (
          <h3 className="text-xl text-gray-400 mb-4">{section.subtitle}</h3>
        )}
        {section.content && (
          <p className="text-gray-600 mb-8">{section.content}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row ">
          <input
            type="email"
            required
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-orange-800 hover:bg-orange-900 text-white font-semibold px-6 py-3 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg transition border border-orange-800"
          >
            S’inscrire
          </button>
        </form>
      </div>
    </section>
  );
}

export function CtaContact({ section }) {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Données envoyées :", formData);
  };

  return (
    <section className="py-16 px-6 md:px-12">
      {section.title && (
        <h2 className="text-3xl font-bold mb-6 text-center">{section.title}</h2>
      )}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Gauche : Liste des sous-sections */}
        <div>
          <ul className="space-y-4">
            {section.subsections?.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded bg-orange-700 text-white text-lg shadow">
                  <i className={`fas ${item.icon || "fa-map-marker-alt"}`}></i>
                </div>
                <div className="w-[80%]">
                  <h4 className="font-semibold text-orange-600">
                    {item.title}
                  </h4>
                  {item.content && (
                    <div
                      className="text-xl text-green-700 font-bold"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Droite : Formulaire */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Envoyez-nous un message
          </h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg"
          >
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="objet"
              value={formData.objet}
              onChange={handleChange}
              placeholder="Objet"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-800 text-white px-6 py-2 rounded font-semibold"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
