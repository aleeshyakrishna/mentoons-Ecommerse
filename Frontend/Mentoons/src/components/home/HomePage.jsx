
import { Helmet } from 'react-helmet'
import { useEffect,useState } from 'react'
import {  Link } from 'react-router-dom';
import './home.css'
import {  useDispatch,useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userReducer'; 
import { useNavigate } from 'react-router-dom';
import withReactContent from "sweetalert2-react-content";
import axios from "../../utils/baseUrl"
import Swal from "sweetalert2";
import { toast } from 'react-toastify'

const HomePage = () => {

  const userId = useSelector((store)=>store.user.userData.payload._id)
  const [product,setProduct] = useState([])

  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  useEffect(()=>{
   const fetchProduct= async () =>{
    
      try {
         const response = await axios.get('/getProduct')
         console.log(response,"++++++++++");
         setProduct(response.data)
      } catch (err){
        return { status: false , message:"not found product"}
      }
   }
   fetchProduct()
 },[])
 



  const handleLogout = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "To Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then((result) => {
      if (result.isConfirmed) {
       
 

      dispatch(logoutUser());
      

        navigate("/login");
      }
    });
  };
const handleAddToCart = async (e,productId) =>{
     e.preventDefault()
     const data = {
       userId,
       productId
     }
 console.log(productId,userId,"lllllllllll");
  const response = await axios.post("/addToCart",data)
  if(response){
    toast.success("Item Added To Cart")

  }
}
  return (
    <div className="home-container">
      <Helmet>
        <title>Mentoons</title>
        <meta property="og:title" content="Mobillio Online Store" />
      </Helmet>
      <div className="home-navbar">
        <header data-role="Header" className="home-header max-width-container">
          <div className="home-navbar1">
            <div className="home-container01">
              <img
                alt="search3271286"
                src='/assets/logo/IMG-20231220-WA0013.jpg'
                className="home-image w-40 "
              />
              
            </div>
            <div className="home-middle">
              <div className="home-left">
               
              </div>
              <span className="navbar-logo-title">MENTOONS</span>
              <div className="home-right">
                <span className="navbar-link"></span>
                <span className="navbar-link"></span>
                
                <button 
                onClick={handleLogout}
                className='navbar-link'>Logout</button>
              </div>
            </div>
            <div className="home-icons">
          <Link to="/cart">
            <img
              alt="iconsbxscart3271299"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQnIGhlaWdodD0nMjQnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTIxLjgyMiA3LjQzMUMyMS42MzUgNy4xNjEgMjEuMzI4IDcgMjEgN0g3LjMzM0w2LjE3OSA0LjIzQzUuODY3IDMuNDgyIDUuMTQzIDMgNC4zMzMgM0gyVjVINC4zMzNMOS4wNzcgMTYuMzg1QzkuMjMyIDE2Ljc1NyA5LjU5NiAxNyAxMCAxN0gxOEMxOC40MTcgMTcgMTguNzkgMTYuNzQxIDE4LjkzNyAxNi4zNTJMMjEuOTM3IDguMzUyQzIyLjA1MiA4LjA0NCAyMi4wMDkgNy43IDIxLjgyMiA3LjQzMVonIGZpbGw9JyMxNjE2MTYnLz4KPHBhdGggZD0nTTEwLjUgMjFDMTEuMzI4NCAyMSAxMiAyMC4zMjg0IDEyIDE5LjVDMTIgMTguNjcxNiAxMS4zMjg0IDE4IDEwLjUgMThDOS42NzE1NyAxOCA5IDE4LjY3MTYgOSAxOS41QzkgMjAuMzI4NCA5LjY3MTU3IDIxIDEwLjUgMjFaJyBmaWxsPScjMTYxNjE2Jy8+CjxwYXRoIGQ9J00xNy41IDIxQzE4LjMyODQgMjEgMTkgMjAuMzI4NCAxOSAxOS41QzE5IDE4LjY3MTYgMTguMzI4NCAxOCAxNy41IDE4QzE2LjY3MTYgMTggMTYgMTguNjcxNiAxNiAxOS41QzE2IDIwLjMyODQgMTYuNjcxNiAyMSAxNy41IDIxWicgZmlsbD0nIzE2MTYxNicvPgo8L3N2Zz4K"
              className="home-image1"
            />
          </Link>
        </div>
          </div>
          <div data-role="BurgerMenu" className="home-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-role="MobileMenu" className="home-mobile-menu">
            <div className="home-nav">
              <div className="home-container02">
                <span className="home-logo-center1">MOBILLIO</span>
                <div
                  data-role="CloseMobileMenu"
                  className="home-close-mobile-menu"
                >
                  <svg viewBox="0 0 1024 1024" className="home-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <div className="home-middle1">
                <span className="home-text06">SHOP</span>
                <span className="home-text07">LOOKBOOK</span>
                <span className="home-text08">SPECIAL</span>
                <span className="home-text09">ABOUT</span>
                <span className="home-text10">BLOG</span>
                <span className="home-text11">CONTACT</span>
              </div>
            </div>
            <div>
              <svg viewBox="0 0 950.8571428571428 1024" className="home-icon04">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="home-icon06">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg viewBox="0 0 602.2582857142856 1024" className="home-icon08">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
      </div>
      <div className="home-main">
      <div className="home-hero section-container" style={{ position: 'relative', paddingTop: 'var(--dl-space-space-threeunits)', paddingBottom: 'var(--dl-space-space-threeunits)' }}>
  <div className="background-image " style={{ content: '', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundImage: 'url("/assets/bg1.png")', opacity: 0., backgroundSize: 'cover', zIndex: -1 }} />
          <div className="home-max-width max-width-container">
            <div className="home-hero1">
              <div className="home-container03 ml-40">
                <div className="home-info">
                  <img
                    alt="Rectangle43271305"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMicgaGVpZ2h0PSc1Micgdmlld0JveD0nMCAwIDIgNTInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxyZWN0IHdpZHRoPScyJyBoZWlnaHQ9JzUyJyBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScwLjUnLz4KPC9zdmc+Cg=="
                    className="home-image4"
                  />
                  <span className="home-text12">
                    <span>Podcast</span>
                    <br></br>
                    <span>trends - 2022</span>
                  </span>
                </div>
                <h1 className="home-text16 Heading-1">COMICS</h1>
                <div className="home-container04">
                  <span className="home-text17">FROM</span>
                  <span className="home-text18">₹1999</span>
                </div>
                <div className="home-btn-group">
                  <button className="button">Explore the collection</button>
                </div>
              </div>
            <img src="/assets/mentoons ecommerce products/bag.png" className='w-96 h-96 mr-41' alt="" />
            </div>
          </div>
        </div>
        
        <div className="section-container column">
        
          <div className="home-banner">
            <div className="home-container05">
              <h3 className="home-text19 Heading-3">MENTOONS</h3>
              <span className="home-text20">
                <span></span>
                <span>cartoons</span>
              </span>
            </div>
          </div>
          <div className="home-container06 max-width-container">
            <div className="home-container07">
              <span className="home-text23">
                <span>
                Welcome to Mentoons,
A unique platform that combines Mentoring with the powerful language of Cartoons.
                </span>
                <br></br>
                <span>Mentoons is more than a service. We are a guiding light to evolving personalities. Help us help you transform your life today!</span>
                <br></br>
                <span>
                Mentoons is a result of the creative amalgamation of a diverse team coming together - our founder, talented developers, creative illustrators, skillfull graphic designers, adept content writers, melodious music producer and experienced psychologists
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </span>
              <img
                alt="M3271427"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTk5JyBoZWlnaHQ9JzIwMCcgdmlld0JveD0nMCAwIDE5OSAyMDAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxwYXRoIGQ9J00zNy4zMDI2IDcxLjI5MjVMOTkuMzgyNyAxODIuMzEzTDE2MS40NjMgNzEuMjkyNUwxNzUuNjIyIDIwMEgxOTguNzY1TDE3NS42MjIgMEw5OS4zODI3IDEzNy45NTlMMjMuMTQzOSAwTDAgMjAwSDIzLjE0MzlMMzcuMzAyNiA3MS4yOTI1WicgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMC4wNicvPgo8L3N2Zz4K"
                className="home-svg"
              />
              <button className="button">Read more</button>
            </div>
          </div>
        </div>
        <div className="section-container">
          <div className="max-width-container">
            <div className="home-gallery">
              <div className="home-left1">
              
              </div>
             
            </div>
          </div>
        </div>
     
        <div className='grid grid-cols-3'>
  {product.map((data) => (
    <div key={data.productId} className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
      <a href="#">
        <img className="h-60 w-full rounded-t-lg object-cover" src={data.productImage} alt="product image" />
      </a>
      <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">{data.productName}</h5>
        </a>
        <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
          <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.810l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          {/* ... Repeat similar structure for other stars */}
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">₹{data.productPrice}</span>
            {/* <span className="text-sm text-slate-900 line-through">₹299</span> */}
          </p>
          <a href="" className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={(e)=>handleAddToCart(e,data._id)} >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
<div className="home-full-width-banner section-container">
          <div className="home-left4">
            <div className="home-content">
              <span className="home-text29">WORKSHOP</span>
              <span className="home-text30">
              6-12 WORKSHOPS
Brace your kids for interactive sessions, enriching journal writing, captivating books, thrilling games, entertaining videos - all intended to keep your children engaged while teaching them about thoughts, interactions, reactions, making friends, and enhancing self-awareness.



              </span>
            </div>
            <div className="home-btn button">
              <span className="home-text31">Explore now</span>
            </div>
          </div>
           <img src="/assets/workshops/IMG-20231220-WA0018.jpg" alt="" 
            className="home-image6 w-2/4 h-96 "
           />
          
        </div>

      </div>
      <div className="home-footer">
        <div className="max-width-container">
          <footer className="home-footer1">
            <div className="home-container09">
              <h3 className="home-text32 Heading-3">MENTOONS</h3>
              <span className="home-text33">
                <span>399, 2nd Cross Rd, opposite the Paul hotel,
                   HBCS Colony,<br></br> Amarjyoti Layout, Domlur,
                    Bengaluru, Karnataka 560071</span>
                <br></br>
                <span>INDIA</span>
              </span>
              <span className="home-text36">Call us 7892858593</span>
              <span className="home-text37">metalmahesh@gmail.com</span>
            </div>
            <div className="home-links-container">
              <div className="home-container10">
                <span className="home-text38">Categories</span>
                <span className="home-text39">PODCAST</span>
                <span className="home-text40">CARTOONS</span>
                <span className="home-text41">WORKSHOPS</span>
                <span className="home-text42">THEMES</span>
               
              </div>
              <div className="home-container11">
                <span className="home-text45">Company</span>
                <span className="home-text46">SHOP</span>
              
                <span className="home-text48">SPECIALS</span>
                <span className="home-text49">ABOUT</span>
                <span className="home-text50">BLOG</span>
              </div>
              <div className="home-container12">
                <span className="home-text51">Resources</span>
                <span className="home-text52">CONTACT US</span>
                <span className="home-text53">ORDER</span>
                <span className="home-text54">TRACK YOUR ORDER</span>
                <span className="home-text55">SHIPPING &amp; DELIVERY</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default HomePage
