import { Routes, Route } from 'react-router-dom'
import './App.css'
import Addproduct from './prodct/addproduct'
import Productlist from './prodct/productlist'
import Adminavbar from './prodct/Adminnavbar'
import Adminhome from './prodct/Adminhome'
import Edit from './prodct/Edit'
import User_reg from './User/User_reg'
import User_display from './User/user_display'
import UserHome from './User/userhome'
import Login from './User/login'
import Org_Home from './User/Org_home'
import authen from './context/authen'
import { useState } from 'react'
import ProductDetails from './User/ProductDetails'
import CartDisplay from './prodct/CartDisplay'
import PaymentSuccess from './prodct/PaymentSuccess'
import PaymentFailed from './prodct/PaymentFailed'
import Adminnavbar from './prodct/Adminnavbar'

function App() {
  const [isLogin, setLogin] = useState(false)

  // New function to check if user is admin
  const isAdmin = () => {
    return sessionStorage.getItem('isAdmin') === 'true'
  }

  return (
    <>
      <authen.Provider value={{status:isLogin, setLogin:setLogin}}>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/userregistration" element={<User_reg />} />
          <Route path="/login" element={<Login/>} />

          {/* Admin routes */}
          <Route path="/admin-dashboard" element={isAdmin() ? <Adminnavbar /> : <Login />} />
          <Route path="/add-product" element={isAdmin() ? <Addproduct /> : <Login />} />
          <Route path="/product-list" element={isAdmin() ? <Productlist /> : <Login />} />
          <Route path='/edit/:id' element={isAdmin() ? <Edit/> : <Login />}/>
          <Route path='/userview' element={isAdmin() ? <User_display/> : <Login />}/>

          {/* User routes */}
          <Route path='/org_home' element={<Org_Home/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cartdisplay" element={<CartDisplay />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Routes>
      </authen.Provider>
    </>
  )
}

export default App