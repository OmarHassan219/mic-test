import React, { useEffect, useState } from "react";
import "./plans.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_CHOOSEN_PLAN, SelectPlanss } from "../../redux/slice/planSlice";
import { useNavigate } from "react-router-dom";
import { selectUserEmail } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Form from "../../components/form/Form";
import useFetchHook from "../../hooks/useFetchHook";
import {motion} from 'framer-motion'
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'


const Plans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useremail = useSelector(selectUserEmail);
  const [emailcheck, setEmailcheck] = useState(useremail);
  const planss = useSelector(SelectPlanss);
  const [exist, setexist] = useState(false);
  const [contactForm, setContactForm] = useState(false);
  const [formData, setformData] = useState({newsletterOptIn: false , company_phone:'' , personal_phone:''})
  const [phone, setPhone] = useState()
  const {t} = useTranslation()

  const fetchedPlans = useFetchHook("B2B");
  const [fetched, setfetched] = useState("");
  useEffect(() => {
    setfetched(fetchedPlans);
    console.log(fetchedPlans);
const filter = fetchedPlans?.find(e => e.useremail === useremail);
console.log(filter);
if(filter){
  setexist(true)
}else{
  setexist(false)
}
  }, [fetchedPlans , useremail]);

 
 



const onChange = (e) => {

const {id , value} = e.target;
if(id === "newsletterOptIn"){
  if(formData.newsletterOptIn === false){
const updateFormData = {...formData , [id] : true}
setformData(updateFormData)
console.log(updateFormData);
  }else{
const updateFormData = {...formData , [id] : false}
setformData(updateFormData)
console.log(updateFormData);
}
return
}
const updateFormData = {...formData , [id] : value}
setformData(updateFormData)
console.log(updateFormData);
}





const handleCompanyPhone = (e) =>{
console.log(e);
const updateFormData = {...formData , company_phone : e}
setformData(updateFormData)
}
const handlePersonalPhone = (e) =>{
console.log(e);
const updateFormData = {...formData , personal_phone : e}
setformData(updateFormData)
}





const handleSubmit = (e) =>{
e.preventDefault()
console.log(formData);
try {
  addDoc(collection(db, "B2B"), {
    ...formData,
    useremail: useremail,
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
} catch (error) {}
}






















  return (
    <motion.div
      
      id="plan"
      className="plans mx-auto"
    >
      <div className="">

        <h1 className="text-center">{t('B2B Registration form')}</h1>
        {!exist ? (

      <form className="container" autoComplete="off" onSubmit={handleSubmit}>
      <input autoComplete="false" name="hidden" type="text" style={{display:"none"}} />
        <div className="d-flex  justify-content-between">
        <div className="flex-fill">
<label htmlFor="company_name">Company Name:</label>
<input required name="name" id="company_name" type="text"  onChange={onChange}/>
        </div>
        <div className="flex-fill">
<label htmlFor="company_address">Company Address:</label>
<input required  name="address" id="company_address" className="" type="text" onChange={onChange}/>
        </div>
        </div>
        <div className="d-flex  justify-content-between my-2">
        <div className="flex-fill">
<label htmlFor="">Phone number:</label>
<PhoneInput
      placeholder="Enter phone number"
      className='phone'
      defaultCountry="US"
      international={false}
      value={formData.company_phone}
      onChange={handleCompanyPhone}/>
        </div>
        <div className="flex-fill">
<label htmlFor="email">Email Address:</label>
<input  name="email" id="email" className="" type="email" onChange={onChange}/>
        </div>
        </div>
        <div className="d-flex  justify-content-between">
        <div className="flex-fill">
<label htmlFor="email">Chamber of Commerce (KvK) number or other business registration number:</label>
<input  name="KvK" id="KvK" className="" type="text" onChange={onChange}/>
        </div>
        <div className="flex-fill">
<label htmlFor="email">Vat number in %:</label>
<input  name="vat" id="vat" className="" placeholder="20" type="number" onChange={onChange}/>
        </div>
        </div>
        <h3 className="text-center my-3">Contact Person within company</h3>
        <div className="d-flex  justify-content-between m-auto">
        <div className="flex-fill">
<label htmlFor="Person_name">Person Name:</label>
<input required name="Person_name" id="Person_name" type="text"  onChange={onChange}/>
        </div>
        <div className="flex-fill">
        <label htmlFor="Person_position">Person Position:</label>
<input required name="Person_position" id="Person_position" type="text"  onChange={onChange}/>
        </div>
        </div>
        <div className="d-flex  justify-content-between my-3">
        <div className="flex-fill">
<label htmlFor="">Phone number:</label>
<PhoneInput
      placeholder="Enter phone number"
      className='phone'
      defaultCountry="US"
      international={false}
      value={formData.personal_phone}
      onChange={handlePersonalPhone}/>
        </div>
        <div className="flex-fill">
<label htmlFor="person_email">Person Email Address:</label>
<input required name="person_email" id="person_email"  type="email" onChange={onChange}/>
        </div>
        <div className="flex-fill">
<label htmlFor="preferred_language">Preferred language for communication:</label>
<input  name="preferred_language" id="preferred_language"  type="text" onChange={onChange}/>

        </div>
        </div>
        <div className="d-flex">
        <label htmlFor="newsletterOptIn">
  Opt-in for newsletters or other marketing communication
</label>
<input type="checkbox" id="newsletterOptIn" checked={formData.newsletterOptIn} name="newsletterOptIn"  onChange={onChange} />
        </div>
        <button className="rounded-4 mt-4" type="submit">Submit</button>
      </form>
        ): (
          <h3 className="text-center py-3 bg-light">Details Sent, we are processing your request</h3>
        )}
      </div>
    </motion.div>
  );
};

export default Plans;
