import React, { useEffect, useState } from 'react'
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
  const { getAllProducts, getAllCategories } = useProduct();

  const [products, setProducts] = useState()
  const [categoryProducts, setCategoryProducts] = useState([])
  const [categories, setCategories] = useState()

  useEffect(() => {
    getData()
    getCategory()
  }, [])

  const getCategory = async () => {
    const newCategory = await getAllCategories()
    setCategories(newCategory)
    //console.log('newCategory',newCategory)
  }


  const getData = async () => {
    const data = await getAllProducts()
    setProducts(data)
    setCategoryProducts(0)
    //console.log('hasssaaann',data)
  }
  //console.log('home',products)


  const category = async (c) => {
    console.log('gelen', c)
    const productsOfCategory = await products && products.filter(product => product.category?.name === c)
    setCategoryProducts(productsOfCategory)
  }
  console.log('yunus', categoryProducts)
  return (
    <Layout>
      <div className='container'>
        {
          console.log('homeLogin', loginSuccess)
        }
        <Container maxWidth="lg" sx={{ marginTop: 2.5 }}>
          <Box sx={{ bgcolor: '#F2F2F2', height: '100vh' }} >
            <div className='imgContainer'>
              <HomeImg />
              <div className='categoryContainer'>
                <div className={'category'} onClick={() => { getData() }}
                  >
                    Hepsi
                  </div>
                {
                  categories && categories.map((item, index) =>
                    <div className={'category' } key={index} onClick={() => { category(item.name)}} >{item.name}</div>
                  )
                }
                <div className='category' onClick={() => { category('Diğer')}}  >Diğer</div>
              </div>
            </div>

            <Grid container spacing={2}

            >
              {
                categoryProducts.length >= 0 ?
                  categoryProducts && categoryProducts.map((item, index) =>
                    <ProductCard item={item} key={index} />
                  )
                  :
                  products && products.map((item, index) =>
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