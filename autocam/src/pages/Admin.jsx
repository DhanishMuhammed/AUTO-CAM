import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SalesOverview from '../component/SalesOverview'

function Admin() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const userData = sessionStorage.getItem('user')
    const userRole = sessionStorage.getItem('userRole')

    if (!token) {
      toast.error('Please login to access admin panel')
      navigate('/login')
      return
    }

    if (userRole !== 'admin') {
      toast.error('Access denied. Admin privileges required.')
      navigate('/')
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }

    setLoading(false)
  }, [navigate])

  const toedits = () => navigate('/edits')
  const toservice = () => navigate('/bookedservice')
  const toOrders = () => navigate('/orderpage')

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />

      {/* Welcome Header */}
      <div className="container-fluid bg-light py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap px-3">
          <div>
            <h4 className="mb-0 text-primary">Admin Dashboard</h4>
            {user && <small className="text-muted">Welcome back, {user.Username}!</small>}
          </div>
        </div>
      </div>

      {/* Responsive Cards */}
      <div className="container mb-5">
        <div className="row g-4 justify-content-center">
          {/* Customer orders */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="border rounded shadow p-3 admin-card h-100" onClick={toOrders} style={{ cursor: 'pointer' }}>
              <h4>
                <i className="fa-solid fa-shopping-cart text-primary me-2"></i>
                Customer orders
              </h4>
              <p className="text-muted">Manage customer orders and track delivery status</p>
            </div>
          </div>

          {/* Service booked */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="border rounded shadow p-3 admin-card h-100" onClick={toservice} style={{ cursor: 'pointer' }}>
              <h4>
                <i className="fa-solid fa-calendar-check text-success me-2"></i>
                Service booked
              </h4>
              <p className="text-muted">View and manage service appointments</p>
            </div>
          </div>

          {/* UI Edits */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="border rounded shadow p-3 admin-card h-100" onClick={toedits} style={{ cursor: 'pointer' }}>
              <h4>
                <i className="fa-solid fa-edit text-warning me-2"></i>
                UI edits
              </h4>
              <p><i className="fa-solid fa-house text-primary"></i> Home</p>
              <p><i className="fa-brands fa-product-hunt text-primary"></i> Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <SalesOverview />

      {/* Card hover styles */}
      <style >{`
        .admin-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
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
