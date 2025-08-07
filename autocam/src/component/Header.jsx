import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap'
import logs from '../assets/images/new2.png'
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

  const[adminstate,setAdminstate]=useState(false)

 useEffect(()=>{
  const role=sessionStorage.getItem("userRole")
const names=sessionStorage.getItem('user')


   if(role ==="admin"){
    setAdminstate(true)
  }else{
    setAdminstate(false)
  } 
  
  
  if(names){
    setUsername(JSON.parse(names))
  }
 },[])

 const [username,setUsername]=useState("")


  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('userRole')
    sessionStorage.removeItem('username')
    
    navigate('/login')
    setShowSidebar(false)
  }


  const tocart=()=>{
    const user=sessionStorage.getItem('user')

    if(user){
      navigate('/cart')
    }else{
      navigate('/login')
    }

  }
  const myorder=()=>{
    const user=sessionStorage.getItem('user')

    if(user){
      navigate('/myorders')
    }else{
      navigate('/login')
    }

  }



  return (
    <>
      <Navbar collapseOnSelect expand="lg" className=' nvabar'>
        <Container>
          <img src={logs} width={100} alt="" />

          <Navbar.Toggle aria-controls="responsive-navbar-nav " className='navbar-toggler ' />
          <Navbar.Collapse id="responsive-navbar-nav ">
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

              {adminstate&&
                <Link to={'/admin'} style={{ textDecoration: "none" }} onClick={() => handleLinkClick('/admin')}>
                <Nav className={`fw-bolder pe-3 head ${activeLink === '/admin' ? 'active-link' : ''}`}>admin</Nav>
              </Link>
              }

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
          <Offcanvas.Title><h1>{username.Username}</h1></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h6 onClick={tocart} ><p><i className="fa-solid fa-cart-shopping"></i> Cart</p></h6>
          <h6 onClick={myorder} ><p><i className="fa-solid fa-truck-fast"></i> My Orders</p></h6>

          <Link to={'/login'} style={{textDecoration:"none"}} ><p><i className="fa-solid fa-circle-user"></i> Login</p></Link>
    
          <Button variant="danger" className="w-100 mt-3" onClick={()=>handleLogout () }>Logout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Header
