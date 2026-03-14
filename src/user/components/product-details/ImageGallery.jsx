// src/components/product-details/ImageGallery.jsx
export default function ImageGallery({
  images,
  selectedImage,
  setSelectedImage,
  discountPercent,
  inStock,
}) {
  return (
    <div className="space-y-6 order-2 lg:order-1">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200">
        <img
          src={images?.[selectedImage] || images?.[0] || "https://via.placeholder.com/800"}
          alt="Product"
          className="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
        />
        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
            {discountPercent}% OFF
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-4xl font-bold tracking-wider">OUT OF STOCK</span>
          </div>
        )}
      </div>

      {images?.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                selectedImage === i ? "border-blue-600 shadow-lg ring-2 ring-blue-200" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-contain p-2 bg-white" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}