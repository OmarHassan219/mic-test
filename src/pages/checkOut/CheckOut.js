import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Selectplan, Selectprice } from "../../redux/slice/planSlice";
import toast from "react-hot-toast";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import './checkout.css'
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/slice/loadingSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);










const CheckOut = () => {


  const dispatch = useDispatch()
  // useEffect(() => {
  //   // Prompt confirmation when reload page is triggered
  //   window.onbeforeunload = () => { return "" };
        
  //   // Unmount the window.onbeforeunload event
  //   return () => { window.onbeforeunload = null };
  // }, []);
  

  useEffect(() => {
    dispatch(
      OPEN_LOADING()
    )
    // Simulate a delay to showcase the loader
    const delay = setTimeout(() => {
      dispatch(
        CLOSE_LOADING()
      )
    }, 3000); // Set the desired delay time
  
    // Clean up the timeout when the component unmounts
    return () => clearTimeout(delay);
  }, [dispatch]);



const price = useSelector(Selectprice)
// const duration = useSelector(Selectduration)










const [message, setMessage] = useState('intializing checkout');
    const [clientSecret, setClientSecret] = useState("");

   
    useEffect(() => {


      // Create PaymentIntent as soon as the page loads
      fetch("https://mic-backend.adaptable.app/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
             price: price
            
            
            }),
             payment_method_types: ["card", "ideal"]
      })
        .then((res) => {
            if(res.ok){
return res.json();

            }
            return res.json().then((json) => Promise.reject(json));
        })
        .then((data) => {
            
            setClientSecret(data.clientSecret)
        
        })
        .catch((error) => {
setMessage("Falied to Intialize Checkout")
toast.error(error.message)
        })
    }, [price]);
    
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
      
    };














  return (
   <>
   <section className="check-sec">
    <div className="container mt-5">
{!clientSecret && <h3>{message}</h3>}
   {clientSecret && (
     <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
   
      </div>
      </section>
   </>
  )
}

export default CheckOut

