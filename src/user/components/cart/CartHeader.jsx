import { ShoppingCart } from 'lucide-react'
import React from 'react'

const CartHeader = ({cart}) => {
  return (
     <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-8">
  <div className="flex items-start sm:items-center justify-between gap-2">
    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
      <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 shrink-0">
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </div>

      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold truncate">
          Shopping Cart
        </h1>

        <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1">
          {cart.totalItems} item{cart.totalItems !== 1 && "s"} ready for
          checkout
        </p>
      </div>
    </div>

    {/* Right */}
    <div className="text-right shrink-0">
      <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400">
        Total
      </p>

      <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
        ₹{Number(cart.finalTotal).toLocaleString("en-IN")}
      </p>
    </div>
  </div>
</div>
  )
}

export default CartHeader