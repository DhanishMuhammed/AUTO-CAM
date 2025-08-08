import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

import "../cssfiles/footer.css"
import auto from "../assets/images/new3.png"
import email from "../assets/images/gmail.png"
import whatsapp from "../assets/images/whatsapp.png"
import facebook from "../assets/images/facebook.png"
import x from "../assets/images/twitter.png"
import insta from "../assets/images/instagram.png"
import newlogo from "../assets/images/newlogo.png"
function Footer() {
  return (
   <footer className="footer">
        <div className="footer-content">


            
            {/* <!-- Logo Section --> */}
            <div className="logo-section">
                
                <div>
                    <div className="company-name">
                      <img src={auto} alt="" />
                    </div>
                    
                </div>
            </div>

            {/* <!-- Resources Section --> */}
            <div className="footer-section">
                <h2>Resources</h2>
                <ul>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Installations</a></li>
                    <li><a href="#">Automation</a></li>
                    <li><a href="#">Networking</a></li>
                    <li><a href="#">Security System</a></li>
                </ul>
            </div>

            {/* <!-- Useful Links Section --> */}
            <div className="footer-section">
                <h2>Useful Links</h2>
                <ul>
                    <li><a href="#">Purchase</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>

            {/* <!-- Contact Section --> */}
            <div className="footer-section">
                <h2>Contact Us</h2>
                <div className="contact-item">
                    <div className="contact-icon phone-icon"><i className="fa-solid fa-phone"></i></div>
                    <span>+91 9846732363</span>
                </div>
                <div className="contact-item">
                    <div className="contact-icon "><i className="fa-brands fa-whatsapp fa-xl" style={{color:"#25D366"}}></i></div>
                    <span>+91 9226300600</span>
                </div>
                <div className="contact-item">
                    <div className="contact-icon email-icon"><img src={email} alt="" /></div>
                    <span>autocam@gmail.com</span>
                </div>
            </div>
        </div>

        {/* <!-- Bottom Section --> */}
        <div className="footer-bottom">
            <div className="footer-bottom-content">
                <div className="footer-logo-small">
                    <img src={newlogo} alt="" />
                </div>

                <div className="social-links">
                    <a href="#" className="social-icon "><img src={x} alt="" /></a>
                    <a href="https://www.facebook.com/share/19kzjpF17j/?mibextid=wwXIfr" className="social-icon"><img src={facebook} alt="" /></a>
                    <a href="https://wa.me/919226300600" className="social-icon "><img src={whatsapp} alt="" /></a>
                    <a href="https://www.instagram.com/autocam._?igsh=Mnc3Z3Zra3k3enVs" className="social-icon "><img src={insta} alt="" /></a>
                </div>

                <div className="copyright">
                    <span>©</span>
                    <span>Copyright autocam.com</span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
