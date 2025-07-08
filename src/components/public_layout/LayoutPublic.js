import { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png"; // Mets ici ton chemin correct vers le logo
import floral from "../../assets/img/floral-1.png"; // Mets ici ton chemin correct vers le logo
import { Link, useLocation } from "react-router-dom";
import UseNavbarInteractions from "../../assets/js/UseNavbarInteractions";
// import DropdownFondements from "./DropdownFondements";

function LayoutPublic({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [pages, setPages] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const API = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API}/settings-public`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = {};
        data.forEach((item) => {
          mapped[item.key] = item.value;
        });
        setSettings(mapped);
      });

    fetch(`${API}/pages-public`)
      .then((res) => res.json())
      .then((data) => setPages(data));

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = pages.map((page) => ({
    label: page.title,
    to: `/${page.slug}`,
  }));

  const socialIcons = [
    { key: "facebook", icon: "ri-facebook-fill" },
    { key: "instagram", icon: "ri-instagram-line" },
    { key: "youtube", icon: "ri-youtube-fill" },
    { key: "tiktok", icon: "ri-tiktok-fill" },
    { key: "linkedin", icon: "ri-linkedin-fill" },
    { key: "whatsapp", icon: "ri-whatsapp-line" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${
          scrolled ? "bg-green-950 border-b border-gray-600" : "bg-transparent"
        } text-white`}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Ligne desktop : logo + menu */}
          <div className="hidden lg:flex justify-between items-center py-3">
            {/* Logo */}
            <Link to="/" className="inline-block">
              <img
                src={
                  settings.logo
                    ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${settings.logo}`
                    : logo
                }
                alt="Logo site"
                className="w-28 h-28 object-contain"
              />
            </Link>

            {/* Menu nav */}
            <ul className="flex gap-6 items-center">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`nav-link transition duration-300 ${
                      location.pathname === link.to
                        ? "font-bold underline underline-offset-4 text-yellow-500"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile version */}
          <div className="lg:hidden">
            {/* Top: logo + burger */}
            <div className="flex justify-between items-center py-3">
              <Link to="/" className="inline-block">
                <img
                  src={logo}
                  alt="logo"
                  className="w-28 h-20 object-contain"
                />
              </Link>

              <div
                className="text-3xl text-white cursor-pointer z-50"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <i
                  className={`ri-${menuOpen ? "close-line" : "menu-4-line"}`}
                ></i>
              </div>
            </div>

            {/* Menu */}
            <div
              className={`absolute left-0 w-full bg-green-950/80 backdrop-blur-sm duration-300 z-40 ${
                menuOpen ? "top-0 h-[100vh]" : "top-[-120vh]"
              }`}
            >
              <ul className="flex flex-col justify-center items-center gap-8 py-6 h-full">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`nav-link transition duration-300 ${
                        location.pathname === link.to
                          ? "font-bold underline underline-offset-4 text-yellow-500"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* -------------------------------- */}
      <div className=" min-h-screen">{children}</div>
      {/* -------------------------------- */}

      <footer
        className={`bg-zinc-800 text-white mt-0 pb-10
        ${location.pathname === "/" ? "pt-20 " : "pt-5"} 
        relative`}
      >
        {/* Réseaux sociaux */}
        <div className="my-10 flex justify-center space-x-4 text-2xl text-white">
          {socialIcons.map(({ key, icon }) =>
            settings[key] ? (
              <a
                key={key}
                href={settings[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition"
              >
                <i className={icon}></i>
              </a>
            ) : null
          )}
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center md:text-left">
          {/* Logo */}
          <div>
            <img
              src={
                settings.logo2
                  ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${settings.logo2}`
                  : logo
              }
              alt="Logo footer"
              className="mx-auto md:mx-0 h-40 object-contain"
            />

            {/* <p className="mt-4 text-sm opacity-70">
              Une communauté unie par l'Etude de la Torah, par le Service Divin
              et par les Actes de charité et de bienfaisance.
            </p> */}
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="mb-4 font-bold text-lg">Navigation</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-orange-500 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-bold text-lg">Contact</h4>
            <ul className="space-y-1 text-sm text-white/90">
              {settings.email && <li>📧 {settings.email}</li>}
              {settings.emplacement && <li>📍 {settings.emplacement}</li>}
              {settings.telephone && <li>📞 {settings.telephone}</li>}
              {settings.telephone_2 && <li>📞 {settings.telephone_2}</li>}
              {settings.localisation && (
                <li>
                  <a
                    href={settings.localisation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    📌 Voir sur la carte
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 text-sm opacity-60">
          &copy; {new Date().getFullYear()} AsNumeric - J/E. Tous droits
          réservés.
        </div>

        {/* Décoration en bas */}
        <div className="absolute bottom-0 left-0 pointer-events-none">
          <img
            src={floral}
            alt="decor"
            width={400}
            height={200}
            className="opacity-30"
          />
        </div>
      </footer>

      {/* <!--~~~~~~~~~~~~~~~ Scroll Up ~~~~~~~~~~~~~~~--> */}
      <button
        type="button"
        className="fixed right-2 bottom-16 bg-red-500 shadow-lg px-3 py-2 md:px-4 md:py-3 rounded-md text-lg z-50 
    invisible opacity-0 translate-y-4 transition-all duration-300 ease-in-out"
        id="scroll-up"
        aria-label="Scroll to top"
      >
        <i className="ri-arrow-up-line text-white"></i>
      </button>

      <UseNavbarInteractions />
    </>
  );
}
export default LayoutPublic;
