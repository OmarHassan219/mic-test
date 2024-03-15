import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserEmail, selectUserName } from "../../redux/slice/authSlice";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import "./addresslist.css";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  updateDoc,
} from "firebase/firestore";
import useFetchHook from "../../hooks/useFetchHook";
import { SET_ADRESS, selectAddresses } from "../../redux/slice/adressSlice";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { useTranslation } from "react-i18next";
// import { FieldValue } from '@google-cloud/firestore'

const AddressList = () => {
  const [addno, setAddNo] = useState(0);
  const {t} = useTranslation()
  const [username, setusername] = useState("");
  const [adresses, setadresses] = useState("");
  const [timer, settimer] = useState(true);
  const [list, setlist] = useState([]);
  const reduxAddress = useSelector(selectAddresses);
  const dispatch = useDispatch();
  const data = useFetchHook("addresses");
  useEffect(() => {
    dispatch(SET_ADRESS(data));
  }, [data]);
  useEffect(() => {
    setadresses(reduxAddress);
    const fetchedAdresses = reduxAddress?.find(
      (user) => user.theuserid === userid
    );
    console.log(fetchedAdresses);
    setlist(fetchedAdresses ? fetchedAdresses : {});
  }, [reduxAddress]);

  const { userid } = useParams();
  // useEffect(() => {

  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // setuseremail(user.email)
  //       setusername(user.displayName)
  //       const uid = user.uid;
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //     }
  //   });

  // }, [])

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const doesContainObject = Object.entries(list).find(
      ([key, listItem], i) => {
        console.log(listItem);
        return listItem.Company === data.Company;
      }
    );
    console.log(doesContainObject);
    if (!doesContainObject) {
      //

      // console.log(...list);
      const savelist = { ...list };
      console.log(list);
      const numberadd = Object.keys(list).filter((key) =>
        key.includes("address")
      );
      const newKey = `address ${numberadd ? numberadd.length + 1 : 1}`;
      savelist[newKey] = data;
      // savelist.push(data);
      setlist(savelist);
      const searchId = adresses?.find((user) => user.theuserid === userid);
      if (searchId) {
        try {
          const docRef = doc(db, "addresses", searchId.id);
          settimer(false);
          // Update the document with new data

          await updateDoc(docRef, {
            ...savelist,
          });
        } catch (error) {}
      } else {
        try {
          addDoc(collection(db, "addresses"), {
            ...savelist,
            createdAt: Date.now(),
            theuserid: userid,
          });
        } catch (error) {}
      }
    } else {
      toast.error("Address with The Same Company Name exist");
    }
  };

  //  const handleFirebaseUpdate = async () => {
  //   const searchId = adresses?.find(user => user.theuserid === userid)
  //   if(searchId){
  //   console.log(list);
  //   // console.log(...list);
  //   // const innerObjects = Object.entries(list).map(([key, value]) => ({ key, value }));

  //   // deleteDoc(doc(db, "addresses", searchId.id));
  //   try {

  //     const docRef = doc(db, "addresses", searchId.id);

  //     // Update the document with new data

  //     await updateDoc(docRef, {
  //       ...list,
  //     });

  //   } catch (error) {
  // console.log(error.message);
  // }

  //   }
  //  }

  const handleDeleteList = async (key, speclist, i) => {
    // const savelist = Object.values(list).filter(list => list !== speclist )
    const savelist = { ...list };
    console.log(savelist);
    delete savelist[key];
    // setlist(savelist);
    setlist(savelist);
    const searchId = adresses?.find((user) => user.theuserid === userid);

    const docRef = doc(db, "addresses", searchId.id);

    // Create an object with the property to delete

    // Remove the 'capital' field from the document
    console.log(key);
    const cityRef = doc(db, "addresses", searchId.id);
    // const field = `${key}`
    try {
      await updateDoc(cityRef, {
        [key]: deleteField(),
      });

      console.log("Property deleted successfully.");
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  //   const userName = useSelector(selectUserName)
  //  const userFullEmail = useSelector(selectUserEmail)
  return (
    <div className="d-flex address-parent flex-column p-5 align-items-center">
      <h1 className="my-5">{t('Addresses List')}</h1>
      <div className="adresses-parent d-flex align-items-center">
        <div className="address-container">
          
          <table>
            <thead>
              <tr>
                <th>{t('Company')}</th>
                <th>{t('Country')}</th>
                <th>{t('City')}</th>
                <th>{t('State')}</th>
                <th>{t('Street')}</th>
                <th>{t('Zip')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(list).length > 3 ? (
                Object.entries(list).map(([key, listItem], i) => {
                  console.log(Object.keys(list).length);
                  if (typeof listItem !== "object") {
                    return "";
                  }

                  return (
                    <tr key={i}>
                      <td>{listItem.Company}</td>
                      <td>{listItem.country}</td>
                      <td>{listItem.city}</td>
                      <td>{listItem.state}</td>
                      <td>{listItem.street}</td>
                      <td>{listItem.zip}</td>
                      <td><AiOutlineClose
            className="pointer"
            size={15}
            onClick={() => handleDeleteList(key, listItem, i)}
          /></td>
                    </tr>
                  );
                })
              ) : (
                <p>{t('Addresses List is Empty , Add More')}</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <button type='button' onClick={handleFirebaseUpdate}>Save</button> */}
      <h1 className="mt-5">{t('Add Address')}</h1>
      <div className="profile-info-container rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>{t('Company Name')}:</label>
            <input required {...register("Company")} />
          </div>
          <div>
            <label>{t('Street')}:</label>
            <input required {...register("street")} />
          </div>
          <div>
            <label>{t('Country')}:</label>
            <input required {...register("country")} />
          </div>
          <div>
            <label>{t('City')}:</label>
            <input required {...register("city")} />
          </div>
          <div>
            <label>{t('State')}:</label>
            <input required {...register("state")} />
          </div>
          <div>
            <label>{t('Zip')}:</label>
            <input required {...register("zip")} />
          </div>

          <button className="mt-4 " type="submit">{t('Add Address')}</button>
        </form>
      </div>
    </div>
  );
};

export default AddressList;
