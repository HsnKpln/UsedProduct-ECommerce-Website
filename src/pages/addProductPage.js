import { Container, FormGroup } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import axios from '../constants/api/axios'
import { AddProductSchema } from '../constants/yup/yupSchema'
import { useProduct } from '../contexts/ProductContext'
import '../styles/addProduct.css'
import UploadIcon from '../components/UploadIcon'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'

function AddProductPage() {
    // Created customize style for switch button
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
        },
    }));


    const { getAllCategories, getAllBrands, getAllColors } = useProduct()

    const [categories, setCategories] = useState()
    const [brands, setBrands] = useState()
    const [colors, setColors] = useState()

    useEffect(() => {
        getCategory()
        getBrand()
        getColor()
    }, [])

    // Categories taken from product context
    const getCategory = async () => {
        const newCategory = await getAllCategories()
        setCategories(newCategory)
    }

    // Brands taken from product context
    const getBrand = async () => {
        const newBrand = await getAllBrands()
        setBrands(newBrand)
    }

    // colors taken from product context
    const getColor = async () => {
        const newColor = await getAllColors()
        setColors(newColor)
    }

    // created function to add product
    const addProduct = async (data) => {
        const user = JSON.parse(localStorage.getItem('userProfile'))

        // Datas converts to json and added the form data
        const formData = new FormData()
        let appendData = {
            name: data.name,
            description: data.description,
            category: data.category.toString(),
            brand: data.brand,
            color: data.color,
            status: data.status,
            price: Number(data.price),
            isOfferable: data.isOfferable[0] === 'on',
            isSold: false,
            users_permissions_user: user.id.toString()
        }
        let jsonData = JSON.stringify(appendData)
        formData.append('data', jsonData)
        formData.append('files.image', data.imgFile)

        console.log('formdata', formData.getAll('data'))
        console.log('gelen datayı kontrol et', data)

        // formData sent to api via axion post method
        // try {
        //     await axios
        //         .post('https://bootcamp.akbolat.net/products', formData)
        //         .then((response) => {
        //             console.log('well done', response)
        //         })
        //         .catch((error) => {
        //             console.log('An error occured', error.response)
        //         });
        // } catch (err) {
        //     console.log('An err', err.response)
        // }
    }
    return (
        <Layout>
            <Container sx={{ marginTop: 2.5 }} >
                <Formik
                    initialValues={{
                        name: '',
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
                    validationSchema={AddProductSchema}
                >
                    {
                        ({ values, handleChange, handleBlur, errors, handleSubmit, touched, resetForm, setFieldValue }) =>
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
                                            <textarea name='description' placeholder='Ürün açıklaması girin' rows="3"
                                                value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                        </div>
                                        <div className='categoryAndBrand'>
                                            <div className='category'>
                                                <label className='markTitle'>Kategori</label>
                                                <select name='category' placeholder='Kategori seç'
                                                    onChange={handleChange} onBlur={handleBlur}>
                                                    <option >Kategori seçin</option>
                                                    {
                                                        categories && categories.map((category, index) =>
                                                            <option value={category.id} key={index} >{category.name}</option>
                                                        )
                                                    }
                                                    <option value='Diğer' >Diğer</option>

                                                </select>
                                            </div>
                                            <div className='brand'>
                                                <label className='markTitle'>Marka</label>
                                                <select name='brand' placeholder='Marka seç'
                                                    onChange={handleChange} onBlur={handleBlur}>
                                                    <option className='markTitle'>Marka seç</option>
                                                    {
                                                        brands && brands.map((brand, index) =>
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
                                                        colors && colors.map((color, index) =>
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
                                            {errors.price && touched.price && <span className='errorSpan'>{errors.price}</span>}
                                            <div className='switchContainer'>
                                                <label className='markTitle'>Teklif opsiyonu</label>
                                                <FormGroup>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <AntSwitch
                                                            defaultChecked
                                                            inputProps={{ 'aria-label': 'ant design' }}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name='isOfferable'
                                                        />
                                                    </Stack>
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rightContainer'>
                                        <div className='rightTitle title'>Ürün Resmi</div>
                                        <div className='imgAddProductContainer'>
                                            <div className='inputAddProductContainer'>
                                                <UploadIcon />
                                                <div className='uploadText'>Sürükleyip bırakarak yükle</div>
                                                <div className='uploadText'>veya</div>
                                                <input type='file' name='imgFile' onChange={(event) => { setFieldValue("imgFile", event.currentTarget.files[0]) }} onBlur={handleBlur} />

                                                <div className='uploadWarnText'>PNG ve JPEG Dosya boyutu: max. 100kb</div>
                                            </div>
                                            <div className='btnContainer'>
                                                <button type='submit'>Kaydet</button>
                                            </div>
                                        </div>
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