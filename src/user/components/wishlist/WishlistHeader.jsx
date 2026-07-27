import React from 'react'

const WishlistHeader = ({wishlistProducts}) => {
  return (
    <div>
          <div className="flex items-start justify-between gap-4">
    {/* Left */}
    <div className="flex-1 min-w-0">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">
        Your Collection
      </p>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
        Wishlist
      </h1>

      <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1 sm:mt-2">
        Save products you love and move them to your cart anytime.
      </p>
    </div>

    {/* Right */}
    <div className="bg-base-100 border rounded-2xl px-3 py-2 sm:px-5 sm:py-4 text-center shrink-0">
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
        {wishlistProducts?.length}
      </p>

      <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 whitespace-nowrap">
        Saved Items
      </p>
    </div>
  </div>
    </div>
  )
}

export default WishlistHeader