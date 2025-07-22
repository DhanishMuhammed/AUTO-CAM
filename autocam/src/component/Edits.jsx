import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadBannerAPI, getBannerAPI, deleteBannerAPI, uploadproductAPI, getProductAPI, deleteProductAPI } from '../server/allAPi';
import { server_url } from '../server/serverUrl';
import { Card } from 'react-bootstrap';

function Edits() {
  const [activeModal, setActiveModal] = useState(null);
  const [homebanner, setHomebanner] = useState({ image: "", preview: "" });
  const [fileStatus, setFileStatus] = useState(false);
  const [banners, setBanners] = useState([]);
  const server_url="http://localhost:4000" 

  const [products,setProducts]=useState({
    prd_image:"",prd_name:"",prd_description:"",prd_price:"",prd_img_priew:""
  })
  const [prd,setprd]=useState([])



  const handleShow = (modalId) => {
    setActiveModal(modalId);
  };

  const handleClose = () => {
    setActiveModal(null);
    setHomebanner({ image: "", preview: "" });
    setFileStatus(false);
    setProducts({  prd_image:"",prd_name:"",prd_description:"",prd_price:"",prd_img_priew:""})
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
   getproducts()
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


// upload products
 const uploadProduct = async (e)=>{
  e.preventDefault()
  const {prd_image,prd_name,prd_price,prd_description}= products

  if( !prd_image || !prd_description || !prd_name || !prd_price){
    toast.error("fill the columns")
  }else{
    const uploadData= new FormData()
    uploadData.append("image",prd_image)
    uploadData.append("description",prd_description)
    uploadData.append("price",prd_price)
    uploadData.append("productname",prd_name)
    const res= await uploadproductAPI(uploadData)

      if(res.status==200 || res.status==201){
        toast.success("product uploaded")
        handleClose()
        //  setProducts({  prd_image:"",prd_name:"",prd_description:"",prd_price:"",prd_img_priew:""})
        getproducts()
      }else{
        toast.error("uploaded error")
      }

  }
 }

  useEffect(() => {
    if (!products.prd_image) return;

    if (
      products.prd_image.type === "image/jpg" ||
      products.prd_image.type === "image/png" ||
      products.prd_image.type === "image/jpeg"
    ) {
      const previewUrl = URL.createObjectURL(products.prd_image);
      setProducts(prev => ({ ...prev, prd_img_priew: previewUrl }));
      setFileStatus(false);
    } else {
      setProducts(prev => ({ ...prev, prd_img_priew: "" }));
      setFileStatus(true);
    }
  }, [products.prd_image]);


// get products

const getproducts= async()=>{
  const res=  await getProductAPI();
  if (res.status===200){
    setprd(res.data)
  }else{
    toast.error("get products error")
  }
}

// delete products

const deleteproducts = async(id)=>{
  const res = await  deleteProductAPI(id)
  if(res.status===200){
    toast.success("product deleted")
    getproducts()
  }else{
    toast.error("deleting failed")
  }
}





  return (
    <div >
      <div className='container mt-5'>
        <Link to={'/admin'} style={{ textDecoration: "none" }}>Back to admin</Link>

        <div className='mt-5'>
           <h1 className="text-center">
                 Manage your webite
            </h1>
          <div className='d-flex gap-5 flex-wrap mt-5 justify-content-center'>
           


            {/* Home Page Banner */}


            <div className="w-25 border rounded shadow text-center p-4">
              <i class="fa-solid fa-image fa-2xl"></i>
              <h5 className='p-4 text-center' onClick={() => handleShow('homeBanner')}>
                
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

            {/* Other sections (optional placeholders) */}
            <div className="w-25border rounded shadow p-4 text-center">
              <i class="fa-solid fa-truck-fast fa-2xl"></i>
              <h5 className='mt-4' onClick={() => handleShow('movingProduct')}>
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

            {/* products */}

            <div className="w-25 border rounded shadow p-4 text-center">
              <i class="fa-solid fa-layer-group fa-2xl"></i>
              <h5 className='mt-4' onClick={() => handleShow('productBanner')}>
                Products
              </h5>
              <Modal show={activeModal === 'productBanner'} onHide={handleClose}   
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
                <Modal.Header closeButton>
                  <Modal.Title>Product Page Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                   <div className="text-center col-6 ">
                  <input
                      type="file"
                      className='form-control m-2'
                      onChange={e=>setProducts({prd_image:e.target.files[0]})}
                    />
                    <input type="text" className='form-control  m-2' onChange={e => setProducts({ ...products, prd_name: e.target.value })}  placeholder='product name' />
                    <input type="text" className='form-control  m-2' onChange={e=>setProducts({...products,prd_description:e.target.value})} placeholder='product description' />
                    <input type="number" className='form-control  m-2' onChange={e=> setProducts({...products,prd_price:e.target.value})}  placeholder='product price' />
                </div>
                <div className="col-6">
                  <Card style={{ width: '17rem', height: '300px' }}>
          {products.prd_img_priew &&
           ( <Card.Img height={'200px'} width={100} variant="top" src={products.prd_img_priew} />)}
          <Card.Body className="d-flex flex-column align-items-center">
            {products.prd_description&&products.prd_name&&
            (<Card.Title className='text-center'>{products.prd_name}</Card.Title>)}
            <Card.Text>
              {products.prd_description}
            </Card.Text>
            <h3 className='fw-bolder text-danger'>{products.prd_price}</h3>
            {fileStatus && <p className='text-danger'>Please upload png/jpg/jpeg only</p>}
          
          </Card.Body>
        </Card>
                </div>
                </div>
<div className='table-responsive'>
  <table className="table">
    <thead>
      <tr>
        <th>S.no</th>
        <th>Product Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {prd.map((prd, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{prd.productname}</td>
          <td><img src={`${server_url}/uploads/products/${prd.productImage}`} width={50} height={50} alt="" /></td>
          <td>
            <button
              className='btn btn-danger btn-sm '
              onClick={() => deleteproducts(prd._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


               

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button variant="primary" onClick={uploadProduct}>Save Changes</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default Edits;
