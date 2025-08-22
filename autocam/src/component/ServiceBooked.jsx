import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../cssfiles/booked.css';
import { deleteconfrimedorderAPI, deleteseviceAPI, getserviceOrderAPI, getServicesAPI, uploadconfrimOrderAPI } from '../server/allAPi';
import { ToastContainer, toast } from 'react-toastify';

function ServiceBooked() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [confrimedID, setconfrimedID] = useState([]);
  const [showConfirmedDelete, setShowConfirmedDelete] = useState(false);

  useEffect(() => {
    getservicebooked();
    getConfrimedorder();
  }, []);
    useEffect(() => {
      const token = sessionStorage.getItem('token')
      const userData = sessionStorage.getItem('user')
      const userRole = sessionStorage.getItem('userRole')
  
      if (!token) {
        toast.error('Please login to access admin panel')
        navigate('/login')
        return
      }
  
      if (userRole !== 'admin') {
        toast.error('Access denied. Admin privileges required.')
        navigate('/')
        return
      }
  
     
      
    }, [navigate])

  const getservicebooked = async () => {
    const res = await getServicesAPI();
    if (res.status === 200) {
      setServices(res.data);

      if (selectedType === 'Service') {
        const serviceData = res.data.filter(item => item.service.type === 'Service');
        setFiltered(serviceData);
      } else if (selectedType === 'Installation') {
        const installationData = res.data.filter(item => item.service.type === 'Installation');
        setFiltered(installationData);
      } else if (selectedType === 'Confirmed Orders') {
        const confirmedOrderIds = confrimedID.map(item => item.orderid);
        const confirmedServices = res.data.filter(service =>
          confirmedOrderIds.includes(service._id)
        );
        setFiltered(confirmedServices);
      } else {
        setFiltered([]);
      }
    } else {
      toast.error("API fetching failed");
    }
  };

  const servicedisplay = () => {
    const serviceData = services.filter(item => item.service.type === 'Service');
    setFiltered(serviceData);
    setSelectedType('Service');
    setShowConfirmedDelete(false);
  };

  const installationdisplay = () => {
    const installationData = services.filter(item => item.service.type === 'Installation');
    setFiltered(installationData);
    setSelectedType('Installation');
    setShowConfirmedDelete(false);
  };

  const confrimedplay = () => {
    const confirmedOrderIds = confrimedID.map(item => item.orderid);
    const confirmedServices = services.filter(service =>
      confirmedOrderIds.includes(service._id)
    );
    setFiltered(confirmedServices);
    setSelectedType('Confirmed Orders');
    setShowConfirmedDelete(true);
  };

  const handleDeleteService = async (id) => {
    try {
      const res = await deleteseviceAPI(id);
      if (res.status === 200) {
        toast.success("Service request rejected");
        getservicebooked();
      } else {
        toast.error("Failed to reject service");
      }
    } catch (err) {
      toast.error("Server error while rejecting");
      console.error(err);
    }
  };

const uploadconfrimeordr = async (id, email, customername, serviceName) => {
  console.log("Sending:", { id, email, customername, serviceName });
  try {
    const res = await uploadconfrimOrderAPI({
      orderid: id,
      email,
      customername,
      serviceName
    });

    if (res.status === 200 || res.status === 201) {
      toast.success("Order confirmed");
      await getConfrimedorder();
      await getservicebooked();
      if (selectedType === 'Confirmed Orders') confrimedplay();
    } else {
      toast.warning("Upload failed");
    }
  } catch (err) {
    toast.error("Server error");
    console.error("Upload failed:", err);
  }
};


  const getConfrimedorder = async () => {
    try {
      const res = await getserviceOrderAPI();
      if (res.status === 200) {
        setconfrimedID(res.data);
      } else {
        toast.error("API failed");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Server error while fetching confirmed orders");
    }
  };

const deleteConfirmedOrder = async (id) => {
  try {
    const res = await deleteconfrimedorderAPI(id);
    if (res.status === 200) {
      toast.success("Deleted successfully");

      await getConfrimedorder();
      await getservicebooked();

      // ✅ Re-filter after both states are updated
      if (selectedType === 'Confirmed Orders') {
        confrimedplay();
      }

    } else {
      toast.error("Delete failed");
    }
  } catch (err) {
    console.error("Delete confirmed order error:", err);
    toast.error("Server error while deleting");
  }
};
useEffect(() => {
  if (selectedType === 'Confirmed Orders') {
    confrimedplay();
  }
}, [confrimedID, services, selectedType]);

  
  return (
    <div className='bodie'>
      <div className="container py-4">
        <Link to={'/admin'} className="text-decoration-none mb-3 d-block">
          <h5><i className="fa-solid fa-arrow-left"></i> Back</h5>
        </Link>

        {/* Responsive Button Cards */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="rounded shadow text-center bg-white p-4 h-100" onClick={servicedisplay}>
              <h4 className="mb-0">Services</h4>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="rounded shadow text-center bg-white p-4 h-100" onClick={installationdisplay}>
              <h4 className="mb-0">Installation</h4>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="rounded shadow text-center bg-white p-4 h-100" onClick={confrimedplay}>
              <h4 className="mb-0">Confirmed Orders</h4>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className='bg-white rounded shadow p-3'>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Notes</th>
                  <th>Features</th>
                  <th>Selected Service</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.customername}</td>
                      <td>{item.customerPhoneNo}</td>
                      <td>{item.address}</td>
                      <td>{item.email}</td>
                      <td>{item.notes}</td>
                      <td>
                        <ul className="list-unstyled mb-0">
                          {item.service.features.map((feature, i) => (
                            <li key={i}>• {feature}</li>
                          ))}
                        </ul>
                      </td>
                      <td>{item.service.name}</td>
                      <td>
                        {showConfirmedDelete ? (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                              const matchedConfirm = confrimedID.find(c => c.orderid === item._id);
                              if (matchedConfirm) {
                                deleteConfirmedOrder(matchedConfirm._id);
                              } else {
                                toast.error("Confirm record not found");
                              }
                            }}
                          >
                            Delete Confirmed
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-danger btn-sm me-2 mb-1"
                              onClick={() => handleDeleteService(item._id)}
                            >
                              Delete
                            </button>
                            <button
  className="btn btn-success btn-sm mb-1"
  onClick={() =>
    uploadconfrimeordr(item._id, item.email, item.customername, item.service.name)
  }
>
  Confirm
</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No data selected</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default ServiceBooked;
