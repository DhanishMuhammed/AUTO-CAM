import React, { useEffect, useState } from 'react';
import { getpaymentsAPI } from '../server/allAPi';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Payedproducts() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getpayedorders();
  }, []);

  const userData = JSON.parse(sessionStorage.getItem("user"));
  const userId = userData?._id;

  const getpayedorders = async () => {
    try {
      const res = await getpaymentsAPI();
      if (res.status === 200 || res.status === 201) {
        // ✅ Filter orders by logged-in user's ID
        const filtered = res.data.filter(order => order.Userid === userId);
        setOrders(filtered);
      } else {
        toast.warning("Fetching failed");
      }
    } catch (err) {
      console.log("Fetching error", err);
    }
  };

  return (
    <div className="container mt-3">
      <Link to="/" className="text-decoration-none mb-3 d-block">
        <h5><i className="fa-solid fa-arrow-left"></i> Back</h5>
      </Link>

<h1 className='text-center'>Order summery</h1>
      {orders.length === 0 ? (
        <p>No paid products found for this user.</p>
      ) : (
        <div className="d-flex flex-column gap-3 mt-5">
          {orders.map((order, index) => (
            <div key={index} className="p-3 shadow rounded bg-light">
              <h6 className="mb-2">Order #{index + 1}</h6>
              {order.products.map((item, idx) => (
                <div key={idx} className="row mb-2">
                  <div className="col-md-3">
                    <strong>Item:</strong> {item.productName}
                  </div>
                  <div className="col-md-2">
                    <strong>Qty:</strong> {item.quantity}
                  </div>
                  <div className="col-md-3">
                    <strong>Paid:</strong> ₹{order.payment}
                  </div>
                  <div className="col-md-3">
                    <strong>Status:</strong> <span className="text-success">Processing</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Payedproducts;
