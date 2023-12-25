// AddProductForm.js
import {useFormik} from "formik"
import cloudinary from "cloudinary-core"
import Axios from "axios"
import { useState } from "react"
import { toast } from 'react-toastify'
import axios from "../../utils/baseUrl"
import {useNavigate} from "react-router-dom"
const cl=cloudinary.Cloudinary.new({cloud_name:'dhzusekrd'})
function AddProductForm({ onClose }) {
    const [image,setImage] = useState("")
    const [loading,setLoding] = useState(false)
    const navigate = useNavigate()
  // Add your logic for handling form submission here
  const handleChange = (event) =>{
    console.log(event,"event cominggggggggggg");
    let files = event.target.files[0];
     setImage(files)
   console.log(files,"file cominggggg");
 }
 const formik = useFormik({
    initialValues:{
        productName:"",
        category:"",
        productPrice : "",
        productImage: ""
    },
  onSubmit:async (values)=>{
    setLoding(true)
    const body = {
        productName : values.productName,
        category : values.category,
        productPrice : values.productPrice,
    }
    console.log(image,"image check statuss");
    if(image){
        console.log(image,"afterrrr");
        const formData = new FormData()
        formData.append('file', image);
        formData.append('upload_preset', 'image_preset')
        await  Axios.post('https://api.cloudinary.com/v1_1/dhzusekrd/image/upload', formData)
        .then(async (response) => {
            console.log(response.data.secure_url,";;;;;;;;;;");
          const fileUrls =response.data.secure_url;
            if(fileUrls){
                console.log(fileUrls,"aleeeeee");
             const data = {
                 productName:body.productName,
                 category:body.category,
                 productPrice:body.productPrice,
                 productImage:fileUrls
             }
         const response = await axios.post('/addProduct',data)
         console.log(response,"successfully product added");
         if(response.status===201){
            toast.success("product added")
            setLoding(false)
            onClose()
            
         }
         
            }
            
}).catch((err)=>{
        return {status:false,message:"Error add product",err}
    })
    
 

    }
    
  }
    
 })

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white w-96 p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        {/* Add your form elements here */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter product name"
              required
            />
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select your category
      </label>
      <select
        id="category"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange} // Using Formik's handleChange
        onBlur={formik.handleBlur}     // Using Formik's handleBlur
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Comics">Comics</option>
        <option value="Podcast">Podcast</option>
        <option value="Workshop">Workshop</option>
      </select>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
              Product Price
            </label>
            <input
              type="text"
              id="productPrice"
              name="productPrice"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter product price"
              required
            />
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
              Add Image
            </label>
            <input
              type="file"
              id="productImage"
              name="productImage"
        
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          {/* Add similar elements for price, category, and product image */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"            >
              {" "}
              {loading ? (
                <div className="flex items-center">
                  <div className="mr-2 border-t-2 border-r-2 border-b-2 border-blue-200 rounded-full w-6 h-6 border-t-blue-500 animate-spin" />
                  Adding...
                </div>
              ) : (
                "Add Product"
              )}
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
