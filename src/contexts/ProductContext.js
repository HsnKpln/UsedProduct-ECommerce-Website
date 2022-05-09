import React, { useContext, useState } from "react";
import axios, { URL } from "../constants/api/axios";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [singleProduct,setSingleProduct] = useState()

  // functions are written in Context so that it can be used with other Component when development the project.
  //  Created a function that gets all products.
  const getAllProducts = async () => {

    try {
      const res = await axios.get(URL.products)
      if (res.statusText === 'OK') {
        sessionStorage.setItem('allProducts', JSON.stringify(res.data))
        //console.log('request success',res.data)
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  Created a function that gets all categories.
  const getAllCategories = async () => {

    try {
      const res = await axios.get(URL.categories)
      if (res.statusText === 'OK') {
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  Created a function that gets all brands.
  const getAllBrands = async () => {

    try {
      const res = await axios.get(URL.brands)
      if (res.statusText === 'OK') {
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  Created a function that gets all colors.
  const getAllColors = async () => {

    try {
      const res = await axios.get(URL.colors)
      if (res.statusText === 'OK') {
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  // Created function that get product according to id parameter, which from sessionStrorage
  // Products were added to sessionStorage in order that update when each logout
  const getProducts = async (productId) => {
    
    try {
      const productDetail = JSON.parse(sessionStorage.getItem('allProducts'))
      setSingleProduct(productDetail.filter(item => item.id == productId))
      
    } catch (error) {
      console.log(error,'hata')
    }
  }
  

  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        getProducts,
        singleProduct,
        setSingleProduct,
        getAllCategories,
        getAllBrands,
        getAllColors
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
