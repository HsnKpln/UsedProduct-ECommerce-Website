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

  useEffect(()=>{
    getData()
 },[])

 

  const getData = async () =>{
   const data = await getAllProducts()
   setProducts(data)
  }
  console.log('home',products)
 
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
                <div onClick={getData}>Hepsi</div>
                <div>Pantolon</div>
                <div>Gömlek</div>
                <div>Tişört</div>
                <div>Pantolon</div>
                <div>Şort</div>
                <div>Sweatshirt</div>
                <div>Kazak</div>
                <div>Polar</div>
                <div>Mont</div>
                <div>Abiye</div>
                <div>Ayakkabı</div>
                <div>Aksesuar</div>
                <div>Çanta</div>
                <div>Diğer</div>
              </div>
            </div>

            <Grid container spacing={2}>
              {
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