import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import MyListings from './pages/MyListings'
import ListingDetails from './pages/ListingDetails'
import ManageListing from './pages/ManageListing'
import Messages from './pages/Messages'
import MyOrders from './pages/MyOrders'
import Loading from './pages/Loading'
import Navbar from './components/Navbar'
import Chatbox from './components/Chatbox'
import {Toaster} from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import CredentialVerify from './pages/admin/CredentialVerify'
import CredentialChange from './pages/admin/CredentialChange'
import AllListings from './pages/admin/AllListings'
import Transactions from './pages/admin/Transactions'
import Withdrawal from './pages/admin/Withdrawal'
import { useAuth, useUser } from '@clerk/react'
import { useDispatch } from 'react-redux'
import { getAllPublicListing, getAllUserListing } from './app/features/listingSlice.js'

const App = () => {
  const {pathname} = useLocation()
  const {getToken} = useAuth();
  const {user,isLoaded} = useUser()

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllPublicListing())
  },[])

  useEffect(()=>{
    if(isLoaded && user){
      dispatch(getAllUserListing({getToken}))
    }
  },[isLoaded,user])

  return (
    <div>
      <Toaster/>
      {!pathname.includes('/admin') && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/marketplace' element={<Marketplace/>}/>
        <Route path='/my-listings' element={<MyListings/>}/>
        <Route path='/listing/:listingId' element={<ListingDetails/>}/>
        <Route path='/create-listing' element={<ManageListing/>}/>
        <Route path='/edit-listing/:id' element={<ManageListing/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/loading/:nextUrl' element={<Loading/>}/>
        <Route path='/admin' element={<Layout />}>
         <Route index element={<Dashboard/>} />
         <Route path='verify-credentials' element={<CredentialVerify/>} />
         <Route path='change-credentials' element={<CredentialChange/>} />
         <Route path='list-listings' element={<AllListings/>} />
         <Route path='transactions' element={<Transactions/>} />
         <Route path='withdrawal' element={<Withdrawal/>} />

        </Route>

      </Routes>
      <Chatbox/>
    </div>
  )
}

export default App
