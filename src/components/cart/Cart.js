import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_CART,
  DELETE_PRODUCT,
  SelectCart,
} from "../../redux/slice/cartSlice";
import "./cart.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { selectUserEmail } from "../../redux/slice/authSlice";
import useFetchHook from "../../hooks/useFetchHook";
import getStripe from "../../lib/getStripe";
import Stripe from "stripe";
import { useTranslation } from "react-i18next";
import axios from "axios";
const Cart = () => {
  const cart = useSelector(SelectCart);
  const useremail = useSelector(selectUserEmail);
  const data = useFetchHook("subscription");
  const categories = useFetchHook("category");
  const cat = categories?.find(element => element.useremail === useremail)
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [foundUser, setfoundUser] = useState("");
  useEffect(() => {
    if (data) {
      const isSubscibed = data?.find((user) => user.email === useremail);
      setfoundUser(isSubscibed?.discount / 100);
    }
  }, [data]);

  const containervariants = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    },
    exithome: {
      x: "100vw",
      transition: { ease: "easeInOut" },
    },
    visible1: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        duration: 0.5,
      },
    },
  };

  const handleDelete = (item) => {
    dispatch(DELETE_PRODUCT(item));
  };


const navigate = useNavigate()



  const handleCloseCart = (e) => {
    if (
      e.target.classList.contains("cart-close") ||
      e.target.classList.contains("cart-container") ||
      e.target.classList.contains("shop-link")
    ) {
      dispatch(CLOSE_CART());
    }
  };

  const handleCheckout = async () => {
    console.log(cart);
    try {
      const response = await axios.post(
        "https://microsoftsupplie-backend-r-new.adaptable.app/create-checkout-session",
        { cart: cart, useremail: useremail , foundUser: cat?.cat }, // Wrap the cart in an object with a key
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 500) return;

      const data = response.data;

      console.log(data);
      window.location.href = `${data}`
    } catch (error) {
      console.error(error);
      // Handle error gracefully
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      onClick={(e) => handleCloseCart(e)}
      className="cart-container"
    >
      <motion.div
        variants={containervariants}
        initial="hidden"
        animate="visible1"
        className="cart-section py-4"
      >
        <div className="container cards-parent" >
          <AiOutlineCloseSquare
            onClick={(e) => handleCloseCart(e)}
            className="icon  cart-close text-center "
            size={20}
          />
<div className="h-fit">
          {cart.length ? (
            cart.map((item, index) => {
              const unitPricewvat = cat?.cat === "B2C" ?  parseFloat(item.priceWVat) : parseFloat(item.b2bpriceWVat);

              

              const totalPrice =  (
                unitPricewvat.toFixed(2) * item.calculatequantity
              ).toFixed(2);






              return (
                <div key={index} className="card-item mt-4 border p-2">
                  <div className="d-flex w-100 justify-content-between align-items-center ">
                    <p>{item.name}</p>
                    <button
                      onClick={() => handleDelete(item)}
                      className="border w-25 py-2 rounded-3 p-1 del-btn"
                      type="button"
                    >
                      {t("Delete")}
                    </button>
                  </div>
                  <div className="d-flex">
                    <img width={100} src={item.imageUrl} alt={item.name} />
                    <div className="ms-5">
                      <p className="product-price">
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Incl.
                        </span>
                        {t("VAT")} €
                        <span className="theprice me-2">
                          {cat?.cat === "B2C" ? item.priceWVat : item.b2bpriceWVat }
                        </span>
                        {t("(Price Per Unit)")}
                      </p>
                      <p>
                        Amount:
                        <span
                          className="ms-1"
                          style={{ color: "red", fontWeight: "bold" }}
                        >
                          {item.calculatequantity}
                        </span>
                      </p>
                      <p>
                        {" "}
                        {t("Total Price")}
                        <sub style={{ color: "blue", fontSize: "10px" }}>
                          Incl Vat
                        </sub>{" "}
                        : <span> {totalPrice} </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2>{t("Cart Empty")}</h2>
              <p>{t("Try adding some products to the cart")}</p>
              <Link
                className="shop-link"
                onClick={(e) => handleCloseCart(e)}
                to="/shop"
              >
                {t("Shop")}
              </Link>
            </div>
          )}
          {foundUser && cart.length ? (
            <em className="discount-notify my-2">
              {foundUser * 100}% discount applied
            </em>
          ) : (
            ""
          )}
          {cart.length ? (
            <button type="button" onClick={handleCheckout} className="mt-4">
              {t("Dropship Now")}
            </button>
          ) : (
            ""
          )}
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
