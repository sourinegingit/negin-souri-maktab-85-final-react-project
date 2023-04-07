import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { useState } from "react";
import * as shamsi from "shamsi-date-converter";

const validationSchema = Yup.object({
  userName: Yup.string().required("نام کاربری الزامی است."),
  address: Yup.string().required(" آدرس الزامی است."),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره تلفن نامعتبر است.")
    .required(" شماره تلفن الزامی است.")
});
const FinalAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onChange" });
  const handleRegister = (data) => {
    const selectedDate = shamsi
      .jalaliToGregorian(
        +value.persian.split("/")[0],
        +value.persian.split("/")[1],
        +value.persian.split("/")[2]
      )
      .join("/");
    const newOrder = { ...data, date: new Date(`${selectedDate}`).getTime() };
    localStorage.setItem("userdata", JSON.stringify(newOrder));
    window.location.href = "/paymentgateway";
  };

  const [value, setValue] = useState({
    format: "MM/DD/YYYY"
  });

  const convert = (date, format = value.format) => {
    let object = { date, format };
    setValue({
      persian: new DateObject(object).convert(persian, persian_en).format()
    });
  };

  return (
    <div className="overscroll-y-none h-[18%] mt-3">
      <h1 className="text-orange-800 mr-96 font-bold">نهایی کردن خرید</h1>
      <div className=" flex flex-col px-6  mx-auto  lg:py-0 items-center ">
        <div className=" flex justify-center items-center p-6 space-y-4 md:space-y-6">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className=" bg-orange-100 w-[48rem] rounded-lg shadow-2xl dark:border border-orange-400 
            border-2 md:mt-0 space-y-4   p-3 "
          >
            <div className="flex justify-around">
              <div className="flex-col w-[40%]">
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  نام کاربری
                </label>
                <input
                  className="bg-orange-50 border mb-2 border-orange-300 text-orange-900 sm:text-sm rounded-lg
               focus:border-orange-600 focus:outline-none  block w-full p-2.5 
          dark:"
                  id="userName"
                  name="userName"
                  type="text"
                  {...register("userName")}
                />
                {errors.userName && (
                  <span className="text-sm text-red-700 mt-3 ">
                    {errors.userName.message}
                  </span>
                )}
              </div>

              <div className="flex-col w-[40%]">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  نام خانوادگی:
                </label>
                <input
                  name="lastName"
                  {...register("lastName")}
                  className="bg-orange-50 mb-2 border border-orange-300 text-orange-900 sm:text-sm rounded-lg
                      focus:border-orange-600 focus:outline-none  block w-full p-2.5 
                 dark:"
                  id="lastName"
                  type="text"
                />
                {errors.lastName && (
                  <span className="text-sm text-red-700 mt-3 ">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-around">
              <div className="flex-col w-[40%]">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  آدرس
                </label>
                <input
                  {...register("address")}
                  className="bg-orange-50 h-20 border mb-2 border-orange-300 text-orange-900 sm:text-sm rounded-lg
               focus:border-orange-600 focus:outline-none  block w-full p-2.5 
          dark:"
                  id="address"
                  name="address"
                  type="text"
                />
                {errors.address && (
                  <span className="text-sm text-red-700 mt-3 ">
                    {errors.address.message}
                  </span>
                )}
              </div>

              <div className="flex-col w-[40%]">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  تلفن همراه:
                </label>
                <input
                  className="bg-orange-50 mb-2 border border-orange-300 text-orange-900 sm:text-sm rounded-lg
                      focus:border-orange-600 focus:outline-none  block w-full p-2.5 
                 dark:"
                  id="phoneNumber"
                  type="text"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <span className="text-sm text-red-700 mt-3 ">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex mr-9">
              <div className="flex-col w-[41.5%]">
                <label
                  htmlFor="dateofdelivery"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  تاریخ تحویل :
                </label>
                <DatePicker
                 
                  className="bg-orange-50 mb-2 border border-orange-300 text-orange-900 sm:text-sm rounded-lg
                  focus:border-orange-600 focus:outline-none  block w-full p-2.5 
             dark:"
                  id="dateofdelivery"
                  calendar={persian}
                  locale={persian_fa}
                  value={value.date}
                  onChange={convert}
                  required
                  style={{
                    backgroundColor: "#f3f4f6",
                    border: "none",
                    padding: "1.15rem 0.5rem",
                    borderRadius: "0.25rem"
                  }}
                />
          
              </div>
            </div>

            <button
              type="submit"
              className="py-2 px-24 text-center mr-[16rem] mb-11 text-sm 
                    font-medium  focus:outline-none
                     bg-orange-400  rounded-xl border border-none
                      hover:bg-orange-300 hover:text-orange-700 
                      focus:z-10 focus:ring-4 focus:ring-orange-200
                       dark:focus:ring-orange-700 dark:bg-orange-800
                        dark:text-orange-400
                     dark:border-orange-600 dark:hover:text-white
                      dark:hover:bg-orange-700
                      text-white"
            >
              پرداخت
            </button>
            <Link to="/">
              <div className="container-login100-form-btn p-2 pt-12">
                <button
                  to="/"
                  className="flex flex-row-reverse
               items-end text-orange-900 hover:text-red-500"
                >
                  بازگشت به سایت
                </button>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FinalAuth;
