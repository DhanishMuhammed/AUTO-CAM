import React from 'react'
import auto from '../assets/images/image1.png'
import "../cssfiles/login.css"
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'




function Login() {
  return (
    <>
    <div className='back'>


      <div className="container main w-50  ">
       <Link to={'/'} style={{textDecoration:"none"}}> <p className='text-white'>Back to home</p></Link>
       <div className="row">
       <div className="col-6">
            <img className='img ms-5 mt-5' src={auto}  alt="" />
        </div>
        <div className="col-6">
        <div className="d-flex align-items-center flex-column mt-5">
                                    <h1 className="fw-bolder text-light mt-2 " style={{fontFamily:"researcher"}}>
                                        AUTOCAM
                                    </h1>
                                    <h5 className='text-light fw-bolder text-center'>
                                        
                                    </h5>
                                    <Form className='text-light w-100'>
                                        
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">

                                                <Form.Control type="text" placeholder="Enter your name"
                                                     />
                                            </Form.Group>

                                        

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">

                                            <Form.Control type="email" placeholder="Enter your email"  />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputpswd">

                                            <Form.Control type="password" placeholder="Enter you paaword"  />
                                        </Form.Group>
                                        <Link to={'/register'} style={{textDecoration:'none'}}><p>If you are new Sing-Up</p></Link>
                                        <button className='btn btn-success d-flex text-end'>
                                          submit
                                        </button>

                                        
                                       
                                    </Form>
                                </div>
        </div>
       </div>
      </div>
    </div>
    </>
  )
}

export default Login
