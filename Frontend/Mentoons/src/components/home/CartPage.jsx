import "./home.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../utils/baseUrl";
import Header from "./Header";
import { toast } from 'react-toastify'
function CartPage() {
  const navigate = useNavigate();

  const [cartProduct, setCartProduct] = useState([]);

  const userId = useSelector((store) => store.user.userData.payload._id);

  const calculateSubtotal = () => {
    return cartProduct.reduce((total, product) => {
      // Calculate the total for each product (quantity * price)
      const productTotal = product.quantity * product.productPrice;
      // Add the product total to the overall subtotal
      return total + productTotal;
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      // Fetch order details from your server

      const options = {
        key: "rzp_test_ogRUqTzg9wOFuu", // Replace with your Razorpay Key
        amount: calculateSubtotal().toFixed(2) * 100,
        currency: "INR",
        name: "Mentoons",
        description: "Purchase Description",
        image: "/assets/logo/IMG-20231220-WA0013.jpg",
        handler: async function  (response) {
          // Handle succe
           const res = await axios.delete(`/clearCart/${userId}`)
          console.log("Payment successful:", res);
          if(res.status===201){
            toast.success("Your Order Placed Successfully")
            navigate('/')
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "1234567890",
        },
        notes: {
          address: "Your Company Address",
        },
        theme: {
          color: "#F37254", // Customize the color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/getcart/${userId}`);
        setCartProduct(response.data);
      } catch (err) {
        return { status: false, message: "not found cart product" };
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <Header />
      <div className="cart-page fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-opacity-75">
        <div
          className="fixed inset-0 bg-opacity-75 transition-opacity"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 overflow-hidden mt-32 ">
            <div className="absolute inset-0 overflow-hidden ">
              <div className="pointer-events-none fixed inset-y-0 ml-96 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  {cartProduct.length > 0 ? (
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl mt-16">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2
                            className="text-lg font-medium text-gray-900"
                            id="slide-over-title"
                          >
                            Shopping cart
                          </h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={() => navigate("/")}
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="absolute -inset-0.5"></span>
                              <span className="sr-only">Close panel</span>
                              <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartProduct.map((product) => (
                                <li
                                  key={product.productId}
                                  className="flex py-6"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.productImage}
                                      alt={product.productName}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{product.productName}</a>
                                        </h3>
                                        <p className="ml-4">
                                          ₹{product.productPrice.toFixed(2)}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹{calculateSubtotal().toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div onClick={handleCheckout} className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              onClick={() => navigate("/")}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div>
                        <img
                          src="/assets/emptycart.png"
                          alt="Empty Cart"
                          className="mx-auto"
                        />
                        <h1 className="text-center text-xl  text-gray-700  mt-4">
                          Cart is Empty
                        </h1>

                        <button
                          onClick={() => navigate("/")}
                          type="button"
                          className="py-3 px-4  ml-44 mt-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          shop now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
