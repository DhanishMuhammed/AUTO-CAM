import React from 'react'
import Header from '../component/Header'
import whatsapp from '../assets/images/whatsapp.png'
import auto from '../assets/images/image1.png'
import '../cssfiles/home.css'
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap'
import Footer from '../component/Footer'
import ceo from '../assets/images/shibil.png'
import Marquee from 'react-fast-marquee'
import { useEffect } from 'react'
import { addtocartAPI, getBannerAPI, getProductAPI } from '../server/allAPi'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
  const [Homeposter,sethomeposter]=useState([])
  const [homeproduct,sethomeproduct]=useState([])

   const server_url="http://localhost:4000" 
useEffect(() => {
    getBanner();
    getproducts()
  }, []);

  const getBanner=async()=>{
    const image=await getBannerAPI();
    if(image.status==200){
      sethomeposter(image.data)
    }else{
      toast.error("api fetching faild")
    }
  }
  console.log('Homeposter length:', Homeposter?.length);
console.log('Homeposter data:', Homeposter);


const getproducts= async()=>{
  const res= await getProductAPI()
  if (res.status==200) {
    sethomeproduct(res.data)
  }else{
    toast.error("product feting faild")
  }
}


// buy button


const navigate=useNavigate()

const handletobuy=()=>{
  

  const buy= sessionStorage.getItem("token")

  if(buy){
    navigate('/cart')
  }else{
    navigate("/login")
    toast.warning('you need login')
  }

}

// // add-to-cart



const handlecartitems = async (productId) => {
  const userDataString = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  if (!userDataString || !token) {
    navigate('/login');
    return;
  }

  try {
    const userData = JSON.parse(userDataString);
    const userId = userData._id;

    const res = await addtocartAPI(userId, productId, 1);
    toast.success('Check console for response details');
    
  } catch (error) {
    toast.error('add to cart error ');
  }
};

 


  return (
    <>
    
      <Header/>

      {/* cousera */}
        <Carousel interval={2000}>
  {Homeposter?.map((banner, index) => (
    <Carousel.Item key={banner._id || index}>
      <img
        src={`${server_url}/uploads/${banner.imageUrl}`}
        className="d-block w-100"
        height={600}
        alt="Banner"
      />
    </Carousel.Item>
  ))}
</Carousel>


    {/* autocam about */}


    <div className="container row align-items-center">
      <div className='col-6 '>
        <img className='autoback text-center' src={auto} width={400} alt="" />
      </div>
      <div className="col-6">
        <h1 className='text-center autotextt m-5 fw-bolder text-success autocam'>AUTOCAM</h1>
      <h5 className='autotext'>
      AUTOCAM is a leading provider of CCTV and automation solutions for homes and businesses. Our team of experts works tirelessly to provide top-notch security and convenience for our clients, making us a trusted name in the industry.
      </h5>
      </div>
    </div>

    {/* whatsapp */}

    <div className=' whatsapp'>
      <a href="https://wa.me/919226300600?text=Hi">
        <img src={whatsapp} width={50} alt="" />
      </a>
    </div>

    {/* products */}

    <h1 className='text-center fw-bolder mt-5' style={{textDecoration:"underline",fontFamily:"researcher"}}>Our Moving Produts</h1>

    {/* card */}
<div className=" mt-5 container-fluid">
  <Row className="mt-5 gx-4 gy-4">
  {homeproduct.slice(0,4).map((item, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={3}>
      <Card className="h-100 shadow">
        <Card.Img
          variant="top"
          src={`${server_url}/uploads/products/${item.productImage}`}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{item.productname}</Card.Title>
          <Card.Text className="mb-3">
            ₹ {item.price} <br />
           {item.description}
          </Card.Text>
          <div className="mt-auto">
            <Button className="me-2" variant="primary" onClick={handletobuy}>
              Buy
            </Button>
            <Button variant="primary" onClick={()=>handlecartitems(item._id)}>
              Add to cart <i className="fa-solid fa-cart-shopping ms-1"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row></div>
    
    {/* instagram */}
    <div className="container mt-5">
      <h1 className='text-center' style={{fontFamily:"researcher"}}>our instagram feed</h1>

      <p className='text-center mt-5'>Follow on us <span ><a style={{textDecoration:"none",color:" #962fbf"}} href="https://www.instagram.com/autocam._?igsh=Mnc3Z3Zra3k3enVs">Instagram</a></span></p>
      


      <Marquee className='' pauseOnHover gradient={false} speed={150}>
      <div className=" marq-items">
        <div className="m-4">
          <img  className=' marqu-item' src="https://i.pinimg.com/236x/c2/38/c0/c238c0658e99cf51c935f2596951303a.jpg" alt="" />
        </div>
        <div className="  m-4  ">
          <img className=' marqu-item' src="https://i.pinimg.com/236x/c2/38/c0/c238c0658e99cf51c935f2596951303a.jpg" alt="" />
        </div>
        <div className=" m-4  ">
          <img className='marqu-item'  src="https://i.pinimg.com/236x/c2/38/c0/c238c0658e99cf51c935f2596951303a.jpg" alt="" />
        </div>
      </div>
       
      </Marquee>
    </div>

    {/* CEO */}
    <div>
    <h1 className='fw-bolder mt-5 text-center'>Our CEO</h1>
      <div className="container row">
      
      <div className="col-6">
        <img src={ceo} className='ceo text-center w-75 rounded-5 ms-5' alt="" />
      </div>
      <div className="col-6">
        <p className='ceop mt-5 text-start '>
       <span className='fw-bolder '>Mohammed Shibili :</span>  is the visionary leader and driving force behind <span className='fw-bolder'>Autocam</span>, a premier automation solutions provider. With over 3 years of experience in the technology and automation industry, Mohammed Shibili has been instrumental in steering the company toward innovation and growth. Under his leadership, <span className='fw-bolder'>Autocam</span> has pioneered advanced automation technologies that have transformed industries by enhancing efficiency, reducing costs, and optimizing processes.

With his expertise in automation solutions and process optimization, Mohammed Shibili continues to lead <span className='fw-bolder'>Autocam</span> as it expands its impact, partnering with businesses worldwide to navigate the future of intelligent automation.
        </p>
      </div>
    </div>
    </div>

  
    

    {/* footer */}

   <Footer/> 
      <ToastContainer autoClose={2000}/>
    </>
  )
}

export default Home
