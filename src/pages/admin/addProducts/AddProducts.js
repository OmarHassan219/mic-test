import React, { useEffect, useState } from "react";
import "./addProducts.css";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Storage, db } from "../../../firebase/config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productsSlice";
const AddProducts = () => {
  const products = useSelector(selectProducts);
  const [AddorEdit, setAddorEdit] = useState(true);
  const navigate = useNavigate();
  const initialValues = {
    name: "",

    type: "1",

    price: "",
    "price(B2B)": "",
    "Vat(B2B)": "",
    vat: "",

    imageUrl: "",
  };
  const { id } = useParams();

  const handleEditProduct = () => {
    const findProduct = products.find((product) => product.id === id);
    if (findProduct) {
      return findProduct;
    } else {
      return initialValues;
    }
  };
  useEffect(() => {
    setAddProduct(handleEditProduct());
  }, [id]);
  useEffect(() => {
    if (id !== "new-product") {
      setAddorEdit(false);
    }else{
      setAddorEdit(true);
    }
  }, [id, handleEditProduct()]);

  const [addProduct, setAddProduct] = useState(handleEditProduct());
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddProduct({ ...addProduct, [name]: value });
  };

  //edit in firebase store
  const handleEditFirestore = async (e) => {
    e.preventDefault()
    try {
      const docRef = doc(db, "products", id);
      const priceWVat = addProduct.vat ?
      addProduct.price * (1 + (addProduct.vat / 100)) :
      addProduct.price;
      // Update the document with new data
      const b2bpriceWVat = addProduct["Vat(B2B)"] ?
      addProduct["price(B2B)"] * (1 + (addProduct["Vat(B2B)"] / 100)) :
      addProduct["price(B2B)"];

      await updateDoc(docRef, {
       ...addProduct,
       priceWVat : priceWVat.toFixed(2),
       b2bpriceWVat : b2bpriceWVat.toFixed(2),
      });
       
toast.success(`Product ${addProduct.name} Updated Successfully`)

      navigate("/admin/all-products");

    } catch (error) {
toast.error(`"Error updating document:" ${addProduct.name} `)

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceWVat = addProduct.vat ?
    addProduct.price * (1 + (addProduct.vat / 100)) :
    addProduct.price;

    const b2bpriceWVat = addProduct["Vat(B2B)"] ?
    addProduct["price(B2B)"] * (1 + (addProduct["Vat(B2B)"] / 100)) :
    addProduct["price(B2B)"];

    try {
      addDoc(collection(db, "products"), {
        ...addProduct,
        priceWVat: priceWVat.toFixed(2),
        b2bpriceWVat: b2bpriceWVat.toFixed(2),
        createdAt: Date.now(),
      });
      setAddProduct(initialValues);
      toast.success(`Product ${addProduct.name} Added Successfully`, {
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
      navigate("/admin/all-products");
    } catch (error) {}
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
if(addProduct.imageUrl){

  const imageRef = ref(Storage, addProduct.imageUrl);
  // Delete the file
   deleteObject(imageRef).then(() => {
     // File deleted successfully
   }).catch((error) => {
     // Uh-oh, an error occurred!
   });


}
    try {
      const storageRef = ref(Storage, `products/${Date.now()}${file.name}`);

      // Upload the file and metadata
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          toast.error(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAddProduct({ ...addProduct, imageUrl: downloadURL });
          });
        }
      );
    } catch (err) {}
  };

  return (
    <div className="add-products w-100">
      <div className="add-products-container">
        <h1 className="add-product-header">
          {AddorEdit ? "Add Product" : "Edit Product"}
        </h1>
        <form className="add-product-form w-100" onSubmit={ AddorEdit ? handleSubmit : handleEditFirestore}>
          <div>
            <label>Product Name:</label>
            <input
              onChange={(e) => handleChange(e)}
              value={addProduct.name}
              required
              type="text"
              name="name"
            />
          </div>

          <div className="mt-5 d-flex align-items-center justify-content-center gap-5  ">
            <div className="w-100 w-md-50 w-lg-50">
              <label>Type:</label>
              <select
                onChange={(e) => handleChange(e)}
                required
                name="type"
                value={addProduct.type}
              >
                <option disabled value="1">
                  Select Type{" "}
                </option>
                <option value="physical software">PHYSICAL SOFTWARE</option>
                <option value="digital software">DIGITAL SOFTWARE</option>
              </select>
            </div>
            <div className="w-100 w-md-50 w-lg-50">
              <label>Price (Excl. VAT):</label>
              <label className="vat-label me-1" style={{ fontSize: "12px" }}>
                VAT % :
              </label>
              <input
                className="vat px-1"
                onChange={(e) => handleChange(e)}
                value={addProduct.vat}
                required
                type="number"
                name="vat"
              />
              <input
                onChange={(e) => handleChange(e)}
                value={addProduct.price}
                required
                type="number"
                name="price"
              />
              <label>price(B2B):</label>
              <label className="vat-label me-1" style={{ fontSize: "12px" }}>
                VAT % :
              </label>
              <input
                className="vat px-1"
                onChange={(e) => handleChange(e)}
                value={addProduct["Vat(B2B)"]}
                required
                type="number"
                name="Vat(B2B)"
              />
              <input
                onChange={(e) => handleChange(e)}
                value={addProduct["price(B2B)"]}
                required
                type="number"
                name="price(B2B)"
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="mt-5   ">
            <label>Upload Image:</label>
            <div className="position-relative">
              <p
                style={{ width: `${progress}%`, maxWidth: "99%" }}
                className="progress"
              ></p>
              <input
                onChange={(e) => handleImageUpload(e)}
                type="file"
                accept="image/*"
                capture="environment"
                
              />
            </div>
            <input
              value={addProduct.imageUrl}
              type="text"
              disabled
              placeholder="image Url"
              required
            />
          </div>
          <button type="submit" className="add-product-button mt-5 w-100">
            {AddorEdit ? "Add Product" : "Edit Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
