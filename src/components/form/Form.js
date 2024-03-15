import React, { useState } from "react";
import "./form.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Form = ({ setContactForm }) => {
  const Formanimate = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,

      transition: { duration: 1 },
    },
    exit: {
      scale: 0,
      transition: { ease: "easeInOut" },
    },
  };

  const [email, setEmail] = useState("");
  const {t} = useTranslation()
  const [companyName, setCompanyName] = useState("");
  const [messages, setMessages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      companyName,
      messages,
    };

    try {
       await axios.post(
        "https://mic-backend.adaptable.app/api/sendemail",
        data
      );
      toast.success("Email Sent");
      setContactForm(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <div className="container d-flex justify-content-center py-4">
        <motion.div
          className="login-box position-relative "
          variants={Formanimate}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <AiOutlineCloseCircle
            onClick={() => setContactForm(false)}
            className="back-arrow"
            size={40}
          />

          <form onSubmit={handleSubmit} class="contact-form">
            <h5 class="title">Contact us</h5>

            <div>
              <label>{t('Company Name')}:</label>

              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                name="id"
                class="form-control rounded border-white mb-3 form-input"
                required
              />
            </div>
            <div className="user-box">
              <label>{t('Email')}:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name=""
                required
              />
            </div>
            <div>
              <label>{t('Message')}:</label>
              <textarea
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
                id="message"
                class="form-control rounded border-white mb-3 form-text-area"
                rows="5"
                cols="30"
                placeholder={t('Message')}
                required
              ></textarea>
            </div>
            <div class="submit-button-wrapper">
              <input type="submit" value={t('Send')} />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Form;
