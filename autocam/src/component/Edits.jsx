import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadBannerAPI, getBannerAPI, deleteBannerAPI } from '../server/allAPi';
import { server_url } from '../server/serverUrl';

function Edits() {
  const [activeModal, setActiveModal] = useState(null);
  const [homebanner, setHomebanner] = useState({ image: "", preview: "" });
  const [fileStatus, setFileStatus] = useState(false);
  const [banners, setBanners] = useState([]);
  const server_url="http://localhost:4000" 

  const handleShow = (modalId) => {
    setActiveModal(modalId);
  };

  const handleClose = () => {
    setActiveModal(null);
    setHomebanner({ image: "", preview: "" });
    setFileStatus(false);
  };

  useEffect(() => {
    if (!homebanner.image) return;

    if (
      homebanner.image.type === "image/jpg" ||
      homebanner.image.type === "image/png" ||
      homebanner.image.type === "image/jpeg"
    ) {
      const previewUrl = URL.createObjectURL(homebanner.image);
      setHomebanner(prev => ({ ...prev, preview: previewUrl }));
      setFileStatus(false);
    } else {
      setHomebanner(prev => ({ ...prev, preview: "" }));
      setFileStatus(true);
    }
  }, [homebanner.image]);


  // display bannner in modal
  useEffect(() => {
    getAllBanners();
  }, []);

  const getAllBanners = async () => {
    const res = await getBannerAPI();
    if (res.status === 200) {
      setBanners(res.data);
    } else {
      toast.error("Failed to fetch banners");
    }
  };

  // save banner function
  const savebanner = async (e) => {
    e.preventDefault();
    const { image } = homebanner;

    if (!image) {
      toast.error("Please upload an image");
    } else {
      const formData = new FormData();
      formData.append("image", image);
      const res = await uploadBannerAPI(formData);

      if (res.status === 200 || res.status=== 201) {
        toast.success("Banner uploaded");
        handleClose();
        // setHomebanner({ image: "", preview: "" });
        getAllBanners();
      } else {
        toast.error("Upload failed");
      }
    }
  };

  const deleteBanner = async (id) => {
    const res = await deleteBannerAPI(id);
    if (res.status === 200) {
      toast.success("Banner deleted");
      getAllBanners();
    } else {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
  console.log('Banners data:', banners);
  banners?.forEach(banner => {
    console.log('Banner imageUrl:', banner.imageUrl);
  });
}, [banners]);

  return (
    <>
      <div className='container mt-5'>
        <Link to={'/admin'} style={{ textDecoration: "none" }}>Back to admin</Link>

        <div className='mt-5'>
          <div className='d-flex gap-5 flex-wrap'>
            {/* Home Page Banner */}
            <div className="w-25">
              <h5 className='border rounded shadow p-4 text-center' onClick={() => handleShow('homeBanner')}>
                Home Page Banner
              </h5>
              <Modal show={activeModal === 'homeBanner'} onHide={handleClose}
               
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Home Page Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className='mb-3'>
                    <input
                      type="file"
                      className='form-control'
                      onChange={e => setHomebanner({ ...homebanner, image: e.target.files[0] })}
                    />
                    {homebanner.preview && (
                      <img src={homebanner.preview} width={100} className='mt-3' alt="preview" />
                    )}
                    {fileStatus && <p className='text-danger'>Please upload png/jpg/jpeg only</p>}
                  </div>

                  <hr />
                  <h6>Uploaded Banners:</h6>
                 <div className='d-flex gap-3 flex-wrap'>
  {banners?.map((bannerimage) => (
    <div key={bannerimage._id} className='text-center'>
      <img
        src={`${server_url}/uploads/${bannerimage.imageUrl}`}  // ✅ fixed
        width="100"
        height={200}
        className='border'
        alt="Banner"
      />
      <Button
        size='sm'
        variant='danger'
        className='mt-2 d-block mx-auto'
        onClick={() => deleteBanner(bannerimage._id)}
      >
        Delete
      </Button>
    </div>
  ))}
</div>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button variant="primary" onClick={savebanner}>Save Changes</Button>
                </Modal.Footer>
              </Modal>
            </div>

            {/* Other sections (optional placeholders) */}
            <div className="w-25">
              <h5 className='border rounded shadow p-4 text-center' onClick={() => handleShow('movingProduct')}>
                Home Page Moving Product
              </h5>
              <Modal show={activeModal === 'movingProduct'} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Moving Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Content for Moving Product</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
              </Modal>
            </div>

            <div className="w-25">
              <h5 className='border rounded shadow p-4 text-center' onClick={() => handleShow('productBanner')}>
                Product Page Banner
              </h5>
              <Modal show={activeModal === 'productBanner'} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Product Page Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>Content for Product Page Banner</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={3000} />
    </>
  );
}

export default Edits;
