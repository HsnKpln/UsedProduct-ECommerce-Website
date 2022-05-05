import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout';
import { useUser } from '../contexts/UserContext'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import '../styles/home.css'
import HomeImg from '../components/HomeImg';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/ProductCard';
import { useProduct } from '../contexts/ProductContext';

function Home() {
  const { loginSuccess } = useUser();
  const { getAllProducts,getAllCategories} = useProduct();

  const [products,setProducts] = useState()
  const [categoryProducts,setCategoryProducts] = useState([])
  const [categories,setCategories] = useState()

  useEffect(()=>{
    getData()
    
 },[])
  
 

  const getData = async () =>{
   const data = await getAllProducts()
   setProducts(data)
   setCategoryProducts(0)
   //console.log('hasssaaann',data)
  }
  //console.log('home',products)
  

  const category = async (c) =>{
    // const sessionData = await sessionStorage.getItem('allProducts')
    // setCategoryProducts(JSON.stringify(sessionData))
    // console.log('category',sessionData)
    // categoryProducts && categoryProducts.map(item=>console.log(item))
    console.log('gelen',c)
    const productsOfCategory= await products && products.filter(product=> product.category?.name === c)
    setCategoryProducts(productsOfCategory)
  }
  console.log('yunus',categoryProducts)
  return (
    <Layout>
      <div className='container'>
        {
          console.log('homeLogin', loginSuccess)
        }
        {/* <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
      <p>Home</p> */}
        <Container maxWidth="lg" sx={{ marginTop:2.5 }}>
          <Box sx={{ bgcolor: '#F2F2F2', height: '100vh' }} >
            <div className='imgContainer'>
              <HomeImg />
              <div className='categoryContainer'>
                <div className='category'  onClick={()=>getData()}>Hepsi</div>
                <div className='category' onClick={()=>category('Pantolon')}  >Pantolon</div>
                <div className='category' onClick={()=>category('Gömlek')}>Gömlek</div>
                <div className='category' onClick={()=>category('Tişört')}>Tişört</div>
                <div className='category' onClick={()=>category('Şort')}>Şort</div>
                <div className='category' onClick={()=>category('Sweatshirt')}>Sweatshirt</div>
                <div className='category' onClick={()=>category('Kazak')}>Kazak</div>
                <div className='category' onClick={()=>category('Polar')}>Polar</div>
                <div className='category' onClick={()=>category('Mont')}>Mont</div>
                <div className='category' onClick={()=>category('Abiye')}>Abiye</div>
                <div className='category' onClick={()=>category('Ayakkabı')}>Ayakkabı</div>
                <div className='category' onClick={()=>category('Aksesuar')}>Aksesuar</div>
                <div className='category' onClick={()=>category('Çanta')}>Çanta</div>
                <div className='category' >Diğer</div>
              </div>
            </div>

            <Grid container spacing={2}
             
            >
              {
                categoryProducts.length >= 0  ?
                categoryProducts && categoryProducts.map((item,index)=>
                <ProductCard item={item} key={index} />
                )
                :
                products && products.map((item,index)=>
                <ProductCard item={item} key={index} />
                )
              }
            </Grid>
          </Box>


        </Container>
      </div>
    </Layout>
  )
}

export default Home