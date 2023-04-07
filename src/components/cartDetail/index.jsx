import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config/constants";
import { cartActions } from "../../redux/feature/cart2-slice";


const getData = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};
const CartDetail = () => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  console.log(product);

  useEffect(() => {
    getData(+id).then((res) => setProduct(res));
  }, [id]);
  const handleAddToCart = () => {
    console.log("ojocnd")
    dispatch(cartActions.addItemToCart(product))
  };

  const removeItemHanlder = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const addItemHanlder = (product) => {
    dispatch(cartActions.addItemToCart(product));
    setCount(count + 1);
  };

  return (
    <>
      {product && (
        <div className="overflow-hidden">
          <div className="mt-[50px] w-screen  justify-around p-6 flex ">
            <div className=" w-96 h-52 border-slate-500 flex-col justify-between p-2  bg-center ">
              <img
                src={`http://localhost:3002/files/${product.image[0]}`}
                alt="detail photo"
                className="w-[100%] h-[100%] object-scale-down"
              />
            </div>

            <div className="p-2 flex ml-96 flex-col items-center w-96 ">
              <p className="text-gray-400 font-light text-xs text-center p-2">
                {product.brand}{" "}
              </p>
              <div className="flex items-center  ">
                <h1>نام کالا:</h1>
                <p className="text-gray-800 text-center  p-2">{product.name}</p>
              </div>

              <div className="flex items-center  ">
              <h1>قیمت کالا:</h1>
                <p className="text-center text-gray-800 mt-1 p-2">
                  {product.price}تومان
                </p>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div className="inline-flex items-center mt-4 p-2 ">
                  <button
                    onClick={removeItemHanlder}
                    className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                    {count}
                  </div>

                  <button
                    onClick={() =>
                      addItemHanlder(product)
                    }
                    className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                >
                  افزودن به سبد خرید
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
         <hr></hr>
          <div>
            <h1 className="text-start mr-56 mt-16 mb-3">توضیحات:</h1>
          <p className="text-start mr-56 ">{product.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetail;
