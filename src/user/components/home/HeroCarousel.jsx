// src/components/home/HeroCarousel.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../../../utils/stores/heroSlides";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel w-full h-[400px] lg:h-[600px]">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide${index + 1}`}
          className="carousel-item relative w-full"
        >
          <img
            src={slide.image}
            className="w-full h-full object-cover brightness-75"
            alt={slide.title}
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center text-white px-6 max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl lg:text-3xl mb-8 md:mb-10 font-light drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="btn btn-primary btn-lg px-10 md:px-14 text-lg uppercase tracking-wider shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition duration-300"
              >
                {slide.cta}
              </Link>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${index === 0 ? heroSlides.length : index}`}
              className="btn btn-circle btn-outline text-white border-2 border-white/50 hover:bg-white/20"
            >
              ❮
            </a>
            <a
              href={`#slide${index === heroSlides.length - 1 ? 1 : index + 2}`}
              className="btn btn-circle btn-outline text-white border-2 border-white/50 hover:bg-white/20"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}