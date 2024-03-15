import React, { useEffect, useState } from "react";
import Plans from "../../../components/plans/Plans";
import { Space, Typography } from "antd";
import "./plansAdmin.css";
import { MdDeleteOutline } from "react-icons/md";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import toast from "react-hot-toast";
import useFetchHook from "../../../hooks/useFetchHook";
import { useDispatch, useSelector } from "react-redux";
const { Paragraph } = Typography;

const PlansAdmin = () => {
  const dispatch = useDispatch();
  const B2B = useFetchHook("B2B");
  const categories = useFetchHook("category");
  
const handleCat = async (id , category) =>{

  try {
    const docRef = doc(db, "category", id);
    // Update the document with new data
    await updateDoc(docRef, {
     
     cat : category,
    });
     


  } catch (error) {
toast.error(`"Error updating Category"`)

  }
}






  return (
    <div id="plan" className="p-5 b2b">
      {B2B ? 
    B2B.map((e, i) => {
    const cat = categories?.find(element => element.useremail === e.useremail)
    console.log(cat)
        return(
      <>
    <h1>{e.useremail}</h1>
      <table className="w-100 border  py-2 px-3">

  <tr>
    <th>Company Name</th>
    <td>{e.company_name}</td>
  </tr>
  <tr>
    <th>Company Adress</th>
    <td>{e.company_address}</td>
  </tr>
  <tr>
    <th>Company Phone</th>
    <td>{e.company_phone}</td>
  </tr>
  <tr>
    <th>KVK</th>
    <td>{e.KvK}</td>
  </tr>
  <tr>
    <th>VAT in %</th>
    <td>{e.vat}</td>
  </tr>
  <h4 className="bg-secondary text-light">contact person in company</h4>
  <tr>
    <th>Person Name</th>
    <td>{e.Person_name}</td>
  </tr>
  <tr>
    <th>Person position</th>
    <td>{e.Person_position}</td>
  </tr>
  <tr>
    <th>Person phone</th>
    <td>{e.personal_phone}</td>
  </tr>
  <tr>
    <th>Person Email</th>
    <td>{e.person_email}</td>
  </tr>
  <tr>
    <th>preferred language</th>
    <td>{e.preferred_language}</td>
  </tr>
  <tr>
    <th>newsletterOptIn</th>
    <td>{e.newsletterOptIn ? "Yes" : "No"}</td>
  </tr>
  <tr>
    <th>Category</th>
    <td className="d-flex justify-content-evenly gap-2">
      <button onClick={() => handleCat(cat.id , "B2C")} type="button" className={`rounded-3 py-1 ${cat?.cat === "B2C" ? 'active' : ''}  border px-4`}>B2C</button>
      <button onClick={() => handleCat(cat.id , "B2B")} type="button" className={`rounded-3  py-1 ${cat?.cat === "B2B" ? 'active' : ''}  border px-4`}>B2B</button>
    </td>
  </tr>

</table>
</>

    )
    }
    ):(
      <p>No Registration form waiting for checking</p>
    )  
    }

    </div>
  );
};

export default PlansAdmin;
