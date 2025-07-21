import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { deleteCartItemAPI, getCartItemsAPI, getProductAPI } from '../server/allAPi';
import { toast, ToastContainer } from 'react-toastify';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const server_url = "http://localhost:4000";

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

          const enrichedCart = userCartItems.map(cartItem => {
            const prodId = cartItem.productId._id || cartItem.productId;
            const fullProduct = products.find(p => p._id === prodId);
            return {
              ...cartItem,
              productData: fullProduct
            };
          });

          setCartItems(enrichedCart);
        } else {
          toast.error("Failed to load cart items");
        }
      } catch (error) {
        toast.error("Error loading cart");
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

  return (
    <div className='bodi'>
      <Header />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className='table-responsive shadow'>
              <table className='table table-bordered align-middle text-center'>
                <thead className="">
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
                        <td className="text-wrap">{item.productData?.productname || 'Product not found'}</td>
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
                        <td>${item.productData?.price || 0}</td>
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
            </div>

            <div className='d-flex justify-content-between flex-wrap gap-2 mt-4'>
              <Link to={'/products'}>
                <button className='btn btn-success w-100 w-md-auto'>Shop More</button>
              </Link>
              <button className='btn btn-danger w-100 w-md-auto'>Empty Cart</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={3000} />
      
    </div>
  );
}

export default Cart;
