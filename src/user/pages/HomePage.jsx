// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserProductStore from "../../utils/stores/userProductStore";
import CategorySection from "../components/CategorySection";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

// Hero slides with real images (Unsplash free high-res e-commerce photos)
const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80",
    title: "Big Fashion Sale",
    subtitle: "Up to 70% OFF on Premium Brands",
    cta: "Shop Fashion",
    link: "/shop?category=fashion"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607082349566-187342771e51?w=1920&q=80",
    title: "Latest Gadgets",
    subtitle: "New Arrivals in Electronics & Smartphones",
    cta: "Explore Tech",
    link: "/shop?category=electronics"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618221195710-dd2dabb60b29?w=1920&q=80",
    title: "Home Makeover",
    subtitle: "Furniture, Decor & Kitchen Essentials – 50% OFF",
    cta: "Shop Home",
    link: "/shop?category=home"
  }
];

const HomePage = () => {
  const { fetchHomeProducts, homeProducts, loading } = useUserProductStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchHomeProducts();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-[400px] lg:h-[600px] bg-gray-200 animate-pulse" />
        <div className="container mx-auto px-4 py-12 space-y-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-6">
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="space-y-3">
                    <div className="aspect-[3/4] bg-gray-200 rounded-xl animate-pulse" />
                    <div className="h-5 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel - DaisyUI */}
      <div className="carousel w-full h-[400px] lg:h-[600px]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
          >
            {/* Background Image */}
            <img
              src={slide.image}
              className="w-full h-full object-cover brightness-75"
              alt={slide.title}
            />

            {/* Overlay Content */}
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

            {/* Navigation Arrows */}
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

      {/* Trust Badges */}
      <section className="bg-white py-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="text-blue-600 mb-3" size={40} />
              <h4 className="font-semibold text-lg">Free Shipping</h4>
              <p className="text-sm text-gray-600">Above ₹999</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="text-blue-600 mb-3" size={40} />
              <h4 className="font-semibold text-lg">Secure Payment</h4>
              <p className="text-sm text-gray-600">100% Encrypted</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="text-blue-600 mb-3" size={40} />
              <h4 className="font-semibold text-lg">Easy Returns</h4>
              <p className="text-sm text-gray-600">7 Days Policy</p>
            </div>
            <div className="flex flex-col items-center">
              <Headphones className="text-blue-600 mb-3" size={40} />
              <h4 className="font-semibold text-lg">24/7 Support</h4>
              <p className="text-sm text-gray-600">Instant Help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <div className="container mx-auto px-4 py-12 lg:py-16 space-y-16 lg:space-y-24">
        {homeProducts.map((category) => (
          <CategorySection key={category.categoryId} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;