import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDetails from './pages/MovieDetails'
import PrivateRouter from './components/PrivateRouter'

export default function App() {
  return (
    <div className=' dark:bg-gray-dark-main min-h-screen'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<PrivateRouter/>}>
            <Route path='/details/:id' element={<MovieDetails/>}/>
          </Route>
        </Routes>
    </div>
  )
}
