import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../cssfiles/Service.css";
import ContactModal from '../component/ContactModal';
import Header from '../component/Header';
import Footer from '../component/Footer';
function Service() {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <Header/>
      <div className="container my-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2>Comprehensive CCTV Camera Installation</h2>
          <p>
            Protect your home and business with cutting-edge surveillance
            technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          <div className=" col-md-6 col-lg-4">
            <div className="service-card card shadow p-4 border-0">
              <h4 className="text-primary">Residential CCTV Installation</h4>
              <ul>
                <li>Advanced night vision and motion detection</li>
                <li>Mobile app integration for easy access</li>
                <li>24/7 monitoring for safety</li>
              </ul>
              <a href="#" class="arrow-link  bg-warning"><i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="service-card card shadow p-4 border-0">
              <h4 className="text-primary">Commercial CCTV Installation</h4>
              <ul>
                <li>Enhanced security for offices & retail stores</li>
                <li>Real-time monitoring and analytics</li>
                <li>High-definition recording with cloud backup</li>
              </ul>
              <a href="#" class="arrow-link  bg-warning"><i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="service-card card shadow p-4 border-0">
              <h4 className="text-primary">Customized Security Solutions</h4>
              <ul>
                <li>Tailored solutions for all business sizes</li>
                <li>Integration with existing security systems</li>
                <li>Scalable solutions for future expansion</li>
              </ul>
              <a href="#" class="arrow-link bg-warning"><i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="bg-warning p-4 rounded">
              <h3>Call Us for Same-Day Installation!</h3>
              <p>
                Contact our CCTV experts for a consultation and get the best
                security solutions for your needs.
              </p>
              <button className="btn btn-dark" onClick={() => setShowModal(true)}>Get a Free Quote</button>
              {showModal && <ContactModal show={showModal} handleClose={() => setShowModal(false)} />}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Service
