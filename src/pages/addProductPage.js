import { Container } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import Layout from '../components/Layout'
import { OfferModalSchema } from '../constants/yup/yupSchema'
import '../styles/addProduct.css'

function AddProductPage() {

    const addProduct = (data) => {
        console.log(data)
    }
    return (
        <Layout>
            <Container sx={{marginTop:2.5}} >
            <Formik
                initialValues={{
                     name: '' ,
                     description: '',
                     category: '',
                     brand: '',
                     color: '',
                     status: '',
                     price: '',
                     offerStatus: '',
                     imgFile: ''

                    }}
                onSubmit={(values, actions) => {
                    console.log('sumbit edildi', values)
                    addProduct(values)
                }}
            >
                {
                    ({ values, handleChange, handleBlur, errors, handleSubmit, touched, resetForm }) =>
                        <form onSubmit={handleSubmit}>
                            <div className='container'>
                                <div className='leftContainer'>
                                    <div className='leftTitle'>Ürün Detayları</div>
                                    <div className='nameContainer'>
                                        <label>Ürün adı</label>
                                        <input type='text' name='name' placeholder='Örnek: Iphone 12 Pro Max'
                                            value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className='descriptionContainer'>
                                        <label>Açıklama</label>
                                        <input type='text' name='description' placeholder='Ürün açıklaması girin'
                                            value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className='categoryAndBrand'>
                                        <div className='category'>
                                            <label>Kategori</label>
                                            <select name='category' placeholder='Kategori seç'
                                                onChange={handleChange} onBlur={handleBlur}>
                                                <option value={'Ayakkabı'}>Ayakkabı</option>
                                                <option value={'Pantolon'}>Pantolon</option>
                                            </select>
                                        </div>
                                        <div className='brand'>
                                            <label>Marka</label>
                                            <select name='brand' placeholder='Marka seç'
                                                onChange={handleChange} onBlur={handleBlur}>
                                                <option value='Mavi'>Mavi</option>
                                                <option value='LTB'>LTB</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='colorAndStatus'>
                                        <div className='color'>
                                            <label>Renk</label>
                                            <select name='color' placeholder='Renk seç'
                                                onChange={handleChange} onBlur={handleBlur}>
                                                <option value='Kırmızı'>Kırmızı</option>
                                                <option value='Beyaz'>beyaz</option>
                                            </select>
                                        </div>
                                        <div className='status'>
                                            <label>Kullanım durumu</label>
                                            <select name='status' placeholder='Kullanım durumu seç'
                                                onChange={handleChange} onBlur={handleBlur}>
                                                <option value='Yeni'>Yeni</option>
                                                <option value='Yeni Gibi'>Yeni Gibi</option>
                                                <option value='Az Kullanılmış'>Az Kullanılmış</option>
                                                <option value='Kullanılmış'>Kullanılmış</option>
                                                <option value='Defolu'>Defolu</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='priceAndOffer'>
                                        <label>Fiyat</label>
                                        <input type='text' name='price' value={values.price} onChange={handleChange} onBlur={handleBlur} />
                                        <div>
                                            <label>Fiyat ve Teklif opsiyonu</label>
                                            <input type='checkbox' name='offerStatus' onChange={handleChange} onBlur={handleBlur}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='rightContainer'>
                                    <div className='rightTitle'>Ürün Resmi</div>
                                    <input type='file' name='imgFile' onChange={handleChange} onBlur={handleBlur} />
                                    <button type='submit'>Kaydet</button>
                                </div>
                            </div>
                        </form>
                }
            </Formik>
        </Container>
        </Layout>
    )
}

export default AddProductPage