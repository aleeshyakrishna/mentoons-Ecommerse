import {BrowserRouter as Router , Routes ,Route,Navigate} from "react-router-dom"
import Home from './pages/Home'
import SignupPage from "./components/SignupPage"

import { useSelector } from "react-redux"
import LoginPage from "./components/LoginPage"
import AdminHome from "./components/admin/AdminHome"
import CartPage from "./components/home/CartPage"

function App() {

  const token=useSelector((state)=>state.user?.token)
console.log(token,"tooooooookennnnnn");
  return (
  <Router>
    <Routes>
      <Route path="/" element={token ?<Home/>:<Navigate to='/login'/>} />
      <Route path="/signup" element={!token ?<SignupPage/>:<Navigate to='/'/>} />
      <Route path="/login" element={!token ?<LoginPage/>:<Navigate to='/'/>} />
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/cart" element={token ? <CartPage/>: <Navigate to ='/'/>}/>
    </Routes>
  </Router>
  )
}

export default App
