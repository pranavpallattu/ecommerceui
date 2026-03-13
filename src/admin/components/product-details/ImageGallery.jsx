// src/components/product-details/ImageGallery.jsx
export default function ImageGallery({ product, selectedImage, setSelectedImage }) {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg border border-gray-200 aspect-square">
        <img
          src={
            product.productImage?.[selectedImage] ||
            product.productImage?.[0] ||
            "https://via.placeholder.com/800"
          }
          alt={product.productName}
          className="w-full h-full object-contain p-6 sm:p-8 md:p-10 lg:p-16 transition-transform duration-500 hover:scale-105"
        />
      </div>

      {product.productImage?.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
          {product.productImage.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                selectedImage === i
                  ? "border-primary shadow-md ring-2 ring-primary/30"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}