import React, { useEffect } from "react";
import useFetchHook from "../../../hooks/useFetchHook";
import "./allProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCTS } from "../../../redux/slice/productsSlice";
import { selectProducts } from "../../../redux/slice/productsSlice";
import ProductCard from "../../../components/productCard/ProductCard";

const AllProducts = () => {
  const data = useFetchHook("products");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  useEffect(() => {
    dispatch(GET_PRODUCTS(data));
  }, [data]);


  return (
    <div className="all-products">
      <div className="all-products-container">
        <ProductCard products={products} editOrDelete admin={true}/>
      </div>
    </div>
  );
};

export default AllProducts;
