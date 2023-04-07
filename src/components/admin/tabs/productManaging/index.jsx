import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../../config/constants";
import {
  creatProduct,
  uploadImage
} from "../../../../redux/feature/cart-slice";
import DeleteModal from "../../../deleteModal/DeleteModal";
import "../../tabs/productPagination.css";
import EditModal from "../../../editModal/EditModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEditItem } from "../../../../redux/feature/editProduct-slice";
import { getEditModal } from "../../../../redux/feature/editModal-slice";
import { getAllProduct } from "../../../../redux/feature/allProduct-slice";

const ProductManaging = () => {
  const [productData,setProductData]=useState([])
  const { modalMood } = useSelector((state) => state.editModal);
  const [item, setItem] = useState(null);
  const modalSchema = yup.object({
    image: yup
      .mixed()
      .test(
        "number",
        "وارد کردن یک عکس حداقل الزامی است",
        (file) => !file || file.length > 0
      ),
    name: yup.string().required("الزامی هست"),
    price: yup.string().required("الزامی هست"),
    quantity: yup.string().required("الزامی هست"),
    category: yup.string().required("الزامی هست"),
    description: yup.string().required("الزامی هست")
  });
  // ------------------------formik------------------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(modalSchema), mode: "onChange" });

  const [modalOn, setModalOn] = useState(false);
  const [choice, SetChoice] = useState(false);
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    name: "",
    fileName: "",
    category: "",
    image: "",
    description: "",
    brand: "",
    showOnHomePage: "",
    price: "",
    thumbnail: "",
    quantity: ""
  });
  const handleSave = async (data, e) => {
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

    await axios.post(BASE_URL + "/products", newObj);
    setModal(false);
    axios.get("http://localhost:3002/products").then((res) => {
      dispatch(getAllProduct(res.data));
    });

    reset();
    toast.success("فیلد مورد نظر اضافه شد", {
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

  useEffect(() => {
    if (newProduct.image !== "" && newProduct.fileName === "") {
      dispatch(uploadImage(newProduct.image))
        .then((res) => res)
        .then((data) => {
          setNewProduct({
            ...newProduct,
            fileName: data.payload.filename
          });
        });
    } else if (newProduct.fileName !== "") {
      dispatch(creatProduct(newProduct));
      axios.get("http://localhost:3002/products").then((res) => {
        dispatch(getAllProduct(res.data));
      });
    }
  }, [newProduct, dispatch]);

  const { allProduct } = useSelector((state) => state.allProduct);
  useEffect(()=>{
    setProductData(allProduct)
  },[allProduct])

  useEffect(() => {
    axios.get("http://localhost:3002/products").then((res) => {
      dispatch(getAllProduct(res.data));
    });
  }, [dispatch]);

  const [id, setId] = useState("");
  const deleteHandler = (id) => {
    setModalOn(true);
    setId(id);
  };

  const [modal, setModal] = useState(false);
  const [editeModalProduct, setEditeModalProduct] = useState(false);
  const HandleModal = () => {
    setModal(!modal);
    if (modal == true) {
      toast.warn(" شما فیلدی اضافه نکردید!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };
  //---------------------------------------------------------
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 4;
  const currentItems = productData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productData.length / 4);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % productData.length;
    setItemOffset(newOffset);
  };
  ///////////////////////////////////edit
  const EditHandler = (item) => {
    dispatch(getEditItem(item));
    dispatch(getEditModal(true));
    setItem(item);
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-center text-orange-800  text-xl w-[70%] -mt-10 m-auto ">
          <p>مدیریت کالاها</p>

          <div className="modal-container relative">
            <button
              onClick={HandleModal}
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
              افزودن کالا
            </button>
          </div>
          {/* modal */}
          <div
            className={
              modal
                ? "bg-modal absolute w-[100%] top-0 right-0 h-[100vh] bg-orange-200 bg-opacity-80 grid place-items-center z-50 "
                : "hidden"
            }
          >
            <div className="modal w-[40vw] p-4 bg-gray-100 shadow-2xl rounded-lg space-y-9  ">
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
                  <form onSubmit={handleSubmit(handleSave)}>
                    <div className="modal-body ">
                      <div>
                        <div className="grid grid-cols-2 gap-x-9 mb-5">
                          <div className="flex-col">
                            <lable
                              htmlFor="img"
                              className="block mb-2  text-sm font-medium text-orange-900 dark:text-white"
                            >
                              تصویر کالا:
                            </lable>
                            <div className="">
                              <input
                                {...register("image")}
                                type="file"
                                id="img"
                                className="block p-2  w-full mb-5 text-xs text-orange-900 border border-orange-300
                       rounded-lg cursor-pointer bg-white dark:text-orange-400
                       focus:outline-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-black"
                              />
                              {errors.image && (
                                <span className="text-sm text-red-700 mt-3 ">
                                  {errors.image.message}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex-col">
                            <lable
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                            >
                              نام کالا:
                            </lable>
                            <div>
                              <input
                                {...register("name")}
                                type="text"
                                placeholder="نام کالا را وارد کنید"
                                id="name"
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
                            <lable className="block mb-2  text-sm font-medium text-orange-900 dark:text-white">
                              قیمت کالا:
                            </lable>

                            <div className="">
                              <input
                                {...register("price")}
                                name="price"
                                type="number"
                                className="block p-2  w-full mb-5 text-xs text-orange-900 border border-orange-300
                       rounded-lg cursor-pointer bg-white dark:text-orange-400
                       focus:outline-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-black"
                              />
                              {errors.price && (
                                <span className="text-sm text-red-700 mt-3 ">
                                  {errors.price.message}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex-col">
                            <lable className="block mb-2  text-sm font-medium text-orange-900 dark:text-white">
                              موجودی :
                            </lable>

                            <div className="">
                              <input
                                {...register("quantity")}
                                name="quantity"
                                type="number"
                                className="block p-2  w-full mb-5 text-xs text-orange-900 border border-orange-300
                       rounded-lg cursor-pointer bg-white dark:text-orange-400
                       focus:outline-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-black"
                              />
                              {errors.quantity && (
                                <span className="text-sm text-red-700 mt-3 ">
                                  {errors.quantity.message}
                                </span>
                              )}
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
                            {...register("category")}
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
                          {errors.category && (
                            <span className="text-sm text-red-700 mt-3 ">
                              {errors.category.message}
                            </span>
                          )}
                        </div>
                        <lable
                          htmlFor="text"
                          className="block mb-2 text-sm font-medium text-pimk-900 dark:text-white"
                        >
                          توضیحات:
                        </lable>
                        <div>
                          <textarea
                            {...register("description")}
                            name="description"
                            rows="2"
                            id="text"
                            className="block p-2.5 w-full text-sm text-pimk-900 bg-pimk-50 outline-none
                        rounded-lg border border-pimk-300 focus:ring-orange-500
                         focus:border-orange-500 dark:bg-pimk-700 dark:border-pimk-600
                          dark:placeholder-black dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                            placeholder="......توضیحات"
                          ></textarea>
                          {errors.description && (
                            <span className="text-sm text-red-700 mt-3 ">
                              {errors.description.message}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                          <lable className="block mb-2  text-sm font-medium text-orange-900 dark:text-white">
                            نمایش در صفحه اصلی :
                          </lable>

                          <div className="">
                            <input
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
                          type="button"
                          onClick={HandleModal}
                          className="bg-red-800 w-[8rem] p-2 rounded-md text-[1.2rem] text-white  focus:border-orange-500"
                        >
                          بستن
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] relative overflow-x-auto shadow-xl sm:rounded-lg dir-rtl m-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" py-3 pl-24">
                  تصویر
                </th>
                <th scope="col" className="px-6 py-3">
                  نام کالا
                </th>
                <th scope="col" className="px-6 py-3">
                  دسته بندی
                </th>
                <th scope="col" className="px-3 py-3 text-center pl-3">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-3 mr-14 py-4 flex items-center justify-center ">
                      <img
                        src={`${BASE_URL}/files/${item.image}`}
                        height="40px"
                        width="40px"
                      />
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4  flex justify-center">
                      <p
                        onClick={() => deleteHandler(item.id)}
                        className="font-medium text-orange-600 dark:text-orange-500 hover:underline ml-3"
                      >
                        حذف
                      </p>

                      <p
                        onClick={() => EditHandler(item)}
                        className="font-medium text-orange-600 dark:text-orange-500 hover:underline"
                      >
                        ویرایش
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10 flex justify-center items-center">
        <ReactPaginate
          className="pagination flex gap-4 flex-row-reverse bg-gray-500 p-5 rounded-2xl text-white "
          breakLabel="..."
          nextLabel="بعد > "
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< قبل"
          renderOnZeroPageCount={null}
          activeClassName="activePagination"
        />
      </div>

      {/* -------------------------------------delete modal----------------------------- */}

      {modalMood && <EditModal item={item} />}
      {modalOn && (
        <DeleteModal
          setModalOn={setModalOn}
          SetChoice={SetChoice}
          id={id}
          choice={choice}
        />
      )}
    </div>
  );
};

export default ProductManaging;
