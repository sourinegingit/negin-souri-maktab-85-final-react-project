import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/constants";
import {IoIosArrowBack} from "react-icons/io"
import axios from "axios";
import Cart from "../cart";

const getData = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/products?_sort=createdAt&_order=desc&&category=${id}&&_page=1&_limit=6&&showOnHomePage=true`
  );
  return res.data;
};
const Category = ({ id, text, navigationText }) => {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(`/${route}`);
  };
  const [products, setProduct] = useState([]);
  useEffect(() => {
    getData(+id).then((res) => setProduct(res));
  }, [id]);

  return (
    <section className="py-10 bg-gray-100  text-orange-800">
      <div
        className="flex gap-2 items-center cursor-pointer w-80"
        onClick={() => handleNavigate(navigationText)}
      >
        <h1 className="mr-56">{text}</h1>
        <IoIosArrowBack />
      </div>
      <div className=" mx-auto grid  max-w-6xl  grid-cols-1 gap-12 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
        {products.map((item) => (
          <Cart key={item.id} id={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Category;
