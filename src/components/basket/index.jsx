import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../redux/feature/cart2-slice";
import DeleteModalTwo from "../DeleteModalTwo.jsx";

const Basket = () => {
  const [modalOn, setModalOn] = useState(false);
  const [choice, SetChoice] = useState(false);
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  const [id, setId] = useState("");
  const deleteHandler = async (id) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket = await basket.filter((item) => item.id != id);
    localStorage.setItem("basket", JSON.stringify(basket));
    dispatch(cartActions.addItems(JSON.parse(localStorage.getItem("basket"))));
    setModalOn(true);
    setId(id);
  };

  return (
    <div className="mt-5">
      <p className="text-orange-800 mr-64 mb-10 text-3xl ">سبد خرید</p>
      <div className="w-[70%] relative overflow-x-auto shadow-xl sm:rounded-lg dir-rtl m-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px- py-3 pl-6">
                کالا
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت
              </th>
              <th scope="col" className="px-6 py-3">
                تعداد
              </th>
              <th scope="col" className="px-3 py-3 text-center pl-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4 ">{item.name}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4 text-center pl-3">
                  <p
                    // onClick={removeItemHanlder}
                    onClick={() => deleteHandler(item.id)}
                    className="font-medium text-orange-600 dark:text-orange-500 hover:underline ml-3"
                  >
                    حذف
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between   text-orange-800  text-xl w-[70%] mt-28 m-auto ">
        <p>جمع کل:{totalAmount}</p>
        <Link to="/finalAuth">
          <button
            className="py-2.5 px-14 text-center mr-32 mb-11 text-sm 
                    font-medium  focus:outline-none
                     bg-orange-400  rounded-full border border-none
                      hover:bg-orange-300 hover:text-orange-700 
                      focus:z-10 focus:ring-4 focus:ring-orange-200
                       dark:focus:ring-orange-700 dark:bg-orange-800
                        dark:text-orange-400
                     dark:border-orange-600 dark:hover:text-white
                      dark:hover:bg-orange-700
                      text-white"
          >
            نهایی کردن سبد خرید
          </button>
        </Link>
      </div>
      {modalOn && (
        <DeleteModalTwo
          setModalOn={setModalOn}
          SetChoice={SetChoice}
          id={id}
          choice={choice}
        />
      )}
    </div>
  );
};

export default Basket;
