import React, { useState,useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import CommonImg from '../components/CommonImg'
import '../styles/login.css'
import {Formik} from 'formik';
import { ControlSchema } from '../constants/yup/yupSchema'
import {useUser} from '../contexts/UserContext'
import axios,{URL} from '../constants/api/axios'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import LogoApp from '../components/LogoApp'

function Login() {
  const {loginSuccess,setLoginSuccess,loginJwtSuccess,setLoginJwtSuccess} = useUser();
  const [errorMessage,setErrorMessage] = useState('')

  

  useEffect(()=>{
    const dataJwt = JSON.parse(localStorage.getItem('userJwt'))
    if(dataJwt){
      setLoginJwtSuccess(true)
    }
  },[])
  
  const submitLogin = async (value) =>{
      // e.preventDefault();
      // const email = e.target[0].value
      // const password = e.target[1].value
      const email = value.email
      const password = value.password

      try {
        await axios
         .post(URL.login,{
           identifier: email,
           password : password
         })
         .then((response)=>{
           console.log('well done')
           console.log('User Profile',response.data.jwt)

           localStorage.setItem('userJwt',JSON.stringify(response.data.jwt))
           localStorage.setItem('userProfile',JSON.stringify(response.data.user))
           
           const jwt = JSON.parse(localStorage.getItem('userJwt'));
           axios.defaults.headers.common = { 'Authorization': `Bearer ${jwt}` }
           
           setLoginSuccess(true)
           console.log('login',loginSuccess)
         })
         .catch((error)=>{
           console.log('An error occured', error.response)
           console.log('error message ', error.response.data.message[0].messages[0].message)
           setErrorMessage(error.response.data.message[0].messages[0].message)
         });
      } catch (err) {
        console.log('An error occured2', err.response)
      }
  }

  return (
    <>
     {
       
       loginJwtSuccess ||  loginSuccess ? (<Navigate to='/home'/> )
       :
       (
        <div className='loginContainer'>
        <CommonImg />
        <div className='loginFormContainer'>
        {
            errorMessage ? <div>{errorMessage ==="Identifier or password invalid." ? 
            <Stack sx={{ width: '18%', borderRadius: '8px', position:'absolute', top:'12vh', right: '10px' }} spacing={2}>
                <Alert severity="error">Emailniz ya da şifreniz hatalı.</Alert>
            </Stack> 
            : errorMessage}</div> : ""
            }
          <div className='logoContainer'>
             <div className='logo'>
             <LogoApp width={"100%"} height={'6.75vh'} />
             </div>
          </div>
          <div className='loginForm'>
            <div className='loginTitle commonClass'>Giriş Yap</div>
            <p className='loginSubtitle commonClass'>Fırsatlardan yararlanmak için giriş yap!</p>
            
            <Formik
             initialValues={{
              email:"",
              password: "",
             }}
             onSubmit={(values, actions) => {
              console.log('sumbit edildi', values)
              submitLogin(values)
            }}
             validationSchema={ControlSchema}
            >
              {
                ({values,handleChange,handleBlur,handleSubmit,errors,touched}) =>
                <form onSubmit={handleSubmit}>
                <div className='loginInputBlock' >
                  <label>Email</label>
                  <input type="text" name='email' placeholder='Email@example.com'
                   value={values.email} onChange={handleChange} onBlur={handleBlur}
                  />
                  { errors.email && touched.email &&  <span>{errors.email}</span>}
                </div>
                <div className='loginInputBlock'>
                  <label>Şifre</label>
                  <input type="password" name='password' placeholder='Şifreni gir' 
                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                  />
                  { errors.password && touched.password &&  <span>{errors.password}</span>}
                  <div className='forgotPassword'>Şifremi unuttum</div>
                </div>
                <div className='loginInputBlock'>
                   <button type='submit'>Giriş Yap</button>
                </div>
              </form>
              }
            </Formik>
            <div className='commonClass'>
               <p className='accountQuestion'>Hesabın yok mu? <Link to='/'>Üye Ol</Link> </p>
            </div>
          </div>
        </div>
      </div>
       )
     }
    </>
  )
}

export default Login