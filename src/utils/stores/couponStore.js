import { create } from "zustand";
import { devtools } from "zustand/middleware";


const useCouponStore=create(
    devtools((set,get)=>({

    }))
)

export default useCouponStore;