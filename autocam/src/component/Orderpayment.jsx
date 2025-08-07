import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getpaymentsAPI } from '../server/allAPi'
import { ToastContainer, toast } from 'react-toastify';

function Orderpayment() {
    const [paymentdetails,setPaymentdetails]=useState([])


    useEffect(()=>{
        getpayments()
    },[])

    const getpayments=async()=>{
        const res=await getpaymentsAPI()
        if(res.status==200 || res.status==201){
            setPaymentdetails(res.data)
            console.log(res.data);
            
        }else{
            toast.error("api fetching faild")
        }
    }


  return (
    <div className='p-4 ' style={{backgroundColor:"#DCD7C9",}}>
      <Link to={'/admin'} className="text-decoration-none mb-3 d-block">
          <h5><i className="fa-solid fa-arrow-left"></i> Back</h5>
        </Link>

         <div className='bg-white rounded shadow shadow-5 p-3'>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Customer Name</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Email</th>
                          <th>puyed</th>
                          <th>Selected product</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentdetails.length > 0 ? (
                          paymentdetails.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.Username}</td>
                              <td>{item.phonenumber}</td>
                              <td>{item.address}</td>
                              <td>{item.email}</td>
                              <td>{item.payment}</td>
                              <td>{item.productName}</td>
                        
                             
                              <td>
                              
                              
                                  <>
                                    <button
                                      className="btn btn-danger btn-sm me-2 mb-1"
                                      
                                    >
                                      Delete
                                    </button>
                                    <button
          className="btn btn-success btn-sm mb-1"
        
        >
          Confirm
        </button>
                                  </>
                               
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">No data selected</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>


<ToastContainer autoClose={2000} />
    </div>
  )
}

export default Orderpayment
