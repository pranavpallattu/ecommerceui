import React from 'react'

import { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserProductStore from '../../utils/stores/userProductStore';
import CategorySection from '../components/CategorySection';

const HomePage = () => {
  const { fetchHomeProducts, homeProducts, loading } =
    useUserProductStore();

  useEffect(() => {
    fetchHomeProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-6 space-y-10">
      {homeProducts.map((category) => (
        <CategorySection key={category.categoryId} category={category} />
      ))}
    </div>
  );
};

export default HomePage;
