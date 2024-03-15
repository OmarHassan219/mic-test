import React, { useEffect } from "react";
import Msimg from "../../assets/logo-aboutus (1).png";
import "./aboutUs.css";
import eye from "../../assets/icons8-eye-48.png";
import hand from "../../assets/icons8-handshake-48.png";
import disclaimer from "../../assets/icons8-copyright-48.png";
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/slice/loadingSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const AboutUs = () => {
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
    <div className="about-us">
      <div className="containerry">
        <div className="welcome  d-flex align-items-center ">
          <motion.div
            className="text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="special">{t('ABOUT US')}</p>
            <h2>{t('Welcome to our export channel')}!</h2>
            <p>
              {t(`We are Sertic, a company focused on helping you gain access to the right software solutions that you can find on the market. We know how crucial it can be to find and use or sell the right software, and we are here to help with that every step of the way. Our commitment is to quality, and we can guarantee that you will be impressed with our assistance and support all the time. Sertic was established in 2016 in the Netherlands and we cover various customers. We also work closely with Microsoft, we are a supplier of various software solutions, and we strive to bring in front the best quality, value and experience.`)}
            </p>
          </motion.div>
          <div>
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="about-img"
              src={Msimg}
              alt="Miscrosoft Supplier"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="why-section"
        >
          <p className="special">{t('ABOUT US')}</p>
          <h2 className="mb-4">{t('Why should you work with us')}?</h2>
          <p className="mb-4">
            {t(`Sertic is comprised of professionals that have decades of experience in the software world. Also, since we are a software exporter that works directly with a Microsoft manufacturer, you can always rest assured that we bring you the ultimate value and quality. We know how challenging it can be to acquire the right software for your industry, and that’s why we are here to help. Additionally, we have a vast distribution network, and our focus is to become the number one exporter in the entire world. We are firm believers that the right software can really help push the boundaries and provide you with an astonishing result and a high-quality experience every time.`)}
          </p>
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/8gtEdc0mqw4?controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </motion.div>
        <div className="vision">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="d-flex align-items-center  about-card"
          >
            <img className="eye-img  me-4" src={eye} alt="vision" />
            <div>
              <h4>{t('Our Vision')}</h4>
              <p>
                {t(`We aim to become the number one exporter worldwide. We always work hard with our customers to ensure that they have access to outstanding software, and we continue to add new software solutions for our customers all the time. This helps fulfill their vision and ideas, while pushing it to the next level.`)}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="d-flex align-items-center  about-card"
          >
            <img className="eye-img  me-4" src={hand} alt="vision" />
            <div>
              <h4>{t('Our Values')}</h4>
              <p>
                {t(`We are a company focused on professionalism, hard work, transparency and quality. You can always rely on us to deliver incredible results and the best value for money. Plus, we keep up with the trends and listen to our clients in order to convey the solutions they need.`)}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="d-flex align-items-center  about-card"
          >
            <img className="eye-img  me-4" src={disclaimer} alt="vision" />
            <div>
              <h4>{t('DISCLAIMER')}</h4>
              <p>
                {t(`We don’t represent Microsoft, what we do is we manage software stock and export it. We don’t create the software, nor are we a representative of Microsoft.`)}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
