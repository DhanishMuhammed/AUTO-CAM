
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import Service from './pages/service'
import About from './pages/About'
import View from './component/View'
import Cart from './component/Cart'
import SalesEnquiry from './component/SalesEnquary'
import Login from './component/Login'

import ContactModal from './component/ContactModal'
import Admin from './pages/Admin'
import Edits from './component/Edits'
import ServiceBooked from './component/ServiceBooked'
import Orderpayment from './component/Orderpayment'
import Payedproducts from './component/Payedproducts'
import Peoductsection from './component/Peoductsection'


function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/Service' element={<Service/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/view' element={<View/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/sales' element={<SalesEnquiry/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registers' element={<Login register/>}/>
      <Route path='/contactmodal' element={<ContactModal/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/edits' element={<Edits/>}/>
      <Route path='/bookedservice' element={<ServiceBooked/>} />
      <Route path='/orderpage' element={<Orderpayment/>} />
      <Route path='/myorders' element={<Payedproducts/>} />
      <Route path='/productsecsion' element={<Peoductsection/>} />
      <Route path='/*' element={'/'}/>


     </Routes>
    </>
  )
}

export default App
