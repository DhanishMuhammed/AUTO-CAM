import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { createOrderAPI, deleteCartItemAPI, getCartItemsAPI, getProductAPI, verifyPaymentAPI } from '../server/allAPi';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentdetails, setPaymentdetails] = useState({
    Username: "", phonenumber: "", email: "", address: "", price: "", products: []
  });
  const [modalShow, setModalShow] = useState(false);
  const server_url = "https://auto-cam-backend.onrender.com";

  console.log("details",cartItems);
  

  useEffect(() => {
  const fetchAll = async () => {
    try {
      const userDataString = sessionStorage.getItem("user");
      if (!userDataString) {
        toast.error("Please login to view cart");
        return;
      }

      const userData = JSON.parse(userDataString);
      if (!userData._id) {
        toast.error("Invalid user data");
        return;
      }

      const prodRes = await getProductAPI();
      const cartRes = await getCartItemsAPI(userData._id);

      if (prodRes?.data && cartRes?.data) {
        const products = prodRes.data;
        const userCartItems = cartRes.data;

        const enrichedCart = userCartItems
          .filter(cartItem => cartItem.productId) //  skip invalid items
          .map(cartItem => {
            const prodId = cartItem.productId;
            const fullProduct = products.find(
              p => p._id?.toString() === prodId?.toString()
            );

            return {
              ...cartItem,
              productData: cartItem.productId // still return it if product missing
            };
          });

        setCartItems(enrichedCart);
      } else {
        toast.error("Failed to load cart items");
      }
    } catch (error) {
      console.log("Error loading cart", error);
    }
  };

  fetchAll();
}, []);


  // Delete cart item
  const hancledelete = async (productId) => {
    const userDataString = sessionStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const userId = userData._id;

    const res = await deleteCartItemAPI(userId, productId);
    if (res.status === 200) {
      toast.success("Item removed");
      setCartItems(prev =>
        prev.filter(item => {
          const id = item.productId._id || item.productId;
          return id !== productId;
        })
      );
    } else {
      toast.error("API failed");
    }
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => {
    const price = item.productData?.price || 0;
    return acc + (price * item.quantity);
  }, 0);

  // Buy method
  const payment = (totalAmount, cartItems) => {
    const productsList = cartItems.map(item => ({
      productName: item.productData?.productname || "Unnamed Product",
      quantity: item.quantity || 1,
    }));

    setPaymentdetails(prev => ({
      ...prev,
      price: totalAmount,
      products: productsList,
    }));

    setModalShow(true);
  };

  // Validate email against allowed domains
const isValidEmail = (email) => {
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  const trimmedEmail = email.trim().toLowerCase();
  const parts = trimmedEmail.split("@");
  return parts.length === 2 && allowedDomains.includes(parts[1]);
};

// Validate 10-digit Indian phone numbers
const isValidPhoneNumber = (phone) => {
  const phoneStr = phone.toString().trim();
  return /^[6-9]\d{9}$/.test(phoneStr);
};

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAdd = async () => {
     const userData = JSON.parse(sessionStorage.getItem("user"));
    const { Username, email, phonenumber, address, price, products } = paymentdetails;

     // Validation
  if (!Username || !email || !phonenumber || !address) {
    toast.warning("Please fill in all required fields");
    return;
  }

  if (!isValidEmail(email)) {
    toast.warning("Please enter a valid email (e.g., gmail.com, yahoo.com)");
    return;
  }

  if (!isValidPhoneNumber(phonenumber)) {
    toast.warning("Please enter a valid 10-digit phone number");
    return;
  }
try{
  // Proceed to create Razorpay order
  const res = await createOrderAPI({ amount: price }); 
  const { id: order_id, amount } = res.data.order;

  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    toast.error("Failed to load Razorpay. Please try again later.");
    return;
  }
    const options = {
      key: "rzp_test_hKZPC8dz3sXXUm", // Replace with actual key
      amount: amount.toString(),
      currency: "INR",
      name: "Auto cam",
      description: "Order Payment",
      order_id,
       handler: async function (response) {
        // ✅ Restore scroll after payment success
        document.body.style.overflow = "auto";

        try {
          const verifyRes = await verifyPaymentAPI({
            ...response,
            Username,
            Userid: userData._id,
            phonenumber,
            address,
            payment: price,
            email,
            products
          });

          if (verifyRes.status === 200) {
            toast.success("Payment Successful!");
          setPaymentdetails({
      Username: "", phonenumber: "", email: "", address: "", price: "", products: []
    });
    setModalShow(false);
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          toast.error("Payment verification error");
        }
      },
      prefill: {
        name: Username,
        email,
        contact: phonenumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);

    
    razor.on("payment.failed", function () {
      document.body.style.overflow = "auto";
    });

    razor.on("external_wallet", function () {
      document.body.style.overflow = "auto";
    });

    razor.open();

   
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000);
  } catch (error) {
    toast.error("Order creation failed");
  }
};

  return (
    <div className='bodis'>


      <Header />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className='table-responsive shadow'>
              <table className='table table-bordered align-middle text-center'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <tr key={item._id || index}>
                        <td>{index + 1}</td>
                        <td>{item.productData?.productname || 'Product not found'}</td>
                        <td>
                          {item.productData?.productImage ? (
                            <img
                              src={`${server_url}/uploads/products/${item.productData.productImage}`}
                              className="img-fluid rounded"
                              style={{ maxWidth: "100px", height: "auto" }}
                              alt={item.productData.productname}
                            />
                          ) : (
                            <span>No image</span>
                          )}
                        </td>
                        <td>{item.quantity}</td>
                        <td>₹ {item.productData?.price || 0}</td>
                        <td>
                          <button className='btn btn-sm btn-danger' onClick={() => hancledelete(item.productData._id)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Your cart is empty
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {cartItems.length > 0 && (
                <div className="text-end p-3 fw-bold fs-5 border-top">
                  Total Amount: ₹ {totalAmount.toFixed(2)}
                </div>
              )}
            </div>

            <div className='d-flex justify-content-end flex-wrap ms-auto gap-2 mt-4'>
              <Link to={'/products'}>
                <button className='btn btn-success w-100 w-md-auto'>Shop More</button>
              </Link>
              <button className='btn btn-warning w-25 w-md-auto ms-auto mt-2' onClick={() => payment(totalAmount, cartItems)}>Buy</button>
              <button className='btn btn-danger w-100 w-md-auto'>Empty Cart</button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal show={modalShow} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col-6">
              <label>Name</label>
              <input type="text" className='form-control' onChange={e => setPaymentdetails({ ...paymentdetails, Username: e.target.value })} />
              <label>Phone Number</label>
              <input type="number" className='form-control' onChange={e => setPaymentdetails({ ...paymentdetails, phonenumber: e.target.value })} />
              <label>Address</label>
              <input type="text" className='form-control' onChange={e => setPaymentdetails({ ...paymentdetails, address: e.target.value })} />
            </div>
            <div className="col-6">
              <label>E-mail</label>
              <input type="email" className='form-control' onChange={e => setPaymentdetails({ ...paymentdetails, email: e.target.value })} />
              <label>Products</label>
              <ul className="list-group mb-2">
                {paymentdetails.products.map((item, idx) => (
                  <li key={idx} className="list-group-item">
                    {item.productName} x {item.quantity}
                  </li>
                ))}
              </ul>
              <label>Price</label>
              <input type="text" className='form-control' value={paymentdetails.price} readOnly />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
          <Button onClick={handleAdd} variant="warning" className='w-100 fw-bolder text-light'>Buy</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default Cart;
