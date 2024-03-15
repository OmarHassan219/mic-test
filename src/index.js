import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Toaster } from "react-hot-toast";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
// English
// Deutsch
// Français
// Nederlands
// Español


i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:['en','de','fr','nl','es'],
    fallbackLng: "en",
    detection:{
        order: ['path','cookie', 'htmlTag',  'localStorage', 'subdomain'],
        caches:['cookie']

    },
    backend:{
        loadPath: '/assests/locales/{{lng}}/translation.json',

    },
    

   
  });


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(



  <Provider store={store}>
    <Toaster/>
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

