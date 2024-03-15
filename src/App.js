
import Navbar from './components/navbar/Navbar';
import './App.css';
import {Routes , Route, useLocation } from'react-router-dom';
import Signin from './pages/signin/Signin';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import AboutUs from './pages/aboutUs/AboutUs';
import Shop from './pages/shop/Shop';
import AdminOnlyroute from './components/adminOnlyRoute/AdminOnlyroute';
import ProductDetails from './pages/productDetails/ProductDetails';
import { useSelector } from 'react-redux';
import Cart from './components/cart/Cart';
import { SelectOpenCart } from './redux/slice/cartSlice';
import { AnimatePresence } from 'framer-motion';
import { SelectIsLoading } from './redux/slice/loadingSlice'
import Loader from './components/loader/Loader';
import CheckoutSucess from './pages/checkoutSuccess/CheckoutSucess';
import CheckOut from './pages/checkOut/CheckOut';
// import AddressList from './pages/adresslist/AdressList';
import Maintain from './pages/maintainenece/Maintain';
import Stripe from './pages/api/Stripe';
import Success from './pages/Success';


function App() {
  const isLoading = useSelector(SelectIsLoading)

const cartControl = useSelector(SelectOpenCart)
const location = useLocation();

  return (
    <div className="App">
      {/* {isLoading ? <Loader/> : ''} */}

      {cartControl ? <Cart/> : ''}
      {/* <Maintain/> */}
    <Navbar/>

    <AnimatePresence  mode='wait' >

<Routes location={location} key={location.key} >
<Route path="/" element={<Home/>}/>
<Route path="/Sign-in" element={<Signin/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/MIGS" element={<Maintain/>}/>

<Route path="/admin/*" element={
<AdminOnlyroute>

<Admin/>

</AdminOnlyroute>
}/>
<Route path="/about-us" element={<AboutUs/>}/>
<Route path="/shop" element={<Shop/>}/>
<Route path="/shop/:name" element={<ProductDetails/>}/>
<Route path="/checkout" element={<CheckOut/>}/>
<Route path="/checkout-success" element={<CheckoutSucess/>}/>
<Route path="/success" element={<Success/>}/>
{/* <Route path="/:userid/address-list" element={<AddressList/>}/> */}
<Route path="/api/stripe" element={<Stripe/>}/>

</Routes>

</AnimatePresence>


    </div>
  );
}

export default App;
