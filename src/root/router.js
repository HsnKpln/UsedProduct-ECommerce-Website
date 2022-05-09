import React from 'react'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Spinner from '../components/spinner'
import AddProductPage from '../pages/addProductPage'
import DetailsPage from '../pages/detailsPage'
import Login from '../pages/login'
import MyAccountPage from '../pages/myAccountPage'
import Register from '../pages/register'


const Home = lazy(() => import("../pages/home"));

function Router() {

  return (

    <Routes>
      <Route path='/' element={<Register />} />


      <Route path='/home' element={<Suspense fallback={<Spinner />}>
        <Home /> </Suspense>} />

      <Route path='/login' element={<Login />} />
      <Route path='/detail/:id' element={<DetailsPage />} />
      <Route path='/addproduct' element={<AddProductPage />} />
      <Route path='/myaccount' element={<MyAccountPage />} />
    </Routes>
  )
}

export default Router