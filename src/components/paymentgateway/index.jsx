import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import psp from "../../assets/psp.png";
import {BASE_URL} from '../../config/constants'

const Paymentgateway = () => {
  const navigate = useNavigate();
  const handleCancle = () => {
    window.location.href = "/payment/failure";
  };

  const handlePayment = async() => {
    const basket = JSON.parse(localStorage.getItem("basket"));
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const newOrder = {
      username: userdata.userName,
      lastname: userdata.lastName,
      address: userdata.address,
      phone: userdata.phoneNumber,
      expectAt: userdata.date,
      products: basket,
      prices: 10275000,
      delivered: false
    };

     const res=await axios.post(`${BASE_URL}/orders`,newOrder)
    if (res.status==201) {
      window.location.href=`/payment/result-${res.data.id}`
      localStorage.removeItem("basket")
      localStorage.removeItem("userdata")
    }
  };

  return (
    <div className="flex-col ">
      <p
        onClick={() => {
          navigate("/");
        }}
        className="text-pink-800 mr-10 font-bold mt-10"
      >
        بازگشت به سایت
      </p>
      <img
        src={psp}
        alt="paymentgateway"
        className="w-[35%] h-[60vh] m-auto"
      />
      <div className="flex justify-center gap-32 mt-4">
        <button className="p-3 px-10 rounded-md bg-green-300 text-lime-900  border-emerald-800" onClick={handlePayment}>
          پرداخت
        </button>
        <button className="p-3 px-10 rounded-md bg-red-300 text-red-900  border-red-800" onClick={handleCancle}>
          انصراف
        </button>
      </div>
    </div>
  );
};

export default Paymentgateway;
