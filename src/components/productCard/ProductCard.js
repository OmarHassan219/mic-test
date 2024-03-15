import React from "react";
import "./ProductCard.css";
import { deleteObject, ref } from "firebase/storage";
import { Storage, db } from "../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { selectUserEmail } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import useFetchHook from "../../hooks/useFetchHook";
const ProductCard = ({ products, editOrDelete, admin }) => {
  const { t } = useTranslation();
  const categories = useFetchHook("category");
  const userEmail = useSelector(selectUserEmail);
  const cat = categories?.find((element) => element.useremail === userEmail);
  const navigate = useNavigate();
  const handleDelete = (product) => {
    const imageRef = ref(Storage, product.imageUrl);
    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

    try {
      deleteDoc(doc(db, "products", product.id));
      toast.success(`${product?.name} deleted successfully`, {
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
  };
  const handleEdit = (product) => {
    navigate(`/admin/Add-product/${product.id}`);
  };
  return (
    <>
      {products?.map((product) => {
        const {
          id,
          name,
          price,
          "price(B2B)": priceB2B,
          b2bpriceWVat: priceb2bvat,
          imageUrl,
          type,
          vat,
        } = product;
        const incVat =
          (parseFloat(price) * parseFloat(vat)) / 100 + parseFloat(price);

        return (
          <div key={id} className="all-products-item">
            <div className="image-container">
              <img src={imageUrl} alt={name} className="product-image" />
            </div>
            <div className="product-details">
              <p
                className={
                  type === `physical software`
                    ? `product-type`
                    : `product-type yellow`
                }
              >
                {type}
              </p>
              <h3 className="product-name">{name}</h3>
              {admin && (
                <>
                  <p className="product-price">
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      Excl.
                    </span>{" "}
                    {"VAT"} €{" "}
                    <span className="theprice">
                      {parseFloat(price).toFixed(2)}
                    </span>{" "}
                    (Price Per Unit)
                  </p>
                  <p className="product-price">
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Incl.
                    </span>{" "}
                    {"VAT"} €{" "}
                    <span className="theprice">{incVat.toFixed(2)}</span> (Price
                    Per Unit)
                  </p>
                  {priceB2B && (
                    <>
                      <p className="product-price">
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Excl.B2B price
                        </span>{" "}
                        {"VAT"} €{" "}
                        <span className="theprice">
                          {parseFloat(priceB2B).toFixed(2)}
                        </span>{" "}
                        (Price Per Unit)
                      </p>
                      <p className="product-price">
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Incl.B2B price
                        </span>{" "}
                        {"VAT"} €{" "}
                        <span className="theprice">
                          {parseFloat(priceb2bvat).toFixed(2)}
                        </span>{" "}
                        (Price Per Unit)
                      </p>
                    </>
                  )}
                </>
              )}

              {cat?.cat === "B2C" && !admin ? (
                <>
                  <p className="product-price">
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      Excl.
                    </span>{" "}
                    {"VAT"} €{" "}
                    <span className="theprice">
                      {parseFloat(price).toFixed(2)}
                    </span>{" "}
                    (Price Per Unit)
                  </p>
                  <p className="product-price">
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Incl.
                    </span>{" "}
                    {"VAT"} €{" "}
                    <span className="theprice">{incVat.toFixed(2)}</span> (Price
                    Per Unit)
                  </p>
                </>
              ) : cat?.cat === "B2B" && !admin ? (
                <>
                  <p className="product-price">
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Excl.
                    </span>{" "}
                    {"VAT"} €{" "}
                    <span className="theprice">
                      {parseFloat(priceB2B).toFixed(2)}
                    </span>{" "}
                    (Price Per Unit)
                  </p>
                  <p className="product-price">
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Incl.
                    </span>{" "}
                    {"VAT"} €{" "}
                    <span className="theprice">
                      {parseFloat(priceb2bvat).toFixed(2)}
                    </span>{" "}
                    (Price Per Unit)
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
            {editOrDelete ? (
              <div className="edit-delete-buttons d-flex">
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEdit(product)}
                >
                  {t("Edit")}
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(product)}
                >
                  {t("Delete")}
                </button>
              </div>
            ) : (
              <div
                className="d-flex justify-content-between w-100 "
                style={{ fontSize: "12px" }}
              >
                {!userEmail.includes("microsoftsupplier185") && (
                  <>
                    <Link
                      to={`/shop/${name.replace(/ /g, "-")}`}
                      className="add-to-cart-button"
                    >
                      {t("Add To Cart")}
                    </Link>
                    <Link
                      to={`/shop/${name.replace(/ /g, "-")}`}
                      className="dropship-button"
                    >
                      {t("Dropship")} now
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
