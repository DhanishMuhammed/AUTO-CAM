import React, { useRef, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { deleteProductAPI, editeProductAPI, getProductAPI, uploadproductAPI } from '../server/allAPi'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
function Peoductsection() {
  const [options, setopations] = useState('')
  const [prddetails, setprdDetails] = useState({ images: "", prd_name: "", price: "", discription: "", prd_type: "", prd_img_priew: "" ,prdid:""})
  const [fileStatus, setFileStatus] = useState(false);
  const [prd_data, setprd_data] = useState([])
  const [filterddata, setFilterddata] = useState([])
  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  

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


  useEffect(() => {
    getproducts()
  }, [])


  // setting type and button and also display itemas

  const cctvSaving = () => {
    setopations('cctv')
    setprdDetails(data => ({ ...data, prd_type: "cctv" }))
  }
  const automateSaving = () => {
    setopations('automate')
    setprdDetails(data => ({ ...data, prd_type: "automate" }))
  }
  const IpcamSaving = () => {
    setopations('ipcam')
    setprdDetails(data => ({ ...data, prd_type: "ipcam" }))
  }


  // upload products
  const uploadProduct = async (e) => {
    e.preventDefault()
    const { images, prd_name, price, discription, prd_type } = prddetails

    if (!images || !discription || !prd_name || !price || !prd_type) {
      toast.error("fill the columns")
    } else {
      const uploadData = new FormData()
      uploadData.append("image", images)
      uploadData.append("description", discription)
      uploadData.append("price", price)
      uploadData.append("productname", prd_name)
      uploadData.append("productType", prd_type)
      const res = await uploadproductAPI(uploadData)
       getproducts()
       
      if (res.status == 200 || res.status == 201) {
        toast.success("product uploaded")
        setprdDetails({ images: "", prd_name: "", price: "", discription: "", prd_type: "", prd_img_priew: "",imagePreview:"" })
        document.querySelector('.image').value = ""
        document.querySelector('.prd_dicription').value = ""
        document.querySelector('.Prd_price').value = ""
        document.querySelector('.prd_name').value = ""
       
        setopations('')

      } else {
        toast.error("uploaded error")
      }

    }
  }

  useEffect(() => {
    if (!prddetails.images) return;

    if (
      prddetails.images.type === "image/jpg" ||
      prddetails.images.type === "image/png" ||
      prddetails.images.type === "image/jpeg"
    ) {
      const previewUrl = URL.createObjectURL(prddetails.images);
      setprdDetails(prev => ({ ...prev, prd_img_priew: previewUrl }));
      setFileStatus(false);
    } else {
      setprdDetails(prev => ({ ...prev, prd_img_priew: "" }));
      setFileStatus(true);
    }
  }, [prddetails.images]);

  // get product data

  const getproducts = async () => {
    const res = await getProductAPI()
    try {
      if (res.status == 200) {
        setprd_data(res.data)
        setFilterddata(res.data)
        

      } else {
        toast.error("faild fetching")
      }
    } catch (err) {
      console.log("failed fetching", err);
    }
  }

  const filteredProducts = prd_data.filter(
    item => item.productType === options
  );

  // delete products

  const deleteproducts = async (id) => {
    const res = await deleteProductAPI(id)
    if (res.status === 200) {
      toast.success("product deleted")
      getproducts()
    } else {
      toast.error("deleting failed")
    }
  }


  // edite seccion

  const handleEdit = (id) => {
  const selectedItem = prd_data.find(prod => prod._id === id);
  console.log("Selected item:", selectedItem); // Debug
  if (selectedItem) {
    setprdDetails({
      prd_name: selectedItem.productname  || '',
      discription: selectedItem.description  || '',
      price: selectedItem.price || '',
      prd_img_priew: `https://auto-cam-backend.onrender.com/uploads/products/${selectedItem.productImage}`,
      prdid:selectedItem._id
     
    });
    setopations('editprd')
  } else {
    console.error("Product not found");
  }
};


const editeprd = async () => {
  if (!prddetails.prd_name || !prddetails.price || !prddetails.discription) {
    alert("Please fill all required fields");
    return;
  }else{
    const formData = new FormData();
  formData.append("productname", prddetails.prd_name);
  formData.append("description", prddetails.discription);
  formData.append("price", prddetails.price);

  // Only append image if user uploaded a new one
  if (prddetails.images) {
    formData.append("image", prddetails.images);
    
  }
try{
    const res= await editeProductAPI(prddetails.prdid,formData)
console.log(prddetails.prdid);

  if(res.status==200){
    toast.success("edited products success")
  }else{
    toast.success("somthing error")
  }
  setprdDetails({ images: "", prd_name: "", price: "", discription: "", prd_type: "", prd_img_priew: "" ,prdid:""})
    document.querySelector('.image').value = ""
        document.querySelector('.prd_dicription').value = ""
        document.querySelector('.Prd_price').value = ""
        document.querySelector('.prd_name').value = ""

        setopations('')
  getproducts()
}catch(err){


  console.log("the updation error is",err);
  
}
  }
};


  return (
  <div>
  <div className="container">
    <Link to={'/edits'} style={{ textDecoration: "none" }}>Back to edites</Link>

    {/* Selection Row */}
    <div className="row justify-content-between p-3">
      <div className="col-12 col-md-4 mb-3" onClick={() => cctvSaving()}>
        <div className="rounded shadow text-center p-3 h-100">
          <h4>CCTV</h4>
        </div>
      </div>

      <div className="col-12 col-md-4 mb-3" onClick={() => automateSaving()}>
        <div className="rounded shadow text-center p-3 h-100">
          <h4>Automation</h4>
        </div>
      </div>

      <div className="col-12 col-md-4 mb-3" onClick={() => IpcamSaving()}>
        <div className="rounded shadow text-center p-3 h-100">
          <h4>IP Camera</h4>
        </div>
      </div>
    </div>

    {/* Entry Form Section */}
    <div className='d-flex justify-content-center'>
      <div className="row w-100">
        {/* Left Form */}
        <div className="col-12 col-md-6 mb-4">
          <input
            type="file"
            className='form-control m-2 image'
            onChange={e =>
              setprdDetails(prev => ({
                ...prev,
                images: e.target.files[0],
                prd_img_priew: URL.createObjectURL(e.target.files[0])
              }))
            }
          />
          <input type="text" className='form-control m-2' placeholder='Product Name' value={prddetails.prd_name} onChange={e => setprdDetails({ ...prddetails, prd_name: e.target.value })} />
          <input type="text" className='form-control m-2' placeholder='Product Description' value={prddetails.discription} onChange={e => setprdDetails({ ...prddetails, discription: e.target.value })} />
          <input type="number" className='form-control m-2' placeholder='Product Price' value={prddetails.price} onChange={e => setprdDetails({ ...prddetails, price: e.target.value })} />
        </div>

        {/* Right Preview Card */}
        <div className="col-12 col-md-6">
          <Card style={{ width: '100%', height: 'auto' }}>
            {prddetails.prd_img_priew && (
              <Card.Img
                variant="top"
                src={prddetails.prd_img_priew}
                style={{ height: "200px", width: "50%", }}
                alt="Product preview"
              />
            )}
            <Card.Body className="d-flex flex-column align-items-center">
              {prddetails.discription && prddetails.prd_name && (
                <Card.Title className='text-center'>{prddetails.prd_name}</Card.Title>
              )}
              <Card.Text>{prddetails.discription}</Card.Text>
              <h4 className='fw-bolder text-danger'>₹{prddetails.price}</h4>
              {fileStatus && <p className='text-danger'>Please upload png/jpg/jpeg only</p>}
            </Card.Body>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="col-12 d-flex justify-content-end mt-3">
          {(options === 'cctv' || options === 'ipcam' || options === 'automate') && (
            <button className='btn btn-warning' onClick={uploadProduct}>Save</button>
          )}

          {options === 'editprd' && (
            <button className='btn btn-warning' onClick={editeprd}>Save Update</button>
          )}

          {!options && (
            <h6 className='text-danger ms-auto'>Please select one option</h6>
          )}
        </div>
      </div>
    </div>

    {/* Product List Table */}
    <div className="container mt-5">
      <div className="row fw-bold border-bottom pb-2 d-none d-md-flex">
        <div className="col">Image</div>
        <div className="col">Product Name</div>
        <div className="col">Description</div>
        <div className="col">Price</div>
        <div className="col">Type</div>
        <div className="col">Actions</div>
      </div>

      {filteredProducts.map((item, i) => (
        <div key={i} className="row py-2 align-items-center border-bottom">
          <div className="col-12 col-md">
            <img
              src={`http://localhost:4000/uploads/products/${item.productImage}`}
              alt={item.productname}
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md">{item.productname}</div>
          <div className="col-12 col-md">{item.description}</div>
          <div className="col-12 col-md">₹{item.price}</div>
          <div className="col-12 col-md">{item.productType}</div>
          <div className="col-12 col-md">
            <button className="btn btn-sm btn-primary me-2 mb-2" onClick={() => handleEdit(item._id)}>Edit</button>
            <button className="btn btn-sm btn-danger mb-2" onClick={() => deleteproducts(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>

  <ToastContainer autoClose={3000} />
</div>


  )
}

export default Peoductsection
