import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadBannerAPI, getBannerAPI, deleteBannerAPI, uploadproductAPI, getProductAPI, deleteProductAPI,UploadwhatsnewAPI, getWhatsnewAPI, deletwhastnewAPI } from '../server/allAPi';

function Edits() {
  const [activeModal, setActiveModal] = useState(null);
  const [homebanner, setHomebanner] = useState({ image: "", preview: "" });
  const [fileStatus, setFileStatus] = useState(false);
  const [banners, setBanners] = useState([]);
  const [whatsPost,setWhtaspost]=useState({imageUrl:"",priview:""})
  const [whatsnewData,setWhatsnewData]=useState([])
  const server_url="http://localhost:4000" 
const navigate = useNavigate()

  const [prd,setprd]=useState([])

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


  const handleShow = (modalId) => {
    setActiveModal(modalId);
  };

  const handleClose = () => {
    setActiveModal(null);
    setHomebanner({ image: "", preview: "" });
    setFileStatus(false);
    
    setWhtaspost({imageUrl:"",priview:""})
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
  
   getwhatsnew();
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


  // product section




  





// upload whats new products

const uploadWhatsnew = async () => {
  if (!whatsPost.imageUrl) {
    alert("Please select an image.");
    return;
  }

  const formData = new FormData();
  formData.append("image", whatsPost.imageUrl);  // This must match multer's `.single('image')`
 

  try {
    const response = await UploadwhatsnewAPI(formData);
    console.log("Upload success:", response.data);
    toast.success("Banner uploaded successfully")
    handleClose()
    getwhatsnew()
  } catch (error) {
    console.error("Upload failed:", error);
   toast.error("Upload failed. Check console for details")
  }
};

  useEffect(() => {
    if (!whatsPost.imageUrl) return;

    if (
      whatsPost.imageUrl.type === "image/jpg" ||
      whatsPost.imageUrl.type === "image/png" ||
      whatsPost.imageUrl.type === "image/jpeg"
    ) {
      const previewUrl = URL.createObjectURL(whatsPost.imageUrl);
      setWhtaspost(prev => ({ ...prev, priview: previewUrl }));
      setFileStatus(false);
    } else {
      setWhtaspost(prev => ({ ...prev, priview: "" }));
      setFileStatus(true);
    }
  }, [whatsPost.imageUrl]);




// get whats new 

const getwhatsnew= async()=>{
  const res= await getWhatsnewAPI()
  if(res.status==200){
    setWhatsnewData(res.data)
  }else{
    toast.warning("fatchin faild")
  }
}

// delete whats new

const deletewhatsnew=async(id)=>{
  const res= await deletwhastnewAPI(id)
  if(res.status==200){
    toast.success("delete success")
    getwhatsnew()
  }else{
    toast.error("somthing error")
  }
}



  return (
    <div>
  <div className='container mt-5'>
    <Link to={'/admin'} style={{ textDecoration: "none" }}>Back to admin</Link>

    <div className='mt-5'>
      <h1 className="text-center">Manage your website</h1>

      <div className='row gap-4 justify-content-center mt-5'>
        {/* Home Page Banner */}
        <div className="col-12 col-md-6 col-lg-4 border rounded shadow text-center p-4 ">
          <i className="fa-solid fa-image fa-2xl"></i>
          <h5 className='p-4 text-center' onClick={() => handleShow('homeBanner')}>
            Home Page Banner
          </h5>
          <Modal show={activeModal === 'homeBanner'} onHide={handleClose} size="lg" centered>
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
                      src={`${server_url}/uploads/${bannerimage.imageUrl}`}
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

        {/* Product Whats New */}
        <div className="col-12 col-md-6 col-lg-4 border rounded shadow p-4 text-center">
          <i className="fa-solid fa-truck-fast fa-2xl"></i>
          <h5 className='mt-4' onClick={() => handleShow('movingProduct')}>
            Product What's New
          </h5>
          <Modal show={activeModal === 'movingProduct'} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>What's New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <input
                  type="file"
                  className='form-control'
                  onChange={e => setWhtaspost({ ...whatsPost, imageUrl: e.target.files[0] })}
                />
                {whatsPost.priview && (
                  <img src={whatsPost.priview} width={100} className='mt-3' alt="preview" />
                )}
                {fileStatus && <p className='text-danger'>Please upload png/jpg/jpeg only</p>}
              </div>

              <hr />
              <h6>Uploaded Banners:</h6>
              <div className='d-flex gap-3 flex-wrap'>
                {whatsnewData?.map((bannerimage) => (
                  <div key={bannerimage._id} className='text-center'>
                    <img
                      src={`${server_url}/uploads/whatsnew/${bannerimage.imageUrl}`}
                      width="100"
                      height={200}
                      className='border'
                      alt="Banner"
                    />
                    <Button
                      size='sm'
                      variant='danger'
                      className='mt-2 d-block mx-auto'
                      onClick={() => deletewhatsnew(bannerimage._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" onClick={uploadWhatsnew}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Products */}
        <div className="col-12 col-md-6 col-lg-4 border rounded shadow p-4 text-center">
          <i className="fa-solid fa-layer-group fa-2xl"></i>
          <Link to={'/productsecsion'} style={{textDecoration:"none",color:"black"}}>
            <h5 className='mt-4'>Products</h5>
          </Link>
         
        </div>
      </div>
    </div>
  </div>

  <ToastContainer autoClose={3000} />
</div>

  );
}

export default Edits;
