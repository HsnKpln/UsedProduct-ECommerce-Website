import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomizedDialogs from '../components/Dialog'
import Layout from '../components/Layout'
import { useProduct } from '../contexts/ProductContext'
import '../styles/detailPage.css'
import { Formik } from 'formik'
import { OfferModalSchema } from '../constants/yup/yupSchema'
import axios, { URL } from '../constants/api/axios'
import { useCallback } from 'react'

function DetailsPage() {
  const { singleProduct, setSingleProduct, getProducts } = useProduct()
  // Id of product taken from url via useParams
  const { id } = useParams()

  const [givenOffer, setGivenOffer] = useState()
  const [userOffers, setUserOffer] = useState(null)
  // user information got from localstroge
  const user = JSON.parse(localStorage.getItem('userProfile'))


  const handleGetOffers = useCallback(async () => {
    try {
      const res = await axios.get(`https://bootcamp.akbolat.net/offers?users_permissions_user=${user.id}`)
      if (res.statusText === 'OK') {
        setUserOffer(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [user.id]);

  const UrunID = id
  useEffect(() => {
    getProducts(UrunID);
    handleGetOffers();
  }, [])


  const myOffer = userOffers?.filter((item) => item?.product?.id === singleProduct?.[0]?.id)

   //console.log('myOffer in detail',myOffer?.[0]?.id)
   //console.log('myOffer in detail22',myOffer)
  //console.log('myOffer in detail2', user.id, singleProduct)

  const withdrawOffer = async (myOfferId) => {
    await axios.delete(`https://bootcamp.akbolat.net/offers/${myOfferId}`)
      .then((response) => {
        console.log('teklif silme basarılı', response)
        console.log('teklif silme gerçekleşti',response.data)
      })
      .catch((error) => {
        console.log('An error occured', error.response)
      });
  }

  // Offer sent via axios put method when submitted offer by user
  const offerSubmit = async (e) => {
    // Assigned to the variable so that the offer from the user can be more easily understood.
    const offer = e;
    try {
      await axios
        .post(URL.offers, {
          product: singleProduct[0].id.toString(),
          users_permissions_user: user.id.toString(),
          offerPrice: Number(offer),
          isStatus: true,
          published_at: singleProduct[0].published_at,
          created_by: user.id.toString(),
          updated_by: ""

        })

        .then((response) => {
          console.log('well done')
          console.log('User Profile', response)
          setGivenOffer(offer)

        })
        .catch((error) => {
          console.log('HERE THE ERROR', error)
          console.log('An error occured', error.response)
        });
    } catch (err) {
      console.log('An err', err.response)
    }

  }

  // Purchase request sent via axios put method when submitted purchase by user
  const pay = async (x) => {
    await axios.put(URL.products + '/' + x.id, {
      name: x.name,
      isOfferable: false,
      isSold: true
    }).then((response) => {
      console.log('odeme basarılı', response)

      const exArray = [...singleProduct]
      exArray[0].isSold = true;
      setSingleProduct(exArray)
    })
      .catch((error) => {
        console.log('An error occured', error.response)
      });
  }

  return (
    <Layout>
      <Container maxWidth="lg"
        sx={{
          marginTop: 2.5,
          display: 'flex',
          height: '71.2vh',
        }}
      >
        {
          singleProduct && singleProduct.map((prd, index) =>
            < React.Fragment key={index} >
              <Box
                sx={{
                  width: '50%',
                  height: '71.2vh',
                  backgroundColor: '#fff',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px'
                }}
              >
                <img
                  src={prd.image != null ? `https://bootcamp.akbolat.net${prd.image.formats.thumbnail.url}`
                    : 'https://www.klasiksanatlar.com/img/sayfalar/b/1_1598452306_resim.png'}
                  alt=''
                  className='detailImg'
                />

              </Box>
              <Box
                sx={{
                  width: '50%',
                  height: '71.2',
                  backgroundColor: '#fff',
                  padding: '2%',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px'
                }}
              >
                <div className='productName'>{prd.name}</div>
                <div className='commonContainer'>
                  <div className='commonTitle'>Marka:</div>
                  <div className='commonDescription'>{prd.brand}</div>
                </div>
                <div className='commonContainer'>
                  <div className='commonTitle'>Renk:</div>
                  <div className='commonDescription'>{prd.color}</div>
                </div>
                <div className='commonContainer'>
                  <div className='commonTitle'>Kullanım Durumu:</div>
                  <div className='commonDescription'>{prd.status}</div>
                </div>
                <div className='price'>{prd.price}  TL</div>
                {
                  myOffer && myOffer.length > 0 ?

                    (givenOffer ? <div className='givenOfferContainer'>
                      <p className='givenOfferTitle'>verilen teklif:
                        <p className='givenOfferPrice'>{givenOffer} TL</p>
                      </p>
                    </div>
                      :
                      <div className='givenOfferContainer'>
                        <div className='givenOfferTitle'>verilen teklif:</div>
                        <div className='givenOfferPrice'> {myOffer && myOffer[0].offerPrice} TL</div>
                      </div>)
                    : ""
                }
                {
                  prd.isSold ?
                    <div className='notOnSale'>Bu ürün Satışta Değil</div>
                    :
                    <div className='modalContainer'>
                      <CustomizedDialogs buttonName={"Satın Al"} buttonWidth={'225px'} buttonPadding={'10px'} buttonColor={'#fff'} buttonBg={'#4B9CE2'} title={'Satın Al'}
                        pay={pay} prd={prd}
                      >
                        <div className='summitBuyText'>Satın almak istiyor musunuz?</div>
                      </CustomizedDialogs>
                      {
                        givenOffer || (myOffer && myOffer.length > 0) ?
                          <CustomizedDialogs
                            buttonName={"Teklifi geri çek"} buttonWidth={'225px'} buttonPadding={'10px'} buttonColor={'#4B9CE2'} buttonBg={'#F0F8FF'} title={'Teklifi Geri Çek'}
                            withdrawOffer={withdrawOffer} myOffer={myOffer[0]?.id}
                          >
                            <div className='withdrawText'>Teklifi geri çekmek istiyor musunuz?</div>
                          </CustomizedDialogs> :
                          <CustomizedDialogs
                            buttonName={"Teklif ver"} buttonWidth={'225px'} buttonPadding={'10px'} buttonColor={'#4B9CE2'} buttonBg={'#F0F8FF'} title={'Teklif Ver'}
                          >
                            <div className='sumInfoContainer'>
                              <div className='sumInfo'>
                                <img
                                  src={prd.image != null ? `https://bootcamp.akbolat.net${prd.image.formats.thumbnail.url}`
                                    : 'https://www.klasiksanatlar.com/img/sayfalar/b/1_1598452306_resim.png'}
                                  alt=''
                                  className='sumInfoImg'
                                />
                                <div className='sumInfoName'>{prd.name}</div>
                              </div>
                              <div className='sumInfoPrice'>{prd.price} TL</div>
                            </div>
                            <Formik
                              initialValues={{ offer: '' }}
                              onSubmit={(values, actions) => {
                                console.log('sumbit edildi', values)
                                offerSubmit(values.offer)
                              }}
                              validationSchema={OfferModalSchema}
                            >
                              {
                                ({ values, handleChange, handleBlur, errors, handleSubmit, touched, resetForm }) =>
                                  <form onSubmit={handleSubmit}>
                                    <div className='inputBlock'>
                                      <div className='inputContainer'>
                                        <input type="radio" name='offer'
                                          value={prd.price * 0.30} onChange={handleChange} onBlur={handleBlur}
                                        />
                                        <label>%30 Teklif ver</label>
                                      </div>
                                    </div>
                                    <div className='inputBlock'>
                                      <div className='inputContainer'>
                                        <input type="radio" name='offer'
                                          value={prd.price * 0.40} onChange={handleChange} onBlur={handleBlur}
                                        />
                                        <label>%40 Teklif ver</label>
                                      </div>
                                    </div>
                                    <div className='inputBlock'>
                                      <div className=''>
                                        <input type="radio" name='offer'
                                          value={prd.price * 0.50} onChange={handleChange} onBlur={handleBlur}
                                        />
                                        <label>%50 Teklif ver</label>
                                      </div>
                                    </div>
                                    <div className='inputBlock'>
                                      <input type="text" name='offer' placeholder='Teklif giriniz'
                                        value={values.offer} onChange={handleChange} onBlur={handleBlur}
                                        className='offerInput'
                                      />
                                    </div>
                                    {errors.offer && touched.offer && <span>{errors.offer}</span>}
                                    <div className='offerSubmitBtnContainer'>
                                      <button type='submit' className='offerSubmitBtn' >Onayla</button>
                                    </div>
                                  </form>
                              }
                            </Formik>
                          </CustomizedDialogs>
                      }
                    </div>
                }
                <div className='description'>Açıklama</div>
                <div className='productDescription'>{prd.description} </div>
              </Box>
            </React.Fragment>
          )
        }
      </Container>

    </Layout>
  )
}

export default DetailsPage