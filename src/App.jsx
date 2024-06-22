import React from 'react'
import Navbar from "./components/Navbar.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from "./components/Cart.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./components/Login.jsx"
import Shop from "./components/Shop.jsx";
import Order from "./components/Order.jsx"
import Checkout from "./components/Checkout.jsx"
import FormRegistration from "./components/FormRegistration.jsx";
const App = () => {  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Shop/>} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<FormRegistration/>}/>
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/order' element={<Order/>}/>
    </Routes>

    <Footer/>
  </BrowserRouter>
  )
}

export default App
