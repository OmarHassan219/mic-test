import React, { useEffect, useState } from 'react'
import './admin.css'
import {Routes, Route, Link} from'react-router-dom'
import AddProducts from './addProducts/AddProducts'
import {IoMdArrowDropright } from 'react-icons/io'
import {IoClose } from 'react-icons/io5'
import AllProducts from './allProducts/AllProducts'
import Home from './home/Home'
import { useDispatch } from 'react-redux'
import { CLOSE_LOADING, OPEN_LOADING } from '../../redux/slice/loadingSlice'
import PlansAdmin from './plansAdmin/PlansAdmin'

const Admin = () => {
const [showAdminNav, setshowAdminNav] = useState(false)

const dispatch = useDispatch()

const mobileAdminNav = (
<div onClick={() => setshowAdminNav(false)} className='mobile-admin-nav'>
    <IoClose className='icon' onClick={() => setshowAdminNav(false)} size={25} />
<Link to='/admin/home'>Home</Link>
<Link to='/admin/add-products'>Add Products</Link>
<Link to='/admin/all-products'>All Products</Link>
<Link to='/admin/B2B_forms'>B2B forms</Link>

</div>

)


useEffect(() => {
  dispatch(
    OPEN_LOADING()
  )
  // Simulate a delay to showcase the loader
  const delay = setTimeout(() => {
    dispatch(
      CLOSE_LOADING()
    )
  }, 1300); // Set the desired delay time

  // Clean up the timeout when the component unmounts
  return () => clearTimeout(delay);
}, [dispatch]);

  return (
    <div className='admin d-flex '>

<IoMdArrowDropright onClick={() => setshowAdminNav(true)}  className='adminmenu-icon icon align-self-center' size={23}/>
{  showAdminNav ?   mobileAdminNav : ''}

        
<div className='admin-nav'>
<Link to='/admin/home'>Home</Link>
<Link to='/admin/add-product/new-product'>Add Products</Link>
<Link to='/admin/all-products'>All Products</Link>
<Link to='/admin/B2B_forms'>B2B forms</Link>
</div>





<div className='admin-pages'>
<Routes>
<Route path='/home' element={<Home />} />
<Route path='/add-product/:id' element={<AddProducts />} />
<Route path='/all-products' element={<AllProducts />} />
<Route path='/B2B_forms' element={<PlansAdmin />} />



</Routes>




</div>

    </div>
  )
}

export default Admin