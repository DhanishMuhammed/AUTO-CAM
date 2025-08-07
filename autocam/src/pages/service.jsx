import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../cssfiles/Service.css";
import ContactModal from '../component/ContactModal';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { addServiceAPI } from '../server/allAPi';
function Service() {

  const [showModal, setShowModal] = useState(false);
  const [modalShow, setModalShow] = useState(null);
  const [saveservce, setSaveservice] = useState({
    customername: "", customerPhoneNo: "", email: "", address: "", notes: "", service: { name: "", features: [], type: "" }
  })

console.log(saveservce);


  const handleClose = () => {
    setModalShow(null)
    setSaveservice({
      customername: "", customerPhoneNo: "", email: "", address: "", notes: "", service: { name: "", features: [], type: "" }
    })
  }
 const isValidEmail = (email) => {
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  const trimmedEmail = email.trim().toLowerCase();
  const parts = trimmedEmail.split("@");

  return (
    parts.length === 2 &&
    /^[a-zA-Z0-9._%+-]+$/.test(parts[0]) && // valid username
    allowedDomains.includes(parts[1])
  );
};


 const uploadfile = async (e) => {
  e.preventDefault();

  const { customername, customerPhoneNo, email, address, service } = saveservce;

  console.log("Current email:", `"${email}"`);
  if (!customername || !customerPhoneNo || !email || !address || !service) {
    toast.warning("Please fill in all the fields.");
    return;
  } else if (!isValidEmail(email)) {
    toast.warning("Please enter a valid email");
    return;
  } else if (!/^[6-9]\d{9}$/.test(customerPhoneNo)) {
    toast.warning("Enter a valid 10-digit phone number.");
    return;
  }

  try {
    const res = await addServiceAPI(saveservce);
    if (res.status === 200 || res.status === 201) {
      toast.success("Service added successfully!");
      handleClose();
    } else {
      toast.error("Something went wrong while submitting.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Submission failed. Try again.");
  }
};





  return (
    <div className='bodi'>
      <Header />
      <div className="container my-5 ">
        {/* Header Section */}
        <div className="text-center mb-5 text-white montserrat">
          <h2>Smart Automation, Security & Networking Solutions</h2>
          <p>Explore our wide range of services designed to enhance convenience, safety, and connectivity.</p>

        </div>

        {/* Services Grid */}
        {/* fisrt row */}
        <div className="row g-4">


          <div className=" col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary">Home Automation</h4>
              <ul>
                <li>lights Adjust automatically</li>
                <li>Voice commant for every thing</li>
                <li>curtains that open with the sunrise</li>
              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-5' onClick={() => {
                setModalShow("homeautomatino");
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "Home Automation"
                  }
                }));
              }}><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "homeautomatino"}

              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Home Automation
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>

                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            "Smart Light",
                            "Voice Assistance",
                            "Smart Appliances",
                            "Automatic Shutter",
                            "Automatic Curtain",
                            "Sliding Gate Operator",
                            "Swing Gate Operator",
                            "Garage Door"
                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`features${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}

                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>

                        {/* Improved radio button alignment */}
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>



          <div className="col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary">CCTV</h4>
              <ul>
                <li>Enhanced security for offices </li>
                <li>Real-time monitoring </li>
                <li>High-definition recording with cloud backup</li>
              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-5' onClick={() => {
                setModalShow("CCTV")
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "CCTV"
                  }
                }));
              }

              }><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "CCTV"}
              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  CCTV
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>

                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            " IP Camera",
                            " HD Camera",
                            " WiFi Camera",
                            " 4G Camera",
                            " Outdoor Camera",
                            " indoor Camera",
                            " PTZ Camera",

                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`feature${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>
                        {/* Improved radio button alignment */}
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary">NetWorking stay connected,always </h4>
              <ul>
                <li>For seamless Wi-Fi coverage</li>
                <li>To connect all your devices</li>
                <li>For stable internet connections</li>
              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-5' onClick={() => {
                setModalShow("networking");
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "networking"
                  }
                }));
              }}><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "networking"}
              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  NetWorking
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>

                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            " Router",
                            " Switeches",
                            " Modems",


                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`feature${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>




          <div className="col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary">Smart  ClassRooms</h4>
              <ul>
                <li>Interactive Whiteboards or Digital Displays</li>
                <li>Audio Enhancements </li>
                <li>Document Camera</li>
              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-5' onClick={() => {
                setModalShow("smartclass");
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "smartclass"
                  }
                }));
              }}><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "smartclass"}
              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Smart  ClassRooms
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>


                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            " Interactive Whiteboards or Digital Displays",
                            "  Audio Enhancements",
                            " Document Camera",


                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`feature${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        {/* second row */}
        <div className="row g-4 mt-3">
          <div className=" col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary">Acess control</h4>
              <ul>
                <li>Fingerprint, face recognition, and more!</li>
                <li> Pin-based access control for added safety.</li>
                <li>Comprehensive systems for regulating entry.</li>
              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-5' onClick={() => {
                setModalShow("Accesscontrol");
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "Accesscontrol"
                  }
                }));
              }}><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "Accesscontrol"}
              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Acess control
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>


                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            " Biometric Systems",
                            "  Electric Locks",
                            " Keypad Switches",
                            " Door Access Control"


                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`feature${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary">Security System</h4>
              <ul>
                <li>Keep intruders at bay with advanced alert systems.</li>
                <li>Monitor every movement with precision </li>
                <li>Spot hazards like smoke or gas leaks before they become an issue.</li>
              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-4' onClick={() => {
                setModalShow("securitysystem");
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "securitysystem"
                  }
                }));
              }}><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "securitysystem"}
              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Security System
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>


                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            " Alarms",
                            "  Sensors",
                            " Detectors",


                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`feature${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary"> Intercom Solution</h4>
              <ul>
                <li>Advanced network-based intercom systems.</li>
                <li>Reliable and affordable solutions.</li>
                <li>No wires, no hassle—just seamless connectivity.</li>
              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-4' onClick={() => {
                setModalShow("intercom");
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "intercom"
                  }
                }));
              }}><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "intercom"}
              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Intercom Solution
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>


                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            " IP Intercom",
                            "  Wired Intercom",
                            "  Wireless Intercom",


                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`feature${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="service-card w-100 h-100 card shadow p-4 border-0">
              <h4 className="text-primary">Video Door Phones </h4>
              <ul>
                <li>Always know who's knocking at your door.</li>
                <li>Talk to your visitors even when you're not home</li>

              </ul>
              <button className='btn btn-warning w-25 d-block mx-auto mt-5' onClick={() => {
                setModalShow("videodoor");
                setSaveservice(prev => ({
                  ...prev,
                  service: {
                    ...prev.service,
                    name: "videodoor"
                  }
                }));
              }}><i className="fas fa-arrow-right"></i></button>
            </div>
            <Modal
              show={modalShow === "videodoor"}
              onHide={() => setModalShow(null)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Video Door Phones
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container my-5">
                  <div className="row">
                    {/* Left Column: User Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" type="text" placeholder="Enter your name"
                          onChange={(e) => setSaveservice({ ...saveservce, customername: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input className="form-control" type="tel" placeholder="Enter your phone number"
                          onChange={(e) => setSaveservice({ ...saveservce, customerPhoneNo: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" placeholder="Enter your email"
                          onChange={(e) => setSaveservice({ ...saveservce, email: e.target.value.trim() })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input className="form-control" type="text" placeholder="Enter your address"
                          onChange={(e) => setSaveservice({ ...saveservce, address: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea className="form-control" rows="3" placeholder="Additional information..."
                          onChange={(e) => setSaveservice({ ...saveservce, notes: e.target.value })}></textarea>
                      </div>
                    </div>


                    {/* Right Column: Feature Selection */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Select Smart Features:</label>
                        <ul className="list-unstyled">
                          {[
                            " HD Video Door Phone",
                            " IP Video Door Phone",



                          ].map((features, index) => (
                            <li key={index} className="form-check mb-2">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={`feature${index}`}
                                value={features}
                                onChange={(e) => {
                                  const { checked, value } = e.target;
                                  setSaveservice(prev => {
                                    const updatedFeatures = checked
                                      ? [...prev.service.features, value]
                                      : prev.service.features.filter(f => f !== value);
                                    return {
                                      ...prev,
                                      service: { ...prev.service, features: updatedFeatures }
                                    };
                                  });
                                }}
                              />
                              <label className="form-check-label" htmlFor={`feature${index}`}>
                                {features}
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-start gap-3 gap-md-4 mt-4">
                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="serviceRadio"
                              value="Service"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="serviceRadio">
                              Service
                            </label>
                          </div>

                          <div className="d-flex align-items-center">
                            <input
                              className="me-2"
                              type="radio"
                              name="serviceInstall"
                              id="installRadio"
                              value="Installation"
                              onChange={(e) =>
                                setSaveservice((prev) => ({
                                  ...prev,
                                  service: {
                                    ...prev.service,
                                    type: e.target.value,
                                  },
                                }))
                              }

                            />
                            <label className="form-check-label mb-0" htmlFor="installRadio">
                              Installation
                            </label>
                          </div>
                        </div>



                      </div>
                    </div>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={uploadfile}>Submit</Button>
                <Button onClick={() => handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
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
      <Footer />
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default Service
