import React, { useEffect, useState } from "react";
import "./hero.css";
import gif from "../../assets/logo.gif";
// import logocube from "../../assets/Designer (6).png";
import microsoftsupplier from "../../assets/lettering2-1-1024x410.png";
import video from "../../assets/videos/supp.mp4";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import heroGif from "../../assets/animation-ezgif.com-resize.webp";
import { Link } from "react-router-dom";
const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="hero-section overflow-hidden">
        <div className="contianer overflow-hidden">
          <div className="row m-0 ">
            <div className="col-lg-8 col-3-md col-12-sm hero-text ">
              <Link to="/MIGS" className="d-flex text-black text-decoration-none flex-column  flex-md-row align-items-center">
                <p className="new-text align-self-start mb-2 mb-md-0">
                  {t("new")}
                </p>
                <div className="d-flex align-items-center">
                  <p className="m-0 ms-2    join-text">
                    {t("Join the Microsoft Inbound Growth Solutions now")}!
                  </p>
                  <MdOutlineArrowCircleRight size={30} className="ms-1" />
                </div>
              </Link>
              <h1
                className="m-0 mb-4 responsive-font"
                style={{ fontWeight: "bold" }}
              >
                {t("Most Reliable Microsoft Exporter")}
                <br /> {t("Worldwide")}
               <Typewriter
      options={{
        strings: [
          t('Authentic'),
          t('Connecting'),
          t('Growth'),
          t('Service'),
        ],
        autoStart: true,
        loop: true,
      }}
    />
              </h1>
              <p className="fs-4 easiest">
                {t("The easiest way to acquire Microsoft")} <br /> {t("software, services and consulting")}
              </p>
            </div>
            <div className="col-lg-4 col-3-md col-12-sm d-flex justify-content-end">
              <img src={heroGif} className="w-100" alt="microsoft supplier" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
