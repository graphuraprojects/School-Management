import { Routes, Route } from "react-router-dom";
import Layout from './Layout/Layout.jsx'
import Home from './Pages/Home.jsx'

// pages
import AboutSchool from './Pages/AboutSchool.jsx'
import CoursesAcademics from './Pages/CoursesAcademics.jsx'
import Activities from './Pages/Activities.jsx'
import AdmissionApplication from './Pages/AdmissionApplication.jsx'
import ContactSupport from './Pages/ContactSupport.jsx'
import Merchandise from './Pages/Merchandise.jsx';
import Cart from './Pages/Cart.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Payment from './Pages/Payment.jsx';
import Dashboard from "./Pages/Dashboard.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Profile from "./Pages/Profile.jsx";
import TrackOrder from "./Pages/TrackOrder.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./Components/ScrollToTop.jsx";

function App() {
  return (
    <div  className="bg-[#f6f7f8]">
       <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
      />
      <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="about" element={<AboutSchool/>}/>
        <Route path="courses" element={<CoursesAcademics/>}/>
        <Route path="activities" element={<Activities/>}/>
        <Route path="admission" element={<AdmissionApplication/>}/>
        <Route path="store" element={<Merchandise />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="contact" element={<ContactSupport/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
