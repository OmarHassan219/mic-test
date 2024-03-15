import React from 'react'
import { Link } from 'react-router-dom'
import { EMPTY_CART } from '../redux/slice/cartSlice'
import { useDispatch } from 'react-redux'

const Success = () => {
const dispatch = useDispatch()
dispatch(EMPTY_CART())

  return (
    <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="card-title success-heading">Payment Successful!</h1>
        <p className="card-text success-message">
          Thank you for your payment. Your transaction has been successfully processed. Your order is now confirmed.
        </p>
        <p className="card-text success-message">
          We appreciate your business and look forward to serving you again in the future.
        </p>
        <div className="contact-info">
          <p>If you have any questions or concerns, please feel free to contact us at:</p>
          <p>Email: info@microsoftsupplier.com</p>
        </div>
        <Link to="/" className="btn btn-primary">To Home Page</Link>
      </div>
    </div>
  </div>
    
          
  )
}

export default Success