import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

function Cart() {
  return (
    <>
    <Header/>
      <div className="row container mb-5">
      <div className="col-lg-1"></div>
      <div className="col">
        <div className='table shadow mt-5'>
          <table className='w-100'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>price</th>
              <th>action</th>
            </tr>
           
           
              <tr>
              <td>1</td>
              <td>CP-UNC-TA21PL3-Y</td>
              <td><img width={"250px"}  height={"200px"} src='https://domar.com/cdn/shop/files/rx4h4z-google.jpg?v=1737719395&width=1000' alt="" /> </td>
              <td><input className='w-25' type="text" value={1}/></td>
              <td>$199</td>
              <td> <button  className='btn btn-light'  ><i class="fa-solid fa-trash fa-beat" style={{color:"red"}}></i></button></td>
            </tr>
         
          </table>
          <div className='d-flex justify-content-between p-3'>
          <Link to={'/'} className="">
          <button className='btn btn-success'>Shop More</button></Link>
            <button className='btn btn-danger'>Empty Cart</button>
           
         

          </div>
       </div>
    </div>
  
    
  </div>    
      
    </>
  )
}

export default Cart
