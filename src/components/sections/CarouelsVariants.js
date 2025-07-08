import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

export function CarouselSimple({ section }) {
  return (
    <section className="py-12 bg-gray-100">
      {/* Titre + Sous-titre */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-orange-700">{section.title}</h1>
        {section.subtitle && (
          <p className="mt-2 text-gray-600">{section.subtitle}</p>
        )}
      </div>
      <div>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="h-[30vh] partner-carousel"
        >
          {section.subsections.map((item, index) => {
            const imageUrl = item.image
              ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`
              : item.image_mobile
              ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image_mobile}`
              : null;

            return (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center max-h-[300px]">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={`slide-${index}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
export const CarouselWithCaptions = ({ section }) => {
  return (
    <section className="py-12 bg-gray-100">
      {/* Titre + Sous-titre */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
        {section.subtitle && (
          <p className="mt-2 text-gray-600">{section.subtitle}</p>
        )}
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {section.subsections.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}` ||
                `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image_mobile}`
              }
              alt={item.title || `slide-${index}`}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white">
              {item.title && (
                <h3 className="text-xl font-bold">{item.title}</h3>
              )}
              {item.content && <p className="text-sm mt-1">{item.content}</p>}
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {item.button_text}
                </a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
