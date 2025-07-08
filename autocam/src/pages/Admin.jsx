import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Admin() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check authentication and admin role on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const userData = sessionStorage.getItem('user')
    const userRole = sessionStorage.getItem('userRole')
    
    // Check if user is authenticated
    if (!token) {
      toast.error('Please login to access admin panel')
      navigate('/login')
      return
    }
    
    // Check if user has admin role
    if (userRole !== 'admin') {
      toast.error('Access denied. Admin privileges required.')
      navigate('/')
      return
    }
    
    // Set user data if authenticated and admin
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    setLoading(false)
  }, [navigate])

  // Your existing navigation function
  function toedits() {
    navigate('/edits')
  }

  // Logout function
  

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header/>
      
      {/* Admin Welcome Bar */}
      <div className="container-fluid bg-light py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0 text-primary">Admin Dashboard</h4>
            {user && <small className="text-muted">Welcome back, {user.Username}!</small>}
          </div>
         
          
        </div>
      </div>

      <div className="container-fluid mt-5 d-flex gap-5 justify-content-center">
        
        {/* box 1 - Customer orders */}
        <div className='border rounded w-25 shadow p-2 admin-card'>
          <h3>
            <i className="fa-solid fa-shopping-cart text-primary me-2"></i>
            Customer orders
          </h3>
          <p className="text-muted">Manage customer orders and track delivery status</p>
        </div>

        {/* box 2 - Service booked */}
        <div className='border rounded w-25 shadow p-2 admin-card'>
          <h3>
            <i className="fa-solid fa-calendar-check text-success me-2"></i>
            Service booked
          </h3>
          <p className="text-muted">View and manage service appointments</p>
        </div>

        {/* box 3 - UI edits */}
        <div className='border rounded w-25 shadow p-2 admin-card' onClick={toedits} style={{cursor: 'pointer'}}>
          <h3>
            <i className="fa-solid fa-edit text-warning me-2"></i>
            UI edits
          </h3>
          <p>
            <i className="fa-solid fa-house text-primary"></i> Home
          </p>
          <p>
            <i className="fa-brands fa-product-hunt text-primary"></i> Products
          </p>
        </div>
      </div>

      {/* Add some CSS for hover effects */}
      <style jsx>{`
        .admin-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .admin-card {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  )
}

export default Admin