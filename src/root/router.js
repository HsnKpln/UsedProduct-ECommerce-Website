import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import AccountPage from '../pages/accountPage'
import DetailsPage from '../pages/detailsPage'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'

function Router() {
  
  return (
    
      <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/account/' element={<AccountPage/>}/>
          <Route path='/detail/:id' element={<DetailsPage/>}/>
      </Routes>
  )
}

export default Router