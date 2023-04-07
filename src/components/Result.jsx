import React from "react";
import completed from "../assets/completed.png";
import cancle from "../assets/cancle.png";
import { useParams } from "react-router-dom";

const Result = () => {
  const { paymentResult } = useParams();
  console.log(paymentResult);
  return (
    <>
      {paymentResult !== "failure" ? (
        <div className="flex justify-center items-center mt-28 ">
          <img src={completed} className="w-40 h-40" />
          <p className="w-64">
            با تشکر از پرداخت شما سفارش شما ثبت شده و جهت هماهنگی ارسال با شما
            تماس گرفته خواهد شد
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-28 ">
          <img src={cancle} className="w-40 h-40" />
          <p className="w-64">
            پرداخت موفقیت آمیز نبود سفارش شما در انتظار پرداخت است.
          </p>
        </div>
      )}
    </>
  );
};

export default Result;
