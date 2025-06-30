import React from 'react'
import { Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';

function View() {

    const navigate = useNavigate()

    const handleSales =()=>{
        navigate('/sales')
    }
  return (
    <>
   <div className="container my-5 border border-1 border-dark rounded shadow ">
    <div className="row">
        <h1 className='mb-3 mt-4 text-danger fw-bolder'>CP-UNC-TA21PL3-Y</h1>
        <div className="col-lg-6">     
        <img className='my-2 rounded shadow mb-4' width="100%" height={'400px'}  src='https://domar.com/cdn/shop/files/rx4h4z-google.jpg?v=1737719395&width=1000'>
        </img>
        </div>
        <div className="col-lg-6 justify-content-start mt-4">
    <div className='text-center'>
        <h3>CP-UNC-TA21PL3-Y</h3>
        <p>2MP Full HD IR Network Bullet Camera - 30Mtr.</p>
        <hr />
        <ul>
            <li>1/3.2” 2MP PS CMOS Image Sensor (0.7937cm)</li>
            <li>Max. 2MP (1920 × 1080) @ 25/30fps</li>
            <li>Instastream, H.265 and Smart H.264+ dual-stream encoding</li>
            <li>DWDR, Day/Night (ICR), 3D-DNR, ROI, AWB, AGC, BLC, HLC</li>
            <li>3.6mm fixed lens</li>
            <li>IR Range of 30 Mtrs, IP67, PoE</li>
            <li><strong>Mobile Software:</strong> iCMOB, gCMOB</li>
            <li><strong>CMS Software:</strong> KVMS Pro</li>
        </ul>
        <hr />
        <div className="d-flex gap-3 p-2">
    <Button className="w-30 btn btn-success d-flex align-items-center gap-2 ms-3">
        Data Sheet
    </Button>
    <Button onClick={handleSales} className="w-30 btn btn-danger d-flex align-items-center gap-2">
         Sales Enquiry
    </Button>
</div>
<h6 style={{marginLeft:'-290px'}} className='mt-3 justify-content-start'>To Explore More<a href="/products"> View more.</a> </h6> 
</div>


        </div>

    </div>
      </div>
    </>
  )
}

export default View
