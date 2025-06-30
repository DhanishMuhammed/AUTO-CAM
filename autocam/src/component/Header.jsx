import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap'
import logs from '../assets/images/set.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../cssfiles/navbar.css'

function Header() {
  const [activeLink, setActiveLink] = useState('/')
  const [showSidebar, setShowSidebar] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])

  const handleLinkClick = (path) => {
    setActiveLink(path)
  }

  const handleProfileClick = (e) => {
    e.preventDefault()
    setShowSidebar(true)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='bg-success nvabar'>
        <Container>
          <img src={logs} width={100} alt="" />

          <Navbar.Toggle aria-controls="responsive-navbar-nav nav-light" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link to={'/'} style={{ textDecoration: "none" }} onClick={() => handleLinkClick('/')}>
                <Nav className={`fw-bolder pe-3 head ${activeLink === '/' ? 'active-link' : ''}`}>Home</Nav>
              </Link>

              <Link to={'/products'} style={{ textDecoration: "none" }} onClick={() => handleLinkClick('/products')}>
                <Nav className={`fw-bolder pe-3 head ${activeLink === '/products' ? 'active-link' : ''}`}>Product</Nav>
              </Link>

              <Link to={'/Service'} style={{ textDecoration: "none" }} onClick={() => handleLinkClick('/Service')}>
                <Nav className={`fw-bolder pe-3 head ${activeLink === '/Service' ? 'active-link' : ''}`}>Service</Nav>
              </Link>

              {/* Profile just opens sidebar instead of routing */}
              <Nav onClick={handleProfileClick} className="fw-bolder pe-3 head" style={{ cursor: 'pointer' }}>
                Profile
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar component */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to={'/cart'} style={{textDecoration:"none"}} ><p><i class="fa-solid fa-cart-shopping"></i> Cart</p></Link>
          <Link to={'/login'} style={{textDecoration:"none"}} ><p><i class="fa-solid fa-circle-user"></i> Login</p></Link>
    
          <Button variant="danger" className="w-100 mt-3" onClick={() => setShowSidebar(false)}>Logout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Header
