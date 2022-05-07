import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import MyAccountIcon from '../components/MyAccountIcon'
import axios from '../constants/api/axios'
import  '../styles/myAccountPage.css'

function MyAccountPage() {

  const [products, setProducts] = useState()
  const [myProducts, setMyProducts] = useState()

  const user = JSON.parse(localStorage.getItem('userProfile'))
  useEffect(() => {
    const productsLocal = JSON.parse(sessionStorage.getItem('allProducts'))
    setProducts(productsLocal)
    getMyProducts()
    getGiveProducts()
  }, [])

  const getMyProducts = async () => {

    try {
      const res = await axios.get(`https://bootcamp.akbolat.net/products?users_permissions_user=${user.id}`)
      if (res.statusText === 'OK') {
        const offeredProduct = res.data && res.data.filter(item => item.offers.length > 0)
        setMyProducts(offeredProduct)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getGiveProducts = async () => {

    try {
      const res = await axios.get(`https://bootcamp.akbolat.net/offers?users_permissions_user=${user.id}`)
      if (res.statusText === 'OK') {
        console.log('tekliflerim2',res.data)
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log('myProducts istegi atıldı3', myProducts)
  return (
    <Layout>
      <Container >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          marginTop: '20px',
          marginBottom: '10px',
          padding: '1.5vh 1%',
          borderRadius: '8px'
        }}>
          <MyAccountIcon />
          <Typography sx={{
            font: 'normal normal bold 15px/20px Nunito',
            color: '#525252',
            marginLeft: '1%'
          }}
          >{user.email}</Typography>
        </Box>
        <Box sx={{
          backgroundColor: '#fff',
          padding: '1.5vh 1%',
          borderRadius: '8px'
        }}>
          {
            myProducts && myProducts.map((myProduct,index) =>
              <React.Fragment key={index} >
                <div>{myProduct.offers.map((item,index) =>
                  <div className='offeredProductContainer' key={index}>
                    <div className='offeredProductImgContainer'>
                      <img
                        src={myProduct.image != null ? `https://bootcamp.akbolat.net${myProduct.image.formats.thumbnail.url}`
                          : 'https://www.klasiksanatlar.com/img/sayfalar/b/1_1598452306_resim.png'}
                        alt=''
                        className='myOfferedProductImg'
                      />
                      <div className='offerAndName'>
                        <div className='myOfferedProductName'>{myProduct.name}</div>
                        <div className='myProductOfferedPrice'> verilen teklif: <span>{item.offerPrice}</span>  </div>
                      </div>
                      
                    </div>
                    <div className='offeredProductBtnContainer'>
                        <button className='submitBtn'>Onayla</button>
                        <button className='rejectBtn'>Reddet</button>
                      </div>
                  </div>
                )}</div>
              </React.Fragment>
            )
          }
        </Box>
      </Container>
    </Layout>

  )
}

export default MyAccountPage