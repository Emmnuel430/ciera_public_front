import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
                  className="mt-2 inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
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

export function CarouselYTB({ section }) {
  const extractYoutubeUrl = (html) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = html?.match(regex);
    return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
  };

  const getYoutubeThumbnail = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-8 text-center">
            {section.title}
          </h2>
        )}

        <Swiper
          modules={[Pagination, Autoplay]}
          speed={600}
          loop={true}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper min-h-[320px]"
        >
          {section.subsections.map((sub) => {
            const youtubeUrl = extractYoutubeUrl(sub.content);
            const thumbnail = youtubeUrl
              ? getYoutubeThumbnail(youtubeUrl)
              : null;

            return (
              <SwiperSlide
                key={sub.id}
                className="hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-md flex flex-col h-[280px] overflow-hidden relative">
                  <div className="h-full w-full overflow-hidden">
                    {thumbnail ? (
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={thumbnail}
                          alt={sub.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-md">
                            <i className="fas fa-play text-orange-600 text-xl ml-1"></i>
                          </div>
                        </div>
                      </a>
                    ) : sub.image ? (
                      <div
                        className={`w-full h-full bg-gray-100 flex items-center justify-center text-orange-400 mb-3`}
                      >
                        <i className="fas fa-image fa-lg"></i>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-400">
                        <i className="fas fa-image fa-lg"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="text-md font-semibold text-orange-900">
                      {sub.title}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-pagination mt-6"></div>
      </div>
    </div>
  );
}
