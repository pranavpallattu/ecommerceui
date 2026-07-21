import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../../../utils/helpers/heroSlides";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel w-full h-[380px] md:h-[520px] lg:h-[620px] relative">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide${index + 1}`}
          className="carousel-item relative w-full h-full"
        >
          {/* Background Image */}
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />

          {/* Softer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

          {/* Content - Centered & Clean */}
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-8 font-light drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="btn btn-primary btn-lg px-10 md:px-14 py-3 text-base md:text-lg font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Navigation Arrows - Bottom Center (Modern Look) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
            <a
              href={`#slide${index === 0 ? heroSlides.length : index}`}
              className="btn btn-circle btn-sm btn-outline text-white border-white/60 hover:bg-white/20 transition-all"
            >
              ❮
            </a>
            <a
              href={`#slide${index === heroSlides.length - 1 ? 1 : index + 2}`}
              className="btn btn-circle btn-sm btn-outline text-white border-white/60 hover:bg-white/20 transition-all"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
