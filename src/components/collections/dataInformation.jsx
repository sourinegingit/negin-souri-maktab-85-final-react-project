import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config/constants";
import Cart from "../cart";

const getData = async (id) => {
  const res = await axios.get(`${BASE_URL}/products?category=${id}`);
  return res.data;
};
const DataInformation = () => {
  const { id } = useParams();
  console.log("ddddd", id);
  const [products, setProducts] = useState([]);

  let categoryId = 0;

  useEffect(() => {
    if (id === "spingCollection") {
      categoryId = 3;
    }
    if (id === "summerCollection") {
      categoryId = 2;
    }
    if (id === "fallCollection") {
      categoryId = 4;
    }
    if (id === "winterCollection") {
      categoryId = 1;
    }
    if (categoryId !== 0) {
      getData(categoryId).then((res) => setProducts(res));
    }
  }, [id]);



  return (
    <div className="grid grid-cols-3 gap-8 w-[70%] mr-80 mt-10 ">
      {products?.map((item) => {
        return <Cart key={item.id} id={item.id} item={item} />;
      })}
    </div>
  );
};

export default DataInformation;
