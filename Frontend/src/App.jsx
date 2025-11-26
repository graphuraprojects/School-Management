import axios from 'axios'
import './App.css'
import { useState, useEffect } from 'react'


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
    <h1 className='text-blue-500'>{apiData.message} </h1>
    <h1 className='text-blue-500'>{apiData.time} </h1>
    </>
  )
}

export default App
