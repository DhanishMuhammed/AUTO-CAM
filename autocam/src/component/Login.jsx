import React from 'react'
import auto from '../assets/images/image1.png'
import "../cssfiles/login.css"
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginAPI, registerAPI } from '../server/allAPi'
import { ToastContainer, toast } from 'react-toastify';

function Login({register}) {
  const navigate = useNavigate()
  const isRegsiterd = register ? true : false

  const [userdata, setuserdata] = useState({
    Username: "", email: "", password: ""
  })

  console.log(userdata);

  // Register function
  const handleRegister = async(e) => {
    e.preventDefault()
    const {Username, email, password} = userdata

    if(!Username || !email || !password){
      alert("fill the boxes")
    } else {
      const result = await registerAPI(userdata)
      if(result.status == 200){
        navigate('/login')
        toast.success("Registration successful!")
        setuserdata({Username: "", email: "", password: ""})
      } else {
        toast.warning(result.response.data)
      }
    }
  }

  // Login function with admin redirect
  const handlelogin = async (e) => {
    e.preventDefault();

    const { email, password } = userdata;

    if (!email || !password) {
      toast.error("Fill the email and password");
    } else {
      try {
        console.log({email, password});
        
        const result = await loginAPI({ email, password });

        if (result.status === 200) {
          // Store user data and token in localStorage
          sessionStorage.setItem('token', result.data.token);
          sessionStorage.setItem('user', JSON.stringify(result.data.user));
          sessionStorage.setItem('userRole', result.data.role);
          
      

          toast.success("Login successfully");
          setuserdata({ Username: "", email: "", password: "" });

          // Check user role and redirect accordingly
          if (result.data.role === 'admin') {
            navigate('/admin'); // Redirect to your existing admin.jsx
          } else {
            navigate('/'); // Redirect to regular user dashboard
          }
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
    <div className='back'>
      <div className="container main w-50">
        <Link to={'/'} style={{textDecoration:"none"}}>
          <p className='text-white'>Back to home</p>
        </Link>
        <div className="row">
          <div className="col-6">
            <img className='img ms-5 mt-5' src={auto} alt="" />
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center flex-column mt-5">
              <h1 className="fw-bolder text-light mt-2" style={{fontFamily:"researcher"}}>
                AUTOCAM
              </h1>
              <h5 className='text-light fw-bolder text-center'></h5>
              <Form className='text-light w-100'>
                {
                  isRegsiterd &&
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your name" 
                      onChange={e => setuserdata({...userdata, Username: e.target.value})} 
                      value={userdata.Username} 
                    />
                  </Form.Group>
                }

                <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    onChange={e => setuserdata({...userdata, email: e.target.value})} 
                    value={userdata.email} 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputpswd">
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    onChange={e => setuserdata({...userdata, password: e.target.value})} 
                    value={userdata.password} 
                  />
                </Form.Group>
                
                {
                  isRegsiterd ?
                    <div className='mt-3'>
                      <p className='mt-2'>Already have an account? Click here to <Link to={'/login'} style={{ textDecoration: 'underline', color: 'skyblue' }}>login</Link></p>
                      <button className='btn btn-primary text-light' onClick={handleRegister}>Register</button>
                    </div> :
                    <div className='mt-3'>
                      <p className='mt-2'>New user? Click here to <Link to={'/registers'} style={{ textDecoration: 'underline', color: 'skyblue' }}>Register</Link></p>
                      <button className='btn btn-primary text-light' onClick={handlelogin}>Login</button>
                    </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default Login