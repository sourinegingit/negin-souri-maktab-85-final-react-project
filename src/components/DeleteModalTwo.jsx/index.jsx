import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
// import { deleteProduct } from "../../redux/feature/cart-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config/constants";
import { getAllProduct } from "../../redux/feature/allProduct-slice";

const DeleteModalTwo = ({ setModalOn, SetChoice, id }) => {
  const dispatch = useDispatch();
  const handleOkClick = async () => {
    SetChoice(true);
    setModalOn(false);
   
    toast.success("فیلد مورد نظر حذف شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const handleCancleClick = () => {
    SetChoice(false);
    setModalOn(false);
    toast.warn("شما فیلد مورد نظر را حذف نکردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  return (
    <div className="bg-orange-200 opacity-80 fixed inset-0 z-50 w-50 h-70">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-orange-500 rounded-xl">
          <div className="flex text-lg text-zinc-600 mb-10">
            آیا تمایل به حذف محصول دارید؟
          </div>
          <div className="flex gap-8 justify-center items-center">
            <button
              onClick={handleOkClick}
              className="rounded px-4 py-2 text-white bg-green-700"
            >
              بله
            </button>

            <button
              onClick={handleCancleClick}
              className="rounded px-4 py-2 text-white bg-red-800 ml-4"
            >
              خیر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalTwo;
