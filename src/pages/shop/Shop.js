import React, { useEffect, useState } from "react";
import useFetchHook from "../../hooks/useFetchHook";
import "./shop.css";
import ProductCard from "../../components/productCard/ProductCard";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  SelectFilteredProducts,
} from "../../redux/slice/filterSlice";
import { SET_ACTIVE_USER, SET_CURRENT_PATHNAME } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import  toast  from "react-hot-toast";
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/slice/loadingSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useTranslation } from "react-i18next";

const Shop = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const data = useFetchHook("products");
 
  const Physical = data?.filter((item) => {
    return item.type === "physical software";
  });
  const Digital = data?.filter((item) => {
    return item.type === "digital software";
  });
  const PAGE_SIZE = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  const productssss = useSelector(SelectFilteredProducts);

  
useEffect(() => {
  dispatch(
    OPEN_LOADING()
  )
  const delay = setTimeout(() => {
    dispatch(
      CLOSE_LOADING()
    )
  }, 3000); 

  return () => clearTimeout(delay);
}, [dispatch]);




useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      

dispatch(
  SET_ACTIVE_USER({
    email: user.email,
    userPhoto: user.photoURL,
    userName: user.displayName,
    userId: user.uid,
  })
);

} else {
  dispatch(
    SET_CURRENT_PATHNAME({
      currentPathname: '/shop',
    })
    )
    toast.error("Please Sign in to continue");
      navigate("/sign-in");

    }
  });
}, [dispatch, navigate])


























  useEffect(() => {
    dispatch(
      FILTER_PRODUCTS({
        products: data,
        type: "",
      })
    );
  }, [data, dispatch]);


  var paginatedData = productssss?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePhysicalProducts = () => {
    dispatch(
      FILTER_PRODUCTS({
        products: data,
        type: "physical software",
      })
    );
    setCurrentPage(1);
  };

  const handleDigitalProducts = () => {
    dispatch(
      FILTER_PRODUCTS({
        products: data,
        type: "digital software",
      })
    );
    setCurrentPage(1);
  };

  const handleAll = () => {
    dispatch(
      FILTER_PRODUCTS({
        products: data,
        type: "",
      })
    );
    setCurrentPage(1);
  };

  return (
    <div className="shop p-4">
      <div className="container d-flex flex-md-row flex-lg-row flex-column align-items-md-start align-items-center">
        <div className="types ">
          <h4>{t('Product Categories')}</h4>
          <div>
            <div>
              <p
                style={{ color: "#FE4526", cursor: "pointer" }}
                onClick={handlePhysicalProducts}
              >
                {t('Physical software')}
                <span className="ms-4">{Physical?.length}</span>
              </p>
              <p>{t('Minimal Order Quantity')}: 100</p>
            </div>
            <div>
              <p
                style={{ color: "#FE4526", cursor: "pointer" }}
                onClick={handleDigitalProducts}
              >
                {t('Digital software')}
                <span className="ms-4">{Digital?.length}</span>
              </p>
              <p>{t('Minimal Order Quantity')}: 20</p>
            </div>
            <p onClick={handleAll} style={{ color: "#FE4526", cursor: "pointer" }}>
              {t('All Products')}
            </p>
          </div>
        </div>
        <div className="products-view">
          <div className="all-products">
            <div className="all-products-container">
              {productssss ? <ProductCard admin={false} products={paginatedData} /> : null}
            </div>
            <div className="text-center">
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={productssss?.length}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
