import React from 'react'
import auto from '../assets/images/logonew.png'
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
const handleRegister = async (e) => {
  e.preventDefault();
  const { Username, email, password } = userdata;
   const isValidEmail = (email) => {
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  const trimmedEmail = email.trim().toLowerCase();
  const parts = trimmedEmail.split("@");

  return (
    parts.length === 2 &&
    /^[a-zA-Z0-9._%+-]+$/.test(parts[0]) && // valid username
    allowedDomains.includes(parts[1])
  );
};

  if (!Username || !email || !password) {
    alert("Fill all the fields");
  } else if (!isValidEmail(email)) {
    toast.warning("Enter a valid email address");
  } else {
    try {
      const result = await registerAPI(userdata);
      if (result.status === 200) {
        navigate('/login');
        toast.success("Registration successful!");
        setuserdata({ Username: "", email: "", password: "" });
      } else {
        toast.warning(result.response.data);
      }
    } catch (err) {
      toast.error("Registration failed. Try again.");
    }
  }
};


  // Login function with admin redirect
const handlelogin = async (e) => {
  e.preventDefault();
  const { email, password } = userdata;
   const isValidEmail = (email) => {
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  const trimmedEmail = email.trim().toLowerCase();
  const parts = trimmedEmail.split("@");

  return (
    parts.length === 2 &&
    /^[a-zA-Z0-9._%+-]+$/.test(parts[0]) && // valid username
    allowedDomains.includes(parts[1])
  );
};

  if (!email || !password) {
    toast.error("Fill the email and password");
  } else if (!isValidEmail(email)) {
    toast.warning("Enter a valid email address");
  } else {
    try {
      const result = await loginAPI({ email, password });

      if (result.status === 200) {
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('user', JSON.stringify(result.data.user));
        sessionStorage.setItem('userRole', result.data.role);

        toast.success("Login successfully");
        setuserdata({ Username: "", email: "", password: "" });

        if (result.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
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
  <div className="container main firstcon">
    <Link to={'/'} style={{ textDecoration: "none" }}>
      <p className='text-white'>Back to home</p>
    </Link>
    <div className="row sec">
      <div className="col-md-6 mb-4 d-flex justify-content-center align-items-center">
        <img className='img-fluid img' src={auto} alt="" />
      </div>
      <div className="col-md-4 logbox rounded box-shadow ">
        <div className="d-flex align-items-center flex-column mt-5 px-3">
          <h1 className="fw-bolder mt-2" style={{ fontFamily: "researcher", color: "#002245" }}>
            AUTOCAM
          </h1>
          <h5 className='text-light fw-bolder text-center'></h5>
          <Form className='text-light w-100'>
            {isRegsiterd && (
              <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  onChange={e => setuserdata({ ...userdata, Username: e.target.value })}
                  value={userdata.Username}
                  className='rounded-pill'
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                onChange={e => setuserdata({ ...userdata, email: e.target.value })}
                value={userdata.email}
                className='rounded-pill'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInputpswd">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                onChange={e => setuserdata({ ...userdata, password: e.target.value })}
                value={userdata.password}
                className='rounded-pill'
              />
            </Form.Group>

            {isRegsiterd ? (
              <div className='mt-3 text-center'>
                <p className='mt-2' style={{ color: "#002245" }}>
                  Already have an account? Click here to
                  <Link to={'/login'} style={{ textDecoration: 'underline', color: 'skyblue' }}> login</Link>
                </p>
                <button className='btn btn-primary text-light rounded-pill w-100' onClick={handleRegister}>Register</button>
              </div>
            ) : (
              <div className='mt-3 text-center'>
                <p className='mt-2' style={{ color: "#002245" }}>
                  New user? Click here to
                  <Link to={'/registers'} style={{ textDecoration: 'underline', color: 'skyblue' }}> Register</Link>
                </p>
                <button className='btn btn-primary text-light rounded-pill w-100' onClick={handlelogin}>Login</button>
              </div>
            )}
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