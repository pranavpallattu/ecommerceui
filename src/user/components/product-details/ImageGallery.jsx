import { Heart } from "lucide-react";

export default function ImageGallery({
  images,
  selectedImage,
  setSelectedImage,
  discountPercent,
  inStock,
  isInWishlist,
  onWishlistToggle,
}) {
  return (
    <div className="space-y-6 ">
      <div className="space-y-6 order-2 lg:order-1">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <img
            src={
              images?.[selectedImage]?.imageUrl ||
              images?.[0]?.imageUrl ||
              "https://via.placeholder.com/800"
            }
            alt="Product"
            className="h-full w-full object-contain p-10"
          />

          {discountPercent > 0 && (
            <div className="absolute left-5 top-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md">
              {discountPercent}% OFF
            </div>
          )}

          {/* Mobile Wishlist */}
          <button
            onClick={onWishlistToggle}
            className="absolute top-4 right-4 lg:hidden w-11 h-11 rounded-full bg-white/95 shadow-lg border border-gray-200 flex items-center justify-center hover:scale-105 transition"
          >
            <Heart
              size={22}
              className={
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
              }
            />
          </button>

          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
              <span className="rounded-xl bg-black/60 px-6 py-3 text-2xl font-bold tracking-widest text-white">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
      </div>

      {images?.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                selectedImage === i
                  ? "border-blue-600 shadow-lg ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <img
                src={img?.imageUrl}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-contain p-2 bg-white"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
