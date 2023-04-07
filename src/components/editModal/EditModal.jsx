import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../config/constants";
import { fetchTodos } from "../../redux/feature/cart-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getEditModal } from "../../redux/feature/editModal-slice";
import { getAllProduct } from "../../redux/feature/allProduct-slice";

const EditModal = ({ item }) => {
  const dispatch = useDispatch();
  console.log("sddsd", item);
  const [modal, setModal] = useState(true);
  const { editItemList } = useSelector((state) => state.EditProduct);

  const modalSchema = yup.object({
    image: yup
      .mixed()
      .required(" پر کردن این فیلد الزامی میباشد")
      .test("is-valid-type", "فرمت عکس وارد شده صحیح نیست", (value) => {
        for (let v of value) {
          if (
            !(
              v.type === "image/jpeg" ||
              v.type === "image/webp" ||
              v.type === "image/png"
            )
          ) {
            return false;
          }
        }
        return true;
      }),
    nameEdite: yup
      .string()
      .required(" پر کردن این فیلد الزامی میباشد")
      .matches(
        "[u0622u0627u0628u067Eu062A-u062Cu0686u062D-u0632u0698u0633-u063Au0641u0642u06A9u06AFu0644-u0648u06CC]",
        "لطفا حروف فارسی وارد کنید"
      ),
    priceEdite: yup.string().required(" پر کردن این فیلد الزامی میباشد"),
    // .min(0, "قیمت باید بیشتر از صفر باشد"),
    quantity: yup.string().required(" پر کردن این فیلد الزامی میباشد"),
    // .min(0, "تعاد باید بیشتر از صفر باشد"),
    category: yup.string().required(" پر کردن این فیلد الزامی میباشد"),
    description: yup
      .string()
      .required("پر کردن این فیلد الزامی میباشد ")
      .matches(
        "[u0622u0627u0628u067Eu062A-u062Cu0686u062D-u0632u0698u0633-u063Au0641u0642u06A9u06AFu0644-u0648u06CC]",
        "لطفا حروف فارسی وارد کنید"
      )
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(modalSchema), mode: "onChange" });

  const [value, setValue] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    const frmData = new FormData();
    frmData.append("image", e.target[0].files[0]);
    const res = await axios.post(BASE_URL + "/upload", frmData);
    const newObj = {
      name: e.target[1].value,
      image: [res.data.filename],
      thumbnail: res.data.filename,
      description: e.target[5].value,
      category: Number(e.target[4].value),
      price: Number(e.target[2].value),
      quantity: Number(e.target[3].value),
      showOnHomePage: e.target[6].checked,
      subcategory: 1
    };

    await axios.patch(`${BASE_URL}/products/${item.id}`, newObj);
    dispatch(getEditModal(false));
    axios.get("http://localhost:3002/products").then((res) => {
      dispatch(getAllProduct(res.data));
    });
  
  };

  const HandleModal = () => {
    dispatch(getEditModal(false));
  };

  useEffect(() => {
    setValue({
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      priceEdite: item.price,
      showOnPage: false
    });
  }, []);
  console.log("value");

  return (
    <>
      <div className="bg-modal fixed text-right w-[100%] top-0 right-0 h-[100vh] bg-orange-200 bg-opacity-80 grid place-items-center z-50 ">
        <div className="modal w-[40vw] p-4 bg-gray-100 shadow-2xl rounded-lg space-y-9">
          <div className="modal-header space-y-4 ">
            <div className="flex justify-between ">
              <p className="text-[1.5rem] font-bold text-orange-800 ">
                افزودن/ویرایش کالا
              </p>
              <div className="icon grid place-items-center cursor-pointer">
                <AiOutlineClose onClick={HandleModal} />
              </div>
            </div>
            <hr />
            <div>
              {console.log(value)}
              {value && (
                <form onSubmit={(e) => handleSubmit(handleSave(e))}>
                  <div className="modal-body ">
                    <div>
                      <div className="grid grid-cols-2 gap-x-9">
                        <div className="flex-col">
                          <lable
                            htmlFor="img"
                            className="block mb-2  text-sm font-medium text-orange-900 dark:text-white"
                          >
                            تصویر کالا:
                          </lable>
                          <div className="flex gap-2">
                            <input
                              defaultValue={value.image}
                              onChange={(e) =>
                                setValue({ ...value, image: e.target.value })
                              }
                              type="file"
                              id="img"
                              className="block p-2  w-full mb-5 text-xs text-orange-900 border border-orange-300
                   rounded-lg cursor-pointer bg-white dark:text-orange-400
                   focus:outline-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-black"
                            />
                            <img
                              src={`${BASE_URL}/files/${item.image}`}
                              className="w-10 h-10"
                            />
                          </div>
                        </div>
                        <div className="flex-col">
                          <lable
                            htmlFor="nameEdite"
                            className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                          >
                            نام کالا:
                          </lable>
                          <div>
                            <input
                              {...register("nameEdite")}
                              defaultValue={value.name}
                              type="text"
                              id="nameEdite"
                              className="block w-full p-1 text-orange-900 border
                   border-orange-300 rounded-lg bg-white sm:text-sm
                   focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600
                   dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                            />
                            {errors.name && (
                              <span className="text-sm text-red-700 mt-3 ">
                                {errors.name.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-9">
                        <div className="flex-col">
                          <lable
                            htmlFor="priceEdite"
                            className="block mb-2  text-sm font-medium text-orange-900 dark:text-white"
                          >
                            قیمت کالا:
                          </lable>

                          <input
                            {...register("priceEdite")}
                            defaultValue={value.priceEdite}
                            name="priceEdite"
                            type="text"
                            id="priceEdite"
                            className="block p-2  w-full mb-5 text-xs text-orange-900 border border-orange-300
                   rounded-lg cursor-pointer bg-white dark:text-orange-400
                   focus:outline-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-black"
                          />
                        </div>

                        <div className="flex-col">
                          <lable className="block mb-2  text-sm font-medium text-orange-900 dark:text-white">
                            موجودی :
                          </lable>

                          <div className="">
                            <input
                              value={value.quantity}
                              onChange={(e) =>
                                setValue({ ...value, quantity: e.target.value })
                              }
                              name="quantity"
                              type="number"
                              className="block p-2  w-full mb-5 text-xs text-orange-900 border border-orange-300
                   rounded-lg cursor-pointer bg-white dark:text-orange-400
                   focus:outline-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-black"
                            />
                          </div>
                        </div>
                      </div>
                      <lable
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-pimk-900 dark:text-white"
                      >
                        دسته بندی:
                      </lable>
                      <div>
                        <select
                          value={value.category}
                          onChange={(e) =>
                            setValue({ ...value, category: e.target.value })
                          }
                          name="category"
                          id="category"
                          className="bg-pimk-50 border border-pimk-300 text-pimk-900 
                  text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block 
                  w-full p-2.5 dark:bg-pimk-700 dark:border-pimk-600
                   dark:placeholder-black dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        >
                          <option value="3">بهاره</option>
                          <option value="2">تابستانه</option>
                          <option value="4">پاییزه</option>
                          <option value="1">زمستانه</option>
                        </select>
                      </div>
                      <lable
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-pimk-900 dark:text-white"
                      >
                        توضیحات:
                      </lable>
                      <div>
                        <textarea
                          value={value.description}
                          onChange={(e) =>
                            setValue({ ...value, description: e.target.value })
                          }
                          name="description"
                          rows="2"
                          id="text"
                          className="block p-2.5 w-full text-sm text-pimk-900 bg-pimk-50 outline-none
                    rounded-lg border border-pimk-300 focus:ring-orange-500
                     focus:border-orange-500 dark:bg-pimk-700 dark:border-pimk-600
                      dark:placeholder-black dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                          placeholder="......توضیحات"
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-center gap-3 mt-4">
                        <lable className="block mb-2  text-sm font-medium text-orange-900 dark:text-white">
                          نمایش در صفحه اصلی :
                        </lable>

                        <div className="">
                          <input
                            value={value.showOnPage}
                            onChange={(e) =>
                              setValue({
                                ...value,
                                showOnPage: !value.showOnPage
                              })
                            }
                            name="showonpage"
                            type="checkbox"
                            className="block p-2  w-full mb-2 text-xs text-orange-900 border border-orange-300
                   rounded-lg cursor-pointer bg-white dark:text-orange-400
                   focus:outline-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer space-y-5 ">
                    <hr />
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-green-700 w-[8rem] p-2 rounded-md text-[1.2rem] text-white  focus:border-orange-500"
                      >
                        ذخیره
                      </button>
                      <button
                        onClick={HandleModal}
                        className="bg-red-800 w-[8rem] p-2 rounded-md text-[1.2rem] text-white  focus:border-orange-500"
                      >
                        بستن
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
