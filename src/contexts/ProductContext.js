import React, { useContext, useState } from "react";
import axios, { URL } from "../constants/api/axios";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [singleProduct,setSingleProduct] = useState()

  const getAllProducts = async () => {
      //  const sessionData =  sessionStorage.getItem('allProducts')
      // if(sessionData != null){
      //   console.log('xxxxxxxxxxxxxxxxxxx')
      //   return sessionData
      // }
      // else{
   
      // }

    try {
      const res = await axios.get(URL.products)
      if (res.statusText === 'OK') {
        sessionStorage.setItem('allProducts', JSON.stringify(res.data))
        console.log('istek atıldı',res.data)
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProducts = async (productId) => {
    
    try {
      // const res = await axios.get(URL.products)
      // if (res.statusText === 'OK') {
      //   sessionStorage.setItem('allProducts', JSON.stringify(res.data))
      //   console.log('istek atıldı',res.data)
      //   return res.data
      // }
      const productDetail = JSON.parse(sessionStorage.getItem('allProducts'))
      //console.log('deneme yeri',productDetail)
      
      setSingleProduct(productDetail.filter(item => item.id == productId))
      
      console.log('ynusssss',singleProduct)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        getProducts,
        singleProduct,
        setSingleProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

function useProduct() {
  return useContext(ProductContext);
}
export { ProductContext, useProduct, ProductProvider }
