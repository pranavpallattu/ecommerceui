import { create } from "zustand";
import { getHomeProductsApi, getProductDetailsApi, searchProductsApi } from "../../services/allApis";



const useUserProductStore=create((set,get)=>({

    homeProducts:[],
    loading:false,
    error:null,
    productDetails:null,
    relatedProducts:[],
    searchResults:[],


    fetchHomeProducts:async()=>{
        set({loading:true,error:null})
        try{
            const res=await getHomeProductsApi()
            set({homeProducts:res.data.data})
        }
        catch(error){
            console.error(error.message)
        }
    },

    fetchProductDetails:async(id)=>{
        set({loading:true,error:null})

        try{
            const res=await getProductDetailsApi(id)
            set({productDetails:res.data?.data?.products, relatedProducts:res.data?.data?.relatedProducts})
        }
        catch(error){
            console.error(error.message)
        }

    },

    searchProducts:async(searchQuery)=>{
                set({loading:true,error:null})
        try{

            const res=await searchProductsApi(searchQuery)
            set({searchResults:res.data?.data})

        }
         catch(error){
            console.error(error.message)
        }

    }

}))

export default useUserProductStore