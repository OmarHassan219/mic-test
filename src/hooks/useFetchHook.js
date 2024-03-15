import { useState, useEffect } from "react";
import { collection,query ,onSnapshot, orderBy} from 'firebase/firestore';
import { db } from '../firebase/config';

const useFetchHook = (collectionName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const q = query(collection(db, collectionName),orderBy("createdAt", "asc"));
   onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({...doc.data() , id:doc.id});
      });
      setData(products)
    });
  }, [collectionName]);

  return data;
};

export default useFetchHook;
