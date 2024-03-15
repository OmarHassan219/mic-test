import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/slice/loadingSlice";
import { selectUserEmail } from "../../redux/slice/authSlice";
import { SelectPlanss } from "../../redux/slice/planSlice";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../firebase/config";
import "./checkoutSuccess.css";
import useFetchHook from "../../hooks/useFetchHook";
import { useTranslation } from "react-i18next";
const CheckoutSucess = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const data = useFetchHook('subscription')
const [subscription, setSubscription] = useState([])
  const useremail = useSelector(selectUserEmail);
  // const plan  = useSelector(Selectplan)
  const planss = useSelector(SelectPlanss);

  useEffect(() => {
    if (data) {
     
        setSubscription(data)
  
      const search = data?.find((product) => product.email === useremail);
      if(!search){
        addToFirebase(search);

      }
    }
  }, [data]);

  const addToFirebase = (search) => {
    if (!search) {
      const today = new Date(Date.now());
      let endDay = new Date(Date.now());
      if(planss.duration.includes("Year") || planss.duration.includes("year")){
        endDay = new Date(endDay.setDate(endDay.getDate() + 365));

      }else if(planss.duration.includes("Month") || planss.duration.includes("month")){

        endDay = new Date(endDay.setDate(endDay.getDate() + 30));
      }
console.log(planss.Inventory.split(' ')[0]);
      try {
        addDoc(collection(db, "subscription"), {
          email: useremail,

          plan: planss.name,
discount:parseInt(planss.Inventory.split(' ')[0]),
          duration: planss.duration.trim().split(" ")[1],
          createdAt: today.toLocaleDateString(),
          endAt: endDay.toLocaleDateString(),
        });
      } catch (error) {}
    }
  };

  // useEffect(() => {
  //   dispatch(OPEN_LOADING());
  //   // Simulate a delay to showcase the loader
  //   const delay = setTimeout(() => {
  //     dispatch(CLOSE_LOADING());
  //   }, 3000); // Set the desired delay time

  //   // Clean up the timeout when the component unmounts
  //   return () => clearTimeout(delay);
  // }, [dispatch]);

  return (
    <div className="success-container">
      <div className="printer-top"></div>

      <div className="paper-container">
        <div className="printer-bottom"></div>
{/* test */}
        <div className="paper">
          <div className="main-contents">
            <div className="success-icon">&#10004;</div>
            <div className="success-title">{t('Payment Complete')}</div>
            <div className="success-description">
              <h3 style={{ color: "black" }}>{useremail}</h3>
              <h4 style={{ color: "black" }}>{planss.name}</h4>
              <h6 style={{ color: "black" }}>&euro; {planss.price}</h6>
            </div>
            <div className="order-footer">{t('Thank you')}!</div>
          </div>
          <div className="jagged-edge"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSucess;
