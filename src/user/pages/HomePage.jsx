// src/pages/HomePage.jsx
import { useEffect } from "react";
import useUserProductStore from "../../utils/stores/userProductStore";

import HeroCarousel from "../components/home/HeroCarousel";
import TrustBadges from "../components/home/TrustBadges";
import CategorySection from "../components/home/CategorySection";

export default function HomePage() {
  const { fetchHomeProducts, homeProducts, loading } = useUserProductStore();

  useEffect(() => {
    fetchHomeProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-[500px] lg:h-[700px] bg-gray-200 animate-pulse" />
        <div className="container mx-auto px-4 py-16 space-y-20">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-8">
              <div className="h-12 w-80 bg-gray-200 rounded animate-pulse mx-auto" />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="space-y-4">
                    <div className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mx-auto" />
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
      <HeroCarousel />

      <TrustBadges />

      <div className="container mx-auto px-4 py-16 lg:py-20 space-y-20 lg:space-y-28">
        {homeProducts.map((category) => (
          <CategorySection key={category.categoryId} category={category} />
        ))}
      </div>
    </div>
  );
}