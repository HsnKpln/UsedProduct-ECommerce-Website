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
  const { getAllProducts} = useProduct();

  const [products,setProducts] = useState()
  const [categoryProducts,setCategoryProducts] = useState([])

  useEffect(()=>{
    getData()
 },[])

  // useEffect(()=> {
  //   console.log(categoryProducts);
  // })
  

  const getData = async () =>{
   const data = await getAllProducts()
   setProducts(data)
   setCategoryProducts(0)
   console.log('hasssaaann',data)
  }
  console.log('home',products)

  const deneme = async (c) =>{
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
                <div className='category'  onClick={getData}>Hepsi</div>
                <div className='category' onClick={()=>deneme('Pantolon')}  >Pantolon</div>
                <div className='category' >Gömlek</div>
                <div className='category' onClick={()=>deneme('Tişört')}>Tişört</div>
                <div className='category' >Pantolon</div>
                <div className='category' >Şort</div>
                <div className='category' >Sweatshirt</div>
                <div className='category' >Kazak</div>
                <div className='category' >Polar</div>
                <div className='category' >Mont</div>
                <div className='category' >Abiye</div>
                <div className='category' >Ayakkabı</div>
                <div className='category' >Aksesuar</div>
                <div className='category' >Çanta</div>
                <div className='category' >Diğer</div>
              </div>
            </div>

            <Grid container spacing={2}
             
            >
              {
                categoryProducts.length >0  ?
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