import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const isAuth = useSelector((state) => state.isAuth)

    if(!isAuth){
           return <Navigate to="/login"/>;
    }
    
  return (
     <>
     {children}
     </>
  )
}

export default PrivateRoute