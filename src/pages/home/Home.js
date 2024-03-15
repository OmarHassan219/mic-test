import React, { useEffect } from "react";
import Hero from "../../components/hero/Hero";
import "./home.css";
import Plans from "../../components/plans/Plans";
import { useDispatch } from "react-redux";
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/slice/loadingSlice";
import video from "../../assets/videos/supp.mp4";
import { Link } from "react-router-dom";
import {
  animated,
  useSpring,
  useSpringRef,
  useScroll,
} from "@react-spring/web";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const Home = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation()
  useEffect(() => {
    dispatch(OPEN_LOADING());
    // Simulate a delay to showcase the loader
    const delay = setTimeout(() => {
      dispatch(CLOSE_LOADING());
    }, 3000); // Set the desired delay time

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(delay);
  }, [dispatch]);
  return (
    <div className="home">
      <Hero />
      <motion.div
      initial={{ scale: .9 }}
      whileInView={{ scale: 1.0 }} 
      
      className="video-section">
        <motion.video width="100%" loop autoPlay muted>
          <source src={video} type="video/mp4" />
        </motion.video>
        <div className="video-text">
          <div>
            <h1>{t('Check our shop for more of our products')}</h1>
            <Link to="/shop">{t('Check Other Products')}</Link>
          </div>
        </div>
      </motion.div>
      <div className="why-us-section px-5">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="align-self-start mb-5"
        >
          {t('Transparent')}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {t('Reliable')}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          className="align-self-end mt-5"
        >
          {t('Connecting')}
        </motion.p>
      </div>
      <Plans />

      <div className="contact-section ">
        <motion.div className="container d-flex flex-column align-items-start"
        whileInView={{  opacity: 1}}
        initial={{ opacity: 0 }}
        transition={{duration:1.5}}
        >
          <p>
            <b>
              {t('Contact us to view our brochure with a detailed exposition of the benefits.')}
            </b>
          </p>
          <div>
            <p>
              {t("If you want to ensure that you gain access to the best software, we bring you supplier plans that convey some incredible benefits and a tremendous value. Every business partner and client are able to use supplier plans and gain access to various advantages. These are designed to help you enhance the return on investment over time.")}
            </p>
            <p>
              {t('One thing to consider about supplier plans is that they are not mandatory to order products. However, they provide great convenience. You receive benefits like dropshipping to your customers, discounts ranging from 5% to 15%. Additionally, we offer inventory control and also customizable plans, based on the package you choose.')}
            </p>
            <p>
              {t('If you want to obtain tremendous quality and more value for any of the supplier plans, don’t hesitate and give these a try. We are here to assist with any questions that you may have, so don’t hesitate to get in touch right away.')}!
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div id="contact"
       whileInView={{ opacity:1}}
       initial={{ opacity:0 }}
      
      className="talk-to-us">
        <div className="container">
          <p>{t('Talk To Us')}</p>
          <motion.a 
         
          
          
          href="mailto:info@microsoftsupplier.com">
            info@microsoftsupplier.com
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
