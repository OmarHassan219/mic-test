import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState, useTransition } from 'react'
import { auth, db } from '../../firebase/config';
import  toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { CLOSE_LOADING, OPEN_LOADING } from '../../redux/slice/loadingSlice';
import { useDispatch } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { useTranslation } from "react-i18next";

const Register = () => {
      const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
      });
    const handleSignin = ( e ) => {
const {name, value} = e.target
setFormValues({...formValues, [name]: value})

    }


const handleSubmit = (e) => {
  e.preventDefault()
  
  createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
  .then((userCredential) => {
      addDoc(collection(db, "category"), {
        cat: "B2C",
        useremail: formValues.email,
        createdAt: Date.now(),
      });
      toast.success(`Sent Successfully`, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
   
    toast.success('Registered Successfully', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      setFormValues({
        email: '',
        password: '',
        confirmPassword: '',
      });
navigate('/');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

if (errorCode === 'auth/email-already-in-use') {

  
      toast.error('Email Address Already exist', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });




}else{
  toast.error(errorMessage, {
    style: {
      border: '1px solid #713200',
      padding: '16px',
      color: '#713200',
    },
    iconTheme: {
      primary: '#713200',
      secondary: '#FFFAEE',
    },
  });
}
  });
}
useEffect(() => {
    if(formValues.password.length < 8 && formValues.password.length !== 0){
        document.querySelector(".pop-password-message").style.display = "block";
        document.querySelector(".login-btn").setAttribute('disabled' , '');

    }else  
    document.querySelector(".pop-password-message").style.display = "none";
    document.querySelector(".login-btn").removeAttribute('disabled' , '');

}, [formValues.password])

const dispatch = useDispatch();
const {t} = useTranslation()

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



useEffect(() => {

      if (formValues.password !== formValues.confirmPassword) {

                  document.querySelector(".pop-password").style.display = "block";
                  document.querySelector(".login-btn").setAttribute('disabled' , '');

      }else
      {
          document.querySelector(".pop-password").style.display = "none";
          document.querySelector(".login-btn").removeAttribute('disabled' , '');

      }
}, [formValues.confirmPassword , formValues.password])
  return (
    <div className="login-container">
  <form onSubmit={handleSubmit}>
    <div className="form-container">
      <div className="form-sections mb">
        <Link to='/sign-in'>
          <BiArrowBack size={20} style={{cursor:"pointer"}}/>
        </Link>
        <div className="heading-container">
          <h1 className="heading">{t('Register')}</h1>
        </div>
      </div>
      <div className="form-sections">
        <div className="form-fields">
          <label htmlFor="email">{t('Email')}</label>
          <input type="email" name="email"  value={formValues.email} id="email" onChange={(e) => handleSignin(e)} className="input-field" tabindex="1" required />
        </div>
        <div className="form-fields">
          <label htmlFor="pass">{t('Password')}</label>
          {/* <div id="pass-field-container"> */}

            <input type="password" name="password" value={formValues.password} id="pass" onChange={(e) => handleSignin(e)} className="input-field" required tabindex="2" />
            <p className='pop-password-message' style={{fontSize:"11px" , color:"red" , display:"none"}} >{('Password should be 8 characters or more')}</p>
         
          <label for="pass">{t('Confirm Password')}</label>
          
            <input type="password" name="confirmPassword" value={formValues.confirmPassword} id="pass" onChange={(e) => handleSignin(e)} className="input-field" required tabindex="2" />
          <p className='pop-password' style={{fontSize:"11px" , color:"red" , display:"none"}} >{('Please make sure you typed your password correctly')}</p>
        </div>
        <div className="form-fields">
          <button type="submit"  disabled className="login-btn" tabindex="4" >{t('Register')}</button>
        </div>
      </div>
     
    </div>
  </form>
</div>
  )
}

export default Register