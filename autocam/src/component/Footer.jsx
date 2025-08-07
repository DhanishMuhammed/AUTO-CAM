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
   <footer class="footer">
        <div class="footer-content">


            
            {/* <!-- Logo Section --> */}
            <div class="logo-section">
                
                <div>
                    <div class="company-name">
                      <img src={auto} alt="" />
                    </div>
                    
                </div>
            </div>

            {/* <!-- Resources Section --> */}
            <div class="footer-section">
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
            <div class="footer-section">
                <h2>Useful Links</h2>
                <ul>
                    <li><a href="#">Purchase</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>

            {/* <!-- Contact Section --> */}
            <div class="footer-section">
                <h2>Contact Us</h2>
                <div class="contact-item">
                    <div class="contact-icon phone-icon"><i class="fa-solid fa-phone"></i></div>
                    <span>+91 9846732363</span>
                </div>
                <div class="contact-item">
                    <div class="contact-icon "><i class="fa-brands fa-whatsapp fa-xl" style={{color:"#25D366"}}></i></div>
                    <span>+91 9226300600</span>
                </div>
                <div class="contact-item">
                    <div class="contact-icon email-icon"><img src={email} alt="" /></div>
                    <span>autocam@gmail.com</span>
                </div>
            </div>
        </div>

        {/* <!-- Bottom Section --> */}
        <div class="footer-bottom">
            <div class="footer-bottom-content">
                <div class="footer-logo-small">
                    <img src={newlogo} alt="" />
                </div>

                <div class="social-links">
                    <a href="#" class="social-icon "><img src={x} alt="" /></a>
                    <a href="https://www.facebook.com/share/19kzjpF17j/?mibextid=wwXIfr" class="social-icon"><img src={facebook} alt="" /></a>
                    <a href="https://wa.me/919226300600" class="social-icon "><img src={whatsapp} alt="" /></a>
                    <a href="https://www.instagram.com/autocam._?igsh=Mnc3Z3Zra3k3enVs" class="social-icon "><img src={insta} alt="" /></a>
                </div>

                <div class="copyright">
                    <span>©</span>
                    <span>Copyright autocam.com</span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
