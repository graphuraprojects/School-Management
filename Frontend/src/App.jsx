import axios from 'axios'
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import Layout from './Layout/Layout.jsx'
import Home from './Pages/Home.jsx'

// pages
import AboutSchool from './Pages/AboutSchool.jsx'
import CoursesAcademics from './Pages/CoursesAcademics.jsx'
import Activities from './Pages/Activities.jsx'
import AdmissionApplication from './Pages/AdmissionApplication.jsx'
import ProductsECommerce from './Pages/ProductsECommerce.jsx'
import ContactSupport from './Pages/ContactSupport.jsx'



function App() {
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(res => {
        setApiData(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="about" element={<AboutSchool/>}/>
        <Route path="courses" element={<CoursesAcademics/>}/>
        <Route path="activities" element={<Activities/>}/>
        <Route path="admission" element={<AdmissionApplication/>}/>
        <Route path="products" element={<ProductsECommerce/>}/>
        <Route path="contact" element={<ContactSupport/>}/>
      </Route>
    </Routes>
    <h1 className='text-blue-500'>{apiData.message} </h1>
    <h1 className='text-blue-500'>{apiData.time} </h1>
    </>
  )
}

export default App
