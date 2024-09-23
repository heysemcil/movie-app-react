import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRouter() {
    const {currentUser} = useAuth()
    return currentUser? <Outlet/> : <Navigate to="/login" replace/>
}
