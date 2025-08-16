import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import Footer from '../component/Footer'
import Header from '../component/Header'
import '../cssfiles/product.css'
import { getProductAPI,addtocartAPI, createOrderAPI,verifyPaymentAPI, getWhatsnewAPI } from '../server/allAPi'
import{ ToastContainer, toast } from 'react-toastify'

function Products() {
  const [products,setProducts]=useState([])
  const [modalShow, setModalShow] = useState(false);
const [searchitem,setSearchitems]=useState('')
const [paymentdetails,setPaymentdetails]=useState({
  Username:"",phonenumber:"",email:"",address:"",price:"",productName:""
})
const [options,setOptions]=useState('')
const [activefilter,SetActivefilter]=useState('All')
const [WhatsNewAdd,setWhatsNewAdd]=useState([])
const server_url="http://localhost:4000" 
  const navigate = useNavigate()




const payments=(data,prdname)=>{
  const userData = JSON.parse(sessionStorage.getItem("user"));
  setPaymentdetails(prev => ({
    ...prev,
    price: data,
    productName:prdname
  }));
  if (!userData) {
    navigate('/login');
    return;
  }


  setModalShow(true)
}

  // Validate email against allowed domains
const isValidEmail = (email) => {
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  const trimmedEmail = email.trim().toLowerCase();
  const parts = trimmedEmail.split("@");
  return parts.length === 2 && allowedDomains.includes(parts[1]);
};

// Validate 10-digit Indian phone numbers
const isValidPhoneNumber = (phone) => {
  const phoneStr = phone.toString().trim();
  return /^[6-9]\d{9}$/.test(phoneStr);
};


  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};




const handleAdd = async () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
 

  const { Username, email, phonenumber,address,price,productName } = paymentdetails;

 if (!Username || !email || !phonenumber || !address) {
     toast.warning("Please fill in all required fields");
     return;
   }
 
   if (!isValidEmail(email)) {
     toast.warning("Please enter a valid email (e.g., gmail.com, yahoo.com)");
     return;
   }
 
   if (!isValidPhoneNumber(phonenumber)) {
     toast.warning("Please enter a valid 10-digit phone number");
     return;
   }
 
   // Proceed to create Razorpay order
   const res = await createOrderAPI({ amount: price });
   const { id: order_id, amount } = res.data.order;
 
   const isLoaded = await loadRazorpayScript();
   if (!isLoaded) {
     toast.error("Failed to load Razorpay. Please try again later.");
     return;
   }
try{
  const options = {
    key: "rzp_test_hKZPC8dz3sXXUm", // Replace with actual key
    amount: amount.toString(),
    currency: "INR",
    name: "Auto cam",
    description: productName,
    order_id,
    handler: async function (response) {
      document.body.style.overflow = "auto";
      console.log("Razorpay response:", response);  // add this

      
      const verifyRes = await verifyPaymentAPI({
        ...response,
        Username,
        Userid:userData._id,
        phonenumber,
        address: address,
        payment: price,
        email,
        products: [
    {
      productName,
      quantity: 1
    }
  ]
      });

      if (verifyRes.status === 200) {
        toast.success("Payment Successful!");
      } else {
        toast.error("Payment verification failed");
      }
    },
    prefill: {
      name: Username,
      email,
      contact: phonenumber,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const razor = new window.Razorpay(options);
   // ✅ Optional: restore scroll if payment fails or is closed
    razor.on("payment.failed", function () {
      document.body.style.overflow = "auto";
    });

    razor.on("external_wallet", function () {
      document.body.style.overflow = "auto";
    });

    razor.open();

    // ✅ Fallback timeout in case modal closes without events
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000);
    setModalShow(false)
    setPaymentdetails({
       Username:"",phonenumber:"",email:"",address:"",price:"",productName:""
    })
  } catch (error) {
    toast.error("Order creation failed");
  }
};

 

  const handleCart =()=>{
    navigate('/cart')
  }
  

  // getting products

  useEffect(()=>{
    getproducts();
    getwhatsNew()
  },[])

  const getproducts=async()=>{
    const res= await getProductAPI()
    if(res.status==200){
      setProducts(res.data)
    }else{
      toast.error("product fecting is faild")
    }
  }

  // add to cart
   const handlecartitems = async (productId) => {
  const userDataStr = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  if (!userDataStr || !token) {
    navigate('/login');
    return;
  }

  try {
    const userData = JSON.parse(userDataStr);
    const userId = userData._id;

    const res = await addtocartAPI(userId, productId, 1);
    console.log('Add to cart response:', res.data);
    toast.success('Added to cart!');
    
  } catch (error) {
    console.error('Add to cart error:', error);
    toast.error('Add to cart failed.');
  }
};

