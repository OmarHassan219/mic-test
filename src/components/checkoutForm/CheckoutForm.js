
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../redux/slice/authSlice";
import { SelectPlanss, Selectplan } from "../../redux/slice/planSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useTranslation } from "react-i18next";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const useremail = useSelector(selectUserEmail);
  const plan  = useSelector(Selectplan)
  const planss  = useSelector(SelectPlanss)
  // const [email, setEmail] = useState(useremail);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 const {t} = useTranslation()
 

  useEffect(() => {
   
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  }, [stripe, ]);

  // const saveOrder = () => {
  //   try {
  //     addDoc(collection(db, "subscription"), {
  //       email: useremail,

  //   plan: plan?.name,

  //   duration: "Month",
  //       createdAt: Date.now(),
  //     });
  //   } catch (error) {}









  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

     await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          // return_url: "http://localhost:3001/checkout-success",
          return_url: "https://www.microsoftsupplier.com/checkout-success",
          
        },
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            toast.success("payment successful");
            // saveOrder();
            
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
    defaultValues: {
        billingDetails: {
          email: useremail,
          
        }
      }
  };

  return (
<div className="row gap-2 m-0">

<div   className='col-lg-5 col-md-4 col-sm-12 col-xs-12 plan'>
<h3 className='mb-5 mt-2'>{planss?.name}</h3>

<h4 className='price'>&euro; {planss.price}</h4>
<div className='p-4'>
<h4 className='duration mb-5'>{`${planss.duration}`}</h4>
<div className='border-bottom mb-3'>
<p>{ `${planss['Discount Physical']}`}</p>
<p>{ `${planss['Discount Digital']}`}</p>
</div>
<div className='other-features'>
<p>{ `${planss['Free Physical Units Per Order']}`}</p>
<p>{ planss['Free Physical Units Per Month'] ? planss['Free Physical Units Per Month'] : ''  }</p>
<p>{ `${planss.Inventory}`}</p>
<p>{ `${planss['Customizable Plan']}`}</p>
<p>{ `${planss['VA-RSPC Pricing Consultation']}`}</p>
<p>{ `${planss['Dropship To Your Customers']}`}</p>
</div>
</div>

</div>
<div className='col-lg-5 col-md-4 col-sm-12 col-xs-12'>

    <form className=" w-100" id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <AddressElement options={{mode: 'shipping'}} />
      {/* <IdealBankElement/> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </div>






</div>
  );
}
