import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CustomizedDialogs from '../components/Dialog'
import Layout from '../components/Layout'
import MyAccountIcon from '../components/MyAccountIcon'
import axios from '../constants/api/axios'
import '../styles/myAccountPage.css'

function MyAccountPage() {
  
  const [myProducts, setMyProducts] = useState()
  const [giveProducts, setGiveProducts] = useState()
  const [checkedBtn, setCheckedBtn] = useState(false)
  const [controlBuyStatus, setControlBuyStatus] = useState(false)

  const user = JSON.parse(localStorage.getItem('userProfile'))
  useEffect(() => {
    getMyProducts()
    getGiveProducts()
  }, [])

  // get my products from api via axios
  const getMyProducts = async () => {
    try {
      const res = await axios.get(`https://bootcamp.akbolat.net/products?users_permissions_user=${user.id}`)
      if (res.statusText === 'OK') {
        const offeredProduct = res.data && res.data.filter(item => item.offers.length > 0)
        console.log('bana aittt',res.data,user.id)

        setMyProducts(offeredProduct)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Products which given offer by me
  const getGiveProducts = async () => {
    try {
      const res = await axios.get(`https://bootcamp.akbolat.net/offers?users_permissions_user=${user.id}`)
      if (res.statusText === 'OK') {
        setGiveProducts(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //The function that makes the purchase when the given offer is approved.
  const submitOffer = async (offeredId) => {
    await axios.put(`https://bootcamp.akbolat.net/products/${offeredId}`, {
      isOfferable: false,
      isSold: true  
    }).then((response) => {
      setControlBuyStatus(true)
    })
      .catch((error) => {
        console.log('An error occured', error.response)
      });
    
  }

  // This function approve the offer for my product
  const submitTakenOffer = async (id) =>{
      try {
      const res = await axios.put(`https://bootcamp.akbolat.net/offers/${id}`, {
        isStatus: true
    })
    if (res.statusText === 'OK') {
      console.log('güncelleme onaylandı kontrol',res.data)
    }
    } catch (error) {
      console.log(error)
      
    }
  }

  // This function reject the offer for my product
  const rejectTakenOffer = async (id) =>{
    try {
    const res = await axios.put(`https://bootcamp.akbolat.net/offers/${id}`, {
      isStatus: false
  })
  if (res.statusText === 'OK') {
    console.log('güncelleme reddedildi kontrol',res.data)
  }
  } catch (error) {
    console.log(error)
  }
}
  console.log('myProducts istegi atıldı4', myProducts)
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
          <Box sx={{
            display: 'flex',
            marginBottom: '2.2vh'
          }}>
            <button className={'offeredBtn', checkedBtn ? 'offeredBtn' : 'checkedBtn'} onClick={() => setCheckedBtn(false)}>Teklif aldıklarım</button>
            <button className={'offeredBtn', checkedBtn ? 'checkedBtn' : 'offeredBtn'} onClick={() => setCheckedBtn(true)}>Teklif verdiklerim</button>
          </Box>
          {
            checkedBtn ?

              giveProducts && giveProducts.map((giveProduct, index) =>
                giveProduct.product != null ?
                  <React.Fragment key={index} >
                    <div className='offeredProductContainer' key={index}>
                      <div className='offeredProductImgContainer'>
                        <img
                          src={giveProduct?.product?.image != null ? `https://bootcamp.akbolat.net${giveProduct.product.image.formats.thumbnail.url}`
                            : 'https://www.klasiksanatlar.com/img/sayfalar/b/1_1598452306_resim.png'}
                          alt=''
                          className='myOfferedProductImg'
                        />
                        <div className='offerAndName'>
                          <div className='myOfferedProductName'>{giveProduct?.product?.name}</div>
                          <div className='myProductOfferedPrice'> verilen teklif: <span>{giveProduct.offerPrice}</span> </div>
                        </div>

                      </div>
                      <div className='offeredProductBtnContainer'>
                      {
                          giveProduct?.isStatus ? 
                          <>
                          {
                            giveProduct?.product?.isOfferable ==false && giveProduct?.product?.isSold == true ?
                            <div className='bought'>Satın alındı</div>
                            :
                            <>
                              <CustomizedDialogs buttonName={"Satın Al"} buttonColor={'#fff'} buttonWidth={'100px'} buttonPadding={'2px'} buttonBg={'#4B9CE2'} title={'Satın Al'}
                       submitOffer={submitOffer} offeredId={giveProduct?.product?.id}>
                         <div className='summitBuyText'>Satın almak istiyor musunuz?</div>
                       </CustomizedDialogs>
                          <div className='submittedText'>Onaylandı</div>
                            </>
                          }
                          
                          </>
                          :
                        <div className='rejectedText'>Reddededildi</div>
                        }
                      </div>
                    </div>
                  </React.Fragment>
                  : ""
              )

              :

              myProducts && myProducts.map((myProduct, index) =>
                <React.Fragment key={index} >
                  <div>{myProduct.offers.map((item, index) =>
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
                          <div className='myProductOfferedPrice'> Alınan teklif: <span>{item.offerPrice}</span>  </div>
                        </div>

                      </div>
                      <div className='offeredProductBtnContainer'>
                        {
                          item.isStatus == null ?
                          <>
                            <button className='submitBtn' onClick={()=>submitTakenOffer(item.id)}>Onayla</button>
                            <button className='rejectBtn' onClick={()=>rejectTakenOffer(item.id)}>Reddet</button>
                          </>
                          :
                          <>
                             {
                               item.isStatus == true ?
                               <div className='takenOfferSubmitText'>Onaylandı</div>
                               :
                               ""
                             }
                             {
                               item.isStatus == false ?
                               <div className='takenOfferRejectText'>reddedildi</div>
                               :
                               ""
                             }
                          </>
                        }
                        
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