// search products
const filteredProducts = products.filter(
  (prd) =>
    (options === "" || prd.productType === options) &&
    prd.productname.toLowerCase().includes(searchitem.toLowerCase())
);



// get what neww banners

const getwhatsNew=async()=>{
  const res= await getWhatsnewAPI()
  if(res.status==200){
    setWhatsNewAdd(res.data)

  }else{
    toast.error("fetching faild")
  }
}

// filterring products

const camreclick= ()=>{
  setOptions('cctv')
  SetActivefilter('cctv')
}

const autoclick=()=>{
  setOptions('automate')
  SetActivefilter('automate')
} 

const ipclick=()=>{
  setOptions('ipcam')
  SetActivefilter('ipcam')
}
const Allclick=()=>{
  setOptions('')
  SetActivefilter('All')
}

const filterprd=products.filter(items=>items.productType === options)

  return (
    <div className='bod'>
    <Header/>
    <div className="container">
        <Carousel  data-bs-theme="light">
        <Carousel.Item className='rounded-pill'>
          <img
            className="d-block w-100 rounded-4" height={'440px'}
            src="https://www.cpplusworld.com/prodassets/banners/f50a4500-cd98-467c-8786-5051c11753c0.jpg"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-4" height={'440px'}
            src="https://www.hikvision.com/content/dam/hikvision/en/marketing/image/home/TOP-5-trends-for-the-AIoT-industry-in-2025-banner-updated.jpg?f=webp"

          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-4" height={'440px'}
            src="https://www.hikvision.com/content/dam/hikvision/en/support/how-to/password-reset/password-reset-PC-banner.jpg?f=webp"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>



      {/* premium cards section */}

      <div className=" mt-5 mb-5">
        <h1 className='text-center montserrat mt-3'> Products Spotlight</h1>
      </div>

      <div className="container d-flex justify-content-between align-items-center mt-4 mb-5 premium  ">

       {
       products.slice(0,4).map((prd)=>(
        <Card className='prd-1' key={prd._id} style={{ width: '17rem', height: '450px' }}>
          <Card.Img height={'250px'} variant="top"  src={`${server_url}/uploads/products/${prd.productImage}`} />
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className='text-center'>{prd.productname}</Card.Title>
            <Card.Text>

            </Card.Text>
            <h3 className='fw-bolder text-danger'>₹ {prd.price}</h3>
            <Button onClick={()=>payments(prd.price,prd.productname)}  variant="warning" className='w-100 fw-bolder text-light'>Buy</Button>

          </Card.Body>
        </Card>
       )) }



      </div>

      {/* image view section */}

   <div className="image container-fluid px-4">
  <h2 className="text-center montserrat mb-4">What's New?</h2>

  <Row className="gx-3 gy-3">
    {WhatsNewAdd[0] && (
      <Col xs={12} lg={8}>
        <img
          className="rounded shadow img-fluid w-100"
          style={{ maxHeight: "320px", objectFit: "cover" }}
          src={`${server_url}/uploads/whatsnew/${WhatsNewAdd[0].imageUrl}`}
          alt=""
        />
      </Col>
    )}
    {WhatsNewAdd[1] && (
      <Col xs={12} lg={4}>
        <img
          className="rounded shadow img-fluid w-100"
          style={{ maxHeight: "320px", objectFit: "cover" }}
          src={`${server_url}/uploads/whatsnew/${WhatsNewAdd[1].imageUrl}`}
          alt=""
        />
      </Col>
    )}
  </Row>

  <Row className="mt-3 gx-3 gy-3">
    {WhatsNewAdd.slice(2, 5).map((item, idx) => (
      <Col key={item._id || idx} xs={12} md={6} lg={4}>
        <img
          className="rounded shadow img-fluid w-100"
          style={{ height: "320px", objectFit: "cover" }}
          src={`${server_url}/uploads/whatsnew/${item.imageUrl}`}
          alt=""
        />
      </Col>
    ))}
  </Row>
</div>






      {/* products section */}
      <div className="container mt-5 mb-5">

  {/* Centered Heading & Input */}
  <div className="text-center mb-4">
    <h1 className="  mb-3 montserrat">View Our Products</h1>
    <input
      className="form-control w-100 w-sm-75 w-md-50 mx-auto shadow shadow-3"
      style={{ height: '40px', borderRadius: '50px' }}
      type="text"
      value={searchitem}
      onChange={(e)=>setSearchitems(e.target.value)}
      placeholder="Enter Product Name"
    />
  </div>

  {/* prodect navbar */}

    <div className="container d-flex text-white justify-content-evenly mt-5 prdnav">
      <h4 onClick={Allclick}  className={activefilter === "All" ? "active-filter" : ""}>All</h4>
      <h4 onClick={camreclick} className={activefilter === "cctv" ? "active-filter" : ""}>cameras</h4> 
      <h4 onClick={autoclick} className={activefilter === "automate" ? "active-filter" : ""}>Automation</h4>
      <h4 onClick={ipclick} className={activefilter === "ipcam" ? "active-filter" : ""}>IP cameras</h4>
    </div>

  {/* Product Card Rows */}
<div className="container-fluid px-2 mt-5">
  <div className="row gx-2 gy-3 justify-content-center productss ">
    {filteredProducts.map((item) => (
      <div className="col-6 col-sm-6 col-md-4 col-lg-2" key={item._id}>
        <div className="custom-card">
          <div className="image-box">
            <img
              src={`${server_url}/uploads/products/${item.productImage}`}
              alt={item.productname}
              className="w-100"
            />
          </div>
          <div className="card-body-custom">
            <div className="d-flex flex-column">
              <h6 className="title">{item.productname}</h6>
              <h6>₹ {item.price}</h6>
            </div>
            <button
              className="cart-button"
              onClick={() => handlecartitems(item._id)}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



</div>
<div>
  

</div>

{/* payment modal */}

<Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Payment Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div className='row'>
       <div className="col-6">
         <label >Name</label>
        <input type="text" className='form-control' onChange={e=>setPaymentdetails({...paymentdetails,Username:e.target.value})} />
         <label >Phone Number</label>
        <input type="number" className='form-control' onChange={e=>setPaymentdetails({...paymentdetails,phonenumber:e.target.value})}/>
         <label >Address</label>
        <input type="text" className='form-control' onChange={e=>setPaymentdetails({...paymentdetails,address:e.target.value})}/>
       </div>
       <div className="col-6">

        
         <label >E-mail</label>
        <input type="email" className='form-control' onChange={e=>setPaymentdetails({...paymentdetails,email:e.target.value})}/>
         <label >Product Name</label>
        <input type="text" className='form-control' value={paymentdetails.productName}/>
         <label >Price</label>
        <input type="text" className='form-control' value={paymentdetails.price}/>
       </div>
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)}>Close</Button>
       <Button onClick={()=>handleAdd()}  variant="warning" className='w-100 fw-bolder text-light'>Buy</Button>
      </Modal.Footer>
    </Modal>

    </div>

      <Footer />
<ToastContainer autoClose={2000}/>
    </div>
  )
}

export default Products




