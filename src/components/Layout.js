import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../styles/layout.css'
import LogoApp from './LogoApp'
import Container from '@mui/material/Container'
import PlusIcon from './PlusIcon'
import AccountIcon from './AccountIcon'

function Layout({children}) {
  const [jwtControl,setJwtControl] = useState()
  const navigate = useNavigate()
  
  useEffect(()=>{
    const dataJwt = JSON.parse(localStorage.getItem('userJwt'))
    // I checked if the user is logged in
    setJwtControl(dataJwt)
  },[])

  return (
    <>
     <div className='layoutContainer'>
       <Container maxWidth='lg' sx={{ display: "flex", justifyContent: "space-between",alignItems:"center"}} >
            <div onClick={()=> navigate('/home')}>
               <LogoApp width={"100%"} height={'3.89vh'} />
             </div>
             <div className='btnGroup'>
                <button onClick={()=> navigate('/addproduct')}>
                  <PlusIcon/>
                  ürün ekle</button>
                  {
                   jwtControl ?
                    <button onClick={()=>navigate('/myaccount')}>
                  <AccountIcon/>
                  Hesabım
                  </button>
                  :
                  <button onClick={()=> navigate('/login')}>
                  <AccountIcon/>
                  Giriş Yap</button>
                  }
             </div>
       </Container>
        
     </div>
     {children}
    </>
  )
}

export default Layout