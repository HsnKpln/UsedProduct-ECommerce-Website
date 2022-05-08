import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProductPage from '../pages/addProductPage'
import DetailsPage from '../pages/detailsPage'
import Home from '../pages/home'
import Login from '../pages/login'
import MyAccountPage from '../pages/myAccountPage'
import Register from '../pages/register'

function Router() {
  
  return (
    
      <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/detail/:id' element={<DetailsPage/>}/>
          <Route path='/addproduct' element={<AddProductPage/>}/>
          <Route path='/myaccount' element={<MyAccountPage/>}/>
      </Routes>
  )
}

export default Router