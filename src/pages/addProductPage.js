import { Container } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import axios from '../constants/api/axios'
import { OfferModalSchema } from '../constants/yup/yupSchema'
import { useProduct } from '../contexts/ProductContext'
import '../styles/addProduct.css'
import Switch from '@mui/material/Switch'

function AddProductPage() {
    const {getAllCategories,getAllBrands,getAllColors} = useProduct()

    const [categories,setCategories] = useState()
    const [brands,setBrands] = useState()
    const [colors,setColors] = useState()
    const [controlOfferable,setControlOfferable] = useState(true)

    useEffect(()=>{
        getCategory()
        getBrand()
        getColor()
    },[])

    const getCategory = async ()=>{
        const newCategory = await getAllCategories()
        setCategories(newCategory)
        //console.log('newCategory',newCategory)
      }

    const getBrand = async ()=>{
        const newBrand = await getAllBrands()
        setBrands(newBrand)
        //console.log('newBrand',newBrand)
      }

    const getColor = async ()=>{
        const newColor = await getAllColors()
        setColors(newColor)
        console.log('newColor',newColor)
      }

      console.log('addProduct colors',colors)

    const addProduct = async (data) => {
        const user = JSON.parse(localStorage.getItem('userProfile'))
        if(data.isOfferable[0] !== 'on'){
            setControlOfferable(false)
        }
        console.log('dfsfsf',controlOfferable)
        const formData = new FormData()
        // formData.append('name',data.name)
        // formData.append('description',data.description)
        // formData.append('category',data.category.toString())
        // formData.append('brand',data.brand)
        // formData.append('color',data.color)
        // formData.append('status',data.status)
        // formData.append('price',Number(data.price))
        // formData.append('isOfferable', true)
        // formData.append('isSold', false)
        // formData.append('users_permissions_user', user.id.toString())
        // formData.append('image', data.imgFile)
        let appendData = {
            name: data.name,
            description: data.description,
            category: data.category.toString(),
            brand: data.brand,
            color:data.color,
            status: data.status,
            price: Number(data.price),
            isOfferable: controlOfferable,
            isSold: false,
            users_permissions_user: user.id.toString()
        }
        let jsonData = JSON.stringify(appendData)
        formData.append('data',jsonData)
        formData.append('files.image', data.imgFile)
        
        console.log('formdata',formData.getAll('data'))

        // try {
        //     await axios
        //       .post('https://bootcamp.akbolat.net/products', formData)
        //       .then((response) => {
        //         console.log('well done',response)
        //       })
        //       .catch((error) => {
        //         console.log('An error occured', error.response)
        //       });
        //   } catch (err) {
        //     console.log('An err', err.response)
        //   }
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
                     isOfferable: '',
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
                                    <div className='leftTitle title'>Ürün Detayları</div>
                                    <div className='nameContainer'>
                                        <label className='markTitle'>Ürün adı</label>
                                        <input type='text' name='name' placeholder='Örnek: Iphone 12 Pro Max' className='nameInput'
                                            value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className='descriptionContainer'>
                                        <label className='markTitle'>Açıklama</label>
                                        <textarea  name='description' placeholder='Ürün açıklaması girin' rows="3"
                                            value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className='categoryAndBrand'>
                                        <div className='category'>
                                            <label className='markTitle'>Kategori</label>
                                            <select name='category' placeholder='Kategori seç'
                                                onChange={handleChange} onBlur={handleBlur}>
                                                <option >Kategori seçin</option>
                                                {
                                                    categories && categories.map((category,index)=>
                                                        <option value={category.id} key={index} >{category.name}</option>
                                                        )
                                                }
                                                
                                            </select>
                                        </div>
                                        <div className='brand'>
                                            <label className='markTitle'>Marka</label>
                                            <select name='brand' placeholder='Marka seç'
                                                onChange={handleChange} onBlur={handleBlur}>
                                                <option className='markTitle'>Marka seç</option>
                                                {
                                                    brands && brands.map((brand,index)=>
                                                        <option key={index} value={brand.name}>{brand.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='colorAndStatus'>
                                        <div className='color'>
                                            <label className='markTitle'>Renk</label>
                                            <select name='color' placeholder='Renk seç'
                                                onChange={handleChange} onBlur={handleBlur}>
                                                <option >Renk seç</option>
                                                {
                                                    colors && colors.map((color,index)=>
                                                        <option key={index} value={color.name}>{color.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className='status'>
                                            <label className='markTitle'>Kullanım durumu</label>
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
                                        <label className='markTitle'>Fiyat</label>
                                        <input type='text' name='price' className='priceInput' placeholder='Bir fiyat girin'
                                        value={values.price} onChange={handleChange} onBlur={handleBlur} />
                                        <div className='switchContainer'>
                                            <label className='markTitle'>Teklif opsiyonu</label>
                                            <Switch
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  name= 'isOfferable'
                                                />
                                            {/* <input type='checkbox' name='offerStatus' onChange={handleChange} onBlur={handleBlur}/> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='rightContainer'>
                                    <div className='rightTitle title'>Ürün Resmi</div>
                                    <input type='file'  name='imgFile' onChange={handleChange} onBlur={handleBlur} />
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