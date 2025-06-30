import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactModal = ({ show, handleClose }) => {
  return (
    <>
      {/* Bootstrap Modal */}
      <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {/* Close Button */}
              <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>

              {/* Modal Header */}
              <div className="text-center">
                <h3>Don’t Wait—Secure Your Property Now!</h3>
                <h5>Limited Time Offer:</h5>
                <p>Get 10% off your first installation when you book within the next 24 hours!</p>
              </div>

              {/* Form */}
              <form id="contactForm">
                <div className="mb-3">
                  <input
                    type="text"
                    name="fullname"
                    className="form-control bg-light border-0"
                    placeholder="Your Name"
                    pattern="[a-zA-Z ]*"
                    required
                    style={{ height: "55px" }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control bg-light border-0"
                    placeholder="Your Email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                    required
                    style={{ height: "55px" }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control bg-light border-0"
                    placeholder="Your Phone Number"
                    pattern="^((\\+91-?)|0)?[0-9]{10,11}$"
                    required
                    style={{ height: "55px" }}
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    name="query"
                    className="form-control bg-light border-0"
                    rows="3"
                    placeholder="Message"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary d-block w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      {show && <div className="modal-backdrop fade show" onClick={handleClose}></div>}
    </>
  );
};

export default ContactModal;

