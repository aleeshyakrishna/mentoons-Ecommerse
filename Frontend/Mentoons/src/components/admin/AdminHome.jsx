import { useEffect, useState } from "react";
import AddProductForm from "./AddProduct";
import axios from '../../utils/baseUrl';

function AdminHome() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/getProduct');
        console.log(response, "++++++++++");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        // Handle error accordingly
      }
    };

    fetchProducts();
  }, [products]);

  const handleAddProductClick = () => {
    setIsAddProductOpen(true);
  };

  const handleAddProductClose = () => {
    setIsAddProductOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 relative">
        <div className="relative">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={product.productImage} className="w-10 md:w-10 max-w-full max-h-full" alt={product.productName} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.productPrice}
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={handleAddProductClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 mr-4 hover:bg-blue-600 absolute"
        >
          Add Product
        </button>
        {isAddProductOpen && <AddProductForm onClose={handleAddProductClose} />}
      </div>
    </div>
  );
}

export default AdminHome;
