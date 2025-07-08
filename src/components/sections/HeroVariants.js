import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// -----------

export function HeroDefault({ section }) {
  const bgImage =
    `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}` ||
    `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}` ||
    "";
  return (
    <section
      className="relative bg-white text-white h-[90vh] flex items-center px-6 md:px-12"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {section.image && <div className="absolute inset-0 bg-black/40 z-0" />}
      <div className="relative bg-black bg-opacity-50 p-6 rounded max-w-xl">
        {section.title && (
          <h1 className="text-4xl font-bold mb-2">{section.title}</h1>
        )}
        {section.subtitle && (
          <h2 className="text-xl mb-4">{section.subtitle}</h2>
        )}
        {section.content && <p className="mb-6">{section.content}</p>}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded font-semibold"
          >
            {section.button_text}
          </a>
        )}
      </div>
    </section>
  );
}
/* 
export function HeroDefault({ section }) {
  const bgImage = section.image_mobile || section.image || "";

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center px-6 md:px-12"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${bgImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded max-w-3xl text-center text-white drop-shadow-lg">
        {section.title && (
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {section.title}
          </h1>
        )}
        {section.subtitle && (
          <h2 className="text-xl md:text-2xl mb-6 font-light">
            {section.subtitle}
          </h2>
        )}
        {section.content && (
          <p className="mb-8 text-md md:text-lg leading-relaxed">
            {section.content}
          </p>
        )}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 transition-colors duration-300 px-8 py-3 rounded font-semibold shadow-lg"
          >
            {section.button_text}
          </a>
        )}
      </div>
    </section>
  );
}
 */
// -----------------------
export function HeroMinimal({ section }) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 text-gray-900 py-24 px-6 md:px-12 text-center">
      <div className="max-w-4xl mx-auto">
        {section.title && (
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {section.title}
          </h1>
        )}
        {section.subtitle && (
          <h2 className="text-lg md:text-xl mb-4 text-gray-600">
            {section.subtitle}
          </h2>
        )}
        {section.content && (
          <p className="text-md md:text-lg mb-6 text-gray-700">
            {section.content}
          </p>
        )}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded shadow transition duration-300"
          >
            {section.button_text}
          </a>
        )}
      </div>
    </section>
  );
}

// -------------------------
export function HeroSplit({ section }) {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {(section.image || section.image_mobile) && (
          <div className="md:w-1/2 w-full">
            <img
              src={
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}` ||
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`
              }
              alt={section.title || "hero image"}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
        )}
        <div className="md:w-1/2 w-full text-gray-900">
          {section.title && (
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {section.title}
            </h1>
          )}
          {section.subtitle && (
            <h2 className="text-xl mb-3 text-gray-600">{section.subtitle}</h2>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded shadow transition duration-300"
            >
              {section.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------
export function HeroSplitInverse({ section }) {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
        {(section.image || section.image_mobile) && (
          <div className="md:w-1/2 w-full">
            <img
              src={
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}` ||
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`
              }
              alt={section.title || "hero image"}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
        )}
        <div className="md:w-1/2 w-full text-gray-900">
          {section.title && (
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {section.title}
            </h1>
          )}
          {section.subtitle && (
            <h2 className="text-xl mb-3 text-gray-600">{section.subtitle}</h2>
          )}
          {section.content && (
            <p className="text-gray-700 mb-6 leading-relaxed">
              {section.content}
            </p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded shadow transition duration-300"
            >
              {section.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// HeroCarousel.js

export function HeroCarousel({ section }) {
  const slides = section.subsections || [];
  // // ✅ Corrigé : on teste d'abord image_mobile si dispo, sinon image
  // const bgImage = slides.image
  //   ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${slides.image}`
  //   : "";
  // console.log("section:", section);

  return (
    <div className="relative text-white min-h-[80vh] bg-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full hero-carousel"
      >
        {slides.map((item, i) => {
          const slideBg = item.image
            ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`
            : "";

          return (
            <SwiperSlide key={i}>
              <div
                className="relative min-h-[90vh] flex items-center px-6 md:px-12"
                style={{
                  backgroundImage: slideBg ? `url("${slideBg}")` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {slideBg && (
                  <div className="absolute inset-0 bg-black/40 z-0" />
                )}
                <div className="relative p-6 max-w-2xl text-white">
                  <h2 className="font-bold mb-2">{item.title}</h2>
                  {item.subtitle && <h5 className="mb-2">{item.subtitle}</h5>}
                  {item.content && <p className="mb-4">{item.content}</p>}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export function HeroLocalisation({ section }) {
  return (
    <div
      className="py-16 px-6 md:px-12 relative text-white"
      style={{
        backgroundImage: section.image
          ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {section.image && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
      )}
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {section.image_mobile && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
              alt={section.title || "Image"}
              className="w-full rounded shadow"
            />
          </div>
        )}
        <div>
          <h1 className="font-bold mb-2 text-3xl text-center">
            {section.title}
          </h1>
          {section.subtitle && <p className="mb-2">{section.subtitle}</p>}
          {section.content && <p className="mb-4">{section.content}</p>}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// HeroInfo.js
export function HeroInfo({ section }) {
  return (
    <div className="py-16 px-6 md:px-12 bg-white text-black">
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {section.image_mobile && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
              alt={section.title || "Image"}
              className="w-full rounded"
            />
          </div>
        )}
        <div>
          <p className="mb-2 text-gray-800">{section.title}</p>
          {section.subtitle && (
            <h1 className="font-bold mb-2 text-3xl">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="mb-4 text-gray-700">{section.content}</p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeroInfoInverse({ section }) {
  return (
    <section
      className="py-16 px-6 md:px-12 relative bg-white"
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
      )}
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 ">
        <div>
          <p className="mb-2">{section.title}</p>
          {section.subtitle && (
            <h1 className="font-bold mb-2">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="mb-4 text-gray-700">{section.content}</p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {section.image_mobile && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_mobile}`}
              alt={section.title || "Image"}
              className="w-full rounded shadow"
            />
          </div>
        )}
      </div>
    </section>
  );
}
