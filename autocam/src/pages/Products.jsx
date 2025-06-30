import React from 'react'
import { Button, Card, Carousel, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import Footer from '../component/Footer'
import Header from '../component/Header'
import '../cssfiles/product.css'

function Products() {


  const navigate = useNavigate()


  const handleAdd = () => {
    navigate('/View');
  };

  const handleCart =()=>{
    navigate('/cart')
  }
  
    

  return (
    <>
    <Header/>
      <Carousel data-bs-theme="light">
        <Carousel.Item>
          <img
            className="d-block w-100" height={'440px'}
            src="https://www.cpplusworld.com/prodassets/banners/f50a4500-cd98-467c-8786-5051c11753c0.jpg"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" height={'440px'}
            src="https://www.hikvision.com/content/dam/hikvision/en/marketing/image/home/TOP-5-trends-for-the-AIoT-industry-in-2025-banner-updated.jpg?f=webp"

          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" height={'440px'}
            src="https://www.hikvision.com/content/dam/hikvision/en/support/how-to/password-reset/password-reset-PC-banner.jpg?f=webp"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>



      {/* premium cards section */}

      <div className="premium  mt-5 mb-5">
        <h1 className='text-center fw-bolder text-danger mt-3'> Products Spotlight</h1>
      </div>

      <div className="container  d-flex justify-content-between align-items-center mt-4 mb-5 ">

        <Card  style={{ width: '17rem', height: '450px' }}>
          <Card.Img height={'250px'} variant="top" src="https://www.digitaltrends.com/wp-content/uploads/2023/10/Wyze-Cam-Floodlight-e1697033308555.jpg?fit=720%2C483&p=1" />
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className='text-center'>Wired vs. wireless security cameras</Card.Title>
            <Card.Text>

            </Card.Text>
            <h3 className='fw-bolder text-danger'>$199</h3>
            <Button onClick={handleAdd}  variant="warning" className='w-100 fw-bolder text-light'>Buy</Button>

          </Card.Body>
        </Card>

        <Card style={{ width: '17rem', height: '450px' }}>
          <Card.Img height={'250px'} variant="top" src="https://media.wired.com/photos/66c9e16e919d68f2c64fab73/master/w_960,c_limit/Reolink-Argus-4-Pro-Security-Camera-Reviewer-Photo-SOURCE-Simon-Hill.jpg" />
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className='text-center'>The Best Outdoor Security Cameras</Card.Title>
            <Card.Text>
            </Card.Text>
            <h3 className='fw-bolder text-danger'>$199</h3>
            <Button onClick={handleAdd} variant="warning" className='w-100 fw-bolder text-light'>Buy</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '17rem', height: '450px' }}>
          <Card.Img height={'250px'} variant="top" src="https://computerbaba.co.in/wp-content/uploads/2022/10/Hikvision-DS-2DE4225IW-DE-2MP-IR-PTZ-Dome-CCTV-camera-for-home-office-At-Best-Price-Only-at-computerbaba.co_.in_.png.webp" />
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className='text-center'>Hikvision DS-2DE4225IW-DE 2MP IR </Card.Title>
            <Card.Text>
            </Card.Text>
            <h3 className='fw-bolder text-danger'>$199</h3>
            <Button onClick={handleAdd} variant="warning" className='w-100 fw-bolder text-light'>Buy</Button>
          </Card.Body>
        </Card>

        <Card style={{ width: '17rem', height: '450px' }}>
          <Card.Img height={'250px'} variant="top" src="https://infronttech.com.au/img/cms/products/Swann/Swann%20New/SWNHD-1200D/SWNHD-1200BE.jpg" />
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className='text-center'>Outdoor Wi-Fi Spotlight Security Camera </Card.Title>
            <Card.Text>
            </Card.Text>
            <h3 className='fw-bolder text-danger'>$199</h3>
            <Button onClick={handleAdd} variant="warning" className='w-100 fw-bolder text-light'>Buy</Button>
          </Card.Body>
        </Card>


      </div>

      {/* image view section */}

      <div className="image">
        <h2 className='text-center fw-bolder text-danger mb-4'> What's New?</h2>
        <Row>
          <Col lg={8}>
            <img className='rounded shadow' width={'100%'} height={'320px'} src="https://www.robustel.com/wp-content/uploads/2018/12/shutterstock_366966188.jpg" alt="" />
          </Col>
          <Col lg={4}>
            <img className='rounded shadow' width={'100%'} height={'320px'} src="https://www.shutterstock.com/image-photo/man-looking-home-security-cameras-600nw-586486958.jpg" alt="" />
          </Col>

        </Row>

        <Row className='mt-2  ' >
          <Col lg={3}>
            <img className='rounded shadow ' width={'390px'} height={'320px'} src="https://igzy.com/wp-content/uploads/2021/09/Wi-Fi-CCTV-Camera-Reshaping-the-Camera-Market-15-09-21.png" alt="" />
          </Col>
          <Col></Col>

          <Col lg={3} >
            <img className='rounded shadow ' width={'390px'} height={'320px'} src="https://cctvinstallationinlondon.weebly.com/uploads/1/4/4/7/144771134/cctv-installation-in-london_orig.jpeg" alt="" />
          </Col>
          <Col></Col>

          <Col lg={3}>
            <img className='rounded shadow ' width={'390px'} height={'320px'} src="https://media.istockphoto.com/id/1330512185/photo/technician-installing-cctv-camera-for-security.jpg?s=612x612&w=0&k=20&c=uS2-J8l8VLyCKS01FU89Oy4XbezUhyOU4jWwtHMOfpk=" alt="" />
          </Col>

        </Row>

      </div>






      {/* products section */}
      <div className="container mt-5 mb-5">

  {/* Centered Heading & Input */}
  <div className="text-center mb-4">
    <h1 className="text-danger fw-bolder mb-3">View Our Products</h1>
    <input
      className="form-control w-100 w-sm-75 w-md-50 mx-auto"
      style={{ height: '40px', borderRadius: '50px' }}
      type="text"
      placeholder="Enter Product Name"
    />
  </div>

  {/* Product Card Rows */}
  <div className="row gy-4 justify-content-center">
    {[...Array(8)].map((_, i) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={i}>
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src="https://rukminim2.flixcart.com/image/850/1000/kjn6qvk0-0/home-security-camera/o/r/g/4chdvr-2d-combo-05-indoor-security-camera-hikvision-original-imafz5ywpdrvzzkh.jpeg?q=90&crop=false"
          />
          <Card.Body>
            <div className="d-flex justify-content-between mt-2">
              <Card.Title>Motorized Focus Thermal</Card.Title>
              <Button
                onClick={handleCart}
                variant="danger"
                style={{
                  backgroundColor: 'white',
                  color: 'red',
                  width: '50px',
                  textDecoration: 'none',
                }}
              >
                <i className="fa-solid fs-5 fa-cart-shopping"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
</div>


      <Footer />

    </>
  )
}

export default Products




