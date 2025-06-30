import React from 'react'
import Header from '../component/Header'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit'
import screen from '../assets/images/screen.png'
import auto from '../assets/images/image1.png'
import '../cssfiles/home.css'
import { Button, Card } from 'react-bootstrap'
import Footer from '../component/Footer'
import ceo from '../assets/images/shibil.png'
import Marquee from 'react-fast-marquee'


function Home() {
  



  return (
    <>
    
      <Header/>

      {/* cousera */}

      <MDBCarousel  interval={2000}>
      <MDBCarouselItem itemId={1}>
        <img src={screen} className='d-block w-100 ' height={600} alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src='https://mdbootstrap.com/img/new/slides/042.jpg' height={600} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src='https://mdbootstrap.com/img/new/slides/043.jpg' height={600} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>


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

    {/* products */}

    <h1 className='text-center fw-bolder mt-5' style={{textDecoration:"underline",fontFamily:"researcher"}}>Our Moving Produts</h1>

    {/* card */}
<div className="d-flex mt-5">
  <Card className='container card' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://m.media-amazon.com/images/I/51teiuBnD5L.jpg" />
      <Card.Body>
        <Card.Title>Hiki vision</Card.Title>
        <Card.Text >
          $211 <br />
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className="ms-1" variant="primary">buy</Button>
        <Button className='ms-1 ' variant="primary">Add to cart<i class="fa-solid fa-cart-shopping"></i></Button>
      </Card.Body>
    </Card>
    <Card className='container' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://m.media-amazon.com/images/I/51teiuBnD5L.jpg" />
      <Card.Body>
        <Card.Title>Hiki vision</Card.Title>
        <Card.Text>
          $211 <br />
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className="ms-1" variant="primary">buy</Button>
        <Button className='ms-1' variant="primary">Add to cart<i class="fa-solid fa-cart-shopping"></i></Button>
      </Card.Body>
    </Card>
    <Card className='container' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://m.media-amazon.com/images/I/51teiuBnD5L.jpg" />
      <Card.Body>
        <Card.Title>Hiki vision</Card.Title>
        <Card.Text>
          $211 <br />
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className="ms-1" variant="primary">buy</Button>
        <Button className='ms-1' variant="primary">Add to cart<i class="fa-solid fa-cart-shopping"></i></Button>
      </Card.Body>
    </Card>
    <Card className='container' style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://m.media-amazon.com/images/I/51teiuBnD5L.jpg" />
      <Card.Body>
        <Card.Title>Hiki vision</Card.Title>
        <Card.Text>
          $211 <br />
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button  className=" ms-1"variant="primary">buy</Button>
        <Button className='ms-1' variant="primary">Add to cart<i class="fa-solid fa-cart-shopping"></i></Button>
      </Card.Body>
    </Card></div>
    
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
      
    </>
  )
}

export default Home
