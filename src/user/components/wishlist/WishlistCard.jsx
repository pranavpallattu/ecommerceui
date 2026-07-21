import { X, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../../../utils/stores/user/useCartStore";

const WishlistCard = ({ product, onRemove, onAddToCart }) => {
  const { cartProducts } = useCartStore();
  const alreadyInCart = cartProducts?.items?.some(
    (item) => item.product._id == product._id,
  );

  const inStock = product.quantity > 0;

  const discount =
    product.regularPrice > product.salePrice
      ? Math.round(
          ((product.regularPrice - product.salePrice) / product.regularPrice) *
            100,
        )
      : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100">
      {/* Responsive Layout */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
        {/* Image */}
        <div className="w-full sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
          <Link to={`/product/${product?._id}`}>
            <img
              src={
                product.productImage?.[0]?.imageUrl || "https://via.placeholder.com/200"
              }
              alt={product.productName}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <h3 className="text-lg sm:text-xl font-medium">
            {product.productName}
          </h3>

          <div className="flex items-baseline gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="text-xl font-bold">₹{product.salePrice}</span>
            {discount > 0 && (
              <>
                {product.regularPrice > product.salePrice && (
                  <span className="text-sm sm:text-lg text-gray-500 line-through">
                    ₹{product.regularPrice}
                  </span>
                )}

                <span className="badge badge-success badge-sm">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <span
            className={`badge badge-outline ${
              inStock ? "badge-success" : "badge-error"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {alreadyInCart ? (
            <Link to={"/cart"} className="w-full sm:w-auto">
              <button
                disabled={!inStock}
                className="btn btn-primary rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-40 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                <span>Go to Cart</span>
              </button>
            </Link>
          ) : (
            <button
              onClick={onAddToCart}
              disabled={!inStock}
              className="btn btn-primary rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-40 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          )}

          <button
            onClick={onRemove}
            className="btn btn-error text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;

// import { ShoppingCart, Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";
// import useCartStore from "../../../utils/stores/CartStore";

// const WishlistCard = ({ product, onRemove, onAddToCart }) => {
//   const { cartProducts } = useCartStore();

//   const alreadyInCart = cartProducts?.items?.some(
//     (item) => item.product._id === product._id
//   );

//   const inStock = product.quantity > 0;

//   const discount =
//     product.regularPrice > product.salePrice
//       ? Math.round(
//           ((product.regularPrice - product.salePrice) /
//             product.regularPrice) *
//             100
//         )
//       : 0;

//   return (
//     <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5">
//       <div className="flex flex-col sm:flex-row gap-5">

//         <Link
//           to={`/product/${product._id}`}
//           className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-base-200 shrink-0"
//         >
//           <img
//             src={product.productImage?.[0]}
//             alt={product.productName}
//             className="w-full h-full object-cover"
//           />
//         </Link>

//         <div className="flex-1 flex flex-col justify-between">

//           <div>
//             <div className="flex justify-between items-start gap-4">

//               <Link
//                 to={`/product/${product._id}`}
//                 className="hover:text-primary"
//               >
//                 <h3 className="text-lg font-semibold line-clamp-2">
//                   {product.productName}
//                 </h3>
//               </Link>

//               <button
//                 onClick={onRemove}
//                 className="btn btn-ghost btn-circle btn-sm hover:bg-red-50 hover:text-red-600"
//               >
//                 <Trash2 size={18} />
//               </button>

//             </div>

//             <div className="flex items-center gap-2 mt-2 flex-wrap">
//               <span className="text-2xl font-bold">
//                 ₹{Number(product.salePrice).toLocaleString("en-IN")}
//               </span>

//               {discount > 0 && (
//                 <>
//                   <span className="text-gray-400 line-through text-sm">
//                     ₹{Number(product.regularPrice).toLocaleString("en-IN")}
//                   </span>

//                   <span className="badge badge-success badge-sm">
//                     {discount}% OFF
//                   </span>
//                 </>
//               )}
//             </div>

//             <span
//               className={`badge badge-outline mt-3 ${
//                 inStock ? "badge-success" : "badge-error"
//               }`}
//             >
//               {inStock ? "In Stock" : "Out of Stock"}
//             </span>
//           </div>

//           <div className="flex justify-end mt-5">
//             {alreadyInCart ? (
//               <Link to="/cart">
//                 <button className="btn btn-primary gap-2">
//                   <ShoppingCart size={18} />
//                   Go to Cart
//                 </button>
//               </Link>
//             ) : (
//               <button
//                 onClick={onAddToCart}
//                 disabled={!inStock}
//                 className="btn btn-primary gap-2"
//               >
//                 <ShoppingCart size={18} />
//                 Add to Cart
//               </button>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistCard;
