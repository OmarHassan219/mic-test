import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn, selectUserEmail } from '../../redux/slice/authSlice'
import { Link } from 'react-router-dom'
const AdminOnlyRoute = ({children}) => {
    const userEmail = useSelector(selectUserEmail)
const isLoggedIn = useSelector(selectIsLoggedIn)

    if(isLoggedIn && userEmail === 'microsoftsupplier185@gmail.com') {
  return (
  children
  )
}else{
return(
    <div className='p-5'>

    <diV className='container'>

    <h1>Page Not Found</h1>
    <p>Go back to the Home page</p>
    <Link to="/">Home</Link>
    </diV>
    </div>
    
    )

}
}




export const AdminOnlyLink = ({children}) => {
    const userEmail = useSelector(selectUserEmail)
const isLoggedIn = useSelector(selectIsLoggedIn)

    if(isLoggedIn && userEmail === 'microsoftsupplier185@gmail.com') {
  return (
  children
  )
}else{
return(
    
    null
    )

}
}

export default AdminOnlyRoute