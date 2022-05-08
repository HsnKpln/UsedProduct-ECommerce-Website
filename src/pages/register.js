import React, { useCallback, useEffect, useState } from 'react'
import CommonImg from '../components/CommonImg'
import '../styles/register.css'
import { Link, Navigate } from 'react-router-dom'
import { Formik } from 'formik'
import { ControlSchema } from '../constants/yup/yupSchema'
import axios, { URL } from '../constants/api/axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LogoApp from '../components/LogoApp';
import { useUser } from '../contexts/UserContext'

function Register() {
  const { registerSuccess, setRegisterSuccess, registerJwtSuccess, setRegisterJwtSuccess } = useUser()

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const dataJwt = JSON.parse(localStorage.getItem('userJwt'))
    if (dataJwt) {
      setRegisterJwtSuccess(true)
    }
  }, [registerSuccess, registerJwtSuccess])


  const submitRegister = async (value) => {
    // e.preventDefault();
    // const email = e.target[0].value
    // const password = e.target[1].value
    const email = value.email
    const password = value.password

    try {
      await axios
        .post(URL.register, {
          username: email,
          email: email,
          password: password
        })
        .then((response) => {
          console.log('well done')
          //  console.log('User Profile',response.data.user)
          //  console.log('Response data',response.data)
          //  console.log('Response',response)
          console.log('User Profile', response.data.jwt)

          localStorage.setItem('userJwt', JSON.stringify(response.data.jwt))
          localStorage.setItem('userProfile', JSON.stringify(response.data.user))
          const jwt = JSON.parse(localStorage.getItem('userJwt'));
          axios.defaults.headers.common = { 'Authorization': `Bearer ${jwt}` }

          setRegisterSuccess(true)
        })
        .catch((error) => {
          console.log('An error occured', error.response)
          console.log('error message ', error.response.data.message[0].messages[0].message)
          setErrorMessage(error.response.data.message[0].messages[0].message)
        });
    } catch (err) {
      console.log('An error occured', err.response)
    }
  }

  return (
    <>
      {
        registerJwtSuccess || registerSuccess ? (<Navigate to='/home' />) :
          (
            <div className='registerContainer'>
              <CommonImg />
              <div className='registerFormContainer'>
                <div className='logoContainer'>
                  <div className='logo'>
                    <LogoApp width={"100%"} height={'6.75vh'} />
                  </div>
                </div>
                <div className='registerForm'>
                  <div className='registerTitle commonClass'>Üye Ol</div>
                  <p className='registerSubtitle commonClass'>Fırsatlardan yararlanmak için üye Ol!</p>
                  {
                    errorMessage ? <div>{errorMessage === "Email is already taken." ?
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">Bu email adresi zaten mevcut!</Alert>
                      </Stack>
                      : errorMessage}</div> : ""
                  }
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    onSubmit={(values, actions) => {
                      console.log('sumbit edildi', values)
                      submitRegister(values)
                    }}
                    validationSchema={ControlSchema}
                  >
                    {
                      ({ values, handleChange, handleBlur, handleSubmit, errors, touched }) =>
                        <form onSubmit={handleSubmit}>
                          <div  >
                            <label>Email</label>
                            <input type="text" name='email' placeholder='Email@example.com'
                              value={values.email} onChange={handleChange} onBlur={handleBlur}
                            />
                            {errors.email && touched.email && <span>{errors.email}</span>}
                          </div>
                          <div >
                            <label>Şifre</label>
                            <input type="password" name='password' placeholder='Şifreni gir'
                              value={values.password} onChange={handleChange} onBlur={handleBlur}
                            />
                            {errors.password && touched.password && <span>{errors.password}</span>}
                          </div>
                          <div>
                            <button type='submit' >Üye Ol</button>
                          </div>
                        </form>
                    }
                  </Formik>
                  <div className='commonClass'>
                    <p className='accountQuestion'>Hesabın var mı? <Link to='/login'>Giriş Yap</Link> </p>
                  </div>
                </div>
              </div>
              {/* <Stack sx={{ width: '30%' }} spacing={2}>
      <Alert severity="error">Emailiniz veya şifreniz hatalı!</Alert>
      <Alert severity="success">This is a success alert!</Alert>
    </Stack>
        <Box 
        sx={{ bgcolor: 'white', height: '50vh', width: '60%', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
         </Box> */}
            </div>
          )
      }
    </>
  )
}

export default Register