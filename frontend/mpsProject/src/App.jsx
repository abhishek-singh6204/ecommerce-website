import CheckAuth from './component/common/checkAuth'
import { Route, Router, Routes } from 'react-router'
import './App.css'
import AuthLayouts from './component/auth/layouts'
import LoginPage from './pages/authPages/login'
import SignupPage from './pages/authPages/signup'
import AdminLayouts from './component/admin/layouts'
import Dashboard from './pages/admin-view/dashboard'
// import Order from './pages/admin-view/order'
import Products from './pages/admin-view/products'
import ShoppingLayout from './component/shopping-view/layout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import PageNotFound from './pages/pageNotFound'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import { authMiddleware } from '../../../backend/controller/user'
import { checkAuthorize } from './store/authSlice'
import Order from './pages/admin-view/order'
import PaypalReturn from './pages/shopping-view/paypal-return'
import SearchProducts from './pages/shopping-view/searchProducts'
// import PaypalReturn from './component/shopping-view/paypal-return'

function App() {
const {isAuthenticated,user} =useSelector(state=>state.auth);
const dispatch=useDispatch();
useEffect(()=>{
  const token=JSON.parse(sessionStorage.getItem('token'));
  dispatch(checkAuthorize(token));
},[dispatch]);
  return (
    <div>
      
      <Routes >
        <Route
          path='/'
          element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
          }
        />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayouts/>
          </CheckAuth>
          }>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='signup' element={<SignupPage/>}/>
        </Route>

        <Route path='/admin' element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayouts/>
          </CheckAuth>
          }>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='order' element={<Order/>}/>
          <Route path='products' element={<Products/>}/>
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout/>
          </CheckAuth>
          }>
          <Route path='home' element={<ShoppingHome/>}/>
          <Route path='listings' element={<ShoppingListing/>}/>
          <Route path='checkout' element={<ShoppingCheckout/>}/>
          <Route path='account' element={<ShoppingAccount/>}/>
          <Route path='paypal-return' element={<PaypalReturn/>}/>
          <Route path='search' element={<SearchProducts/>}/>

        </Route>

        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </div>

  )
}

export default App
