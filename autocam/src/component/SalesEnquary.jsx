import React from 'react'
import { Form, Button } from 'react-bootstrap'

function SalesEnquiry() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="container p-4 border rounded shadow" style={{ maxWidth: '600px' }}>
          <h2 className='text-center mb-4'>Contact Sales</h2>
          
          <h3>User Type</h3>
          <div className="mb-3">
            <label className="me-3">
              <input type="radio" name="type" className="me-1" /> Personal
            </label>
            <label>
              <input type="radio" name="type" className="me-1" /> Business
            </label>
          </div>
          
          <h4>What can we help you with?</h4>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter your message here..." />
          </Form.Group>
          
          <h4>How can we reach you?</h4>
          <Form>
            <div className="d-flex justify-content-between">
              <Form.Group className="mb-3 w-50 me-2" controlId="firstName">
                <Form.Label></Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>
              <Form.Group className="mb-3 w-50" controlId="lastName">
                <Form.Label></Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </div>
            
            <Form.Group className="mb-3 d-flex" controlId="email">
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
              <Form.Control type="tel" placeholder="Enter your phone number" />
            </Form.Group>

            <div className="d-lfex text-danger">
            <input  type="checkbox" /> 
            Yes, I would like to subscribe to newsletters and be informed of new products, services and surveys from Hikvision

           
            </div>
            <br />
             I confirm that I have read and agreed to the <span> <a href=""> privacy policy.</a></span>
            
            
            
            <div  className=" mt-5 w-100">
              <Button className='w-100' variant="success" type="submit">Submit</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SalesEnquiry