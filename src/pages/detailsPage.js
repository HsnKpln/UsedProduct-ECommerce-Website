import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../contexts/ProductContext'

function DetailsPage() {
    const {singleProduct,getProducts} = useProduct()
    const {id} = useParams()
    
    useEffect(()=>{
      getProducts(id)
    },[])
    // const [products,setProducts] = useState()
    // const [detailProduct,setDetailProduct] = useState()

    // useEffect(()=>{
    //     getData()
    //   },[])
    
      


    //   const getData = async () =>{
    //     const data = await getAllProducts()
    //     //console.log('accountPage',data)
    //     setProducts(data)
    //     //const selectedProduct= await products && products.filter(product=> product.id == id)
    //     //setDetailProduct(selectedProduct)
    //    }
       
    //    console.log('newProduct',products)
      //console.log('selectedProduct',detailProduct)
      console.log('contexten gelen',singleProduct)
    
  return (
    <>
    <div>DetailPage</div>
    <h1>{id}</h1>
    {/* {
        products && products.filter(product=> product.id == id).map(product => 
        <span>{product.brand}</span>)
    } */}
    {
        singleProduct && singleProduct.map(prd => <>
         <h1>{prd.brand}</h1>
         <div>{prd.id}</div>
         <div>{prd.name}</div>
        </> )
    }
    
    </>
  )
}

export default DetailsPage