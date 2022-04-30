import React, { useContext, useState } from "react";
import axios, { URL } from "../constants/api/axios";

const ProductContext = React.createContext();

const ProductProvider = ({children}) =>{

    const getAllProducts = async ()=>{
      const sessionData =  sessionStorage.getItem(JSON.parse('allProducts'))
      if(sessionData){
        console.log('istek atılmadı')
        return sessionData
      }
      else{
        try {
          const res = await axios.get(URL.products)
          if(res.statusText === 'OK'){
            sessionStorage.setItem('allProducts',JSON.stringify(res.data))
            console.log('istek atıldı')
            return res.data
          }
      } catch (error) {
          console.log(error)
      }
    }
      }
     

    return(
        <ProductContext.Provider
         value={{
            getAllProducts
          }}
        >
            {children}
        </ProductContext.Provider>
    )
}

function useProduct(){
    return useContext(ProductContext);
}
export  {ProductContext,useProduct,ProductProvider}
