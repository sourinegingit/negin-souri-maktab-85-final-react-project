import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import "../../tabs/productPagination.css";
import Tr from "./Tr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const StockPriceManagment = () => {
  const { priceList } = useSelector((state) => state.price);
  const { quantityList } = useSelector((state) => state.quantity);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3002/products").then((res) => {
      setProductData(res.data);
    });
  }, []);
  //---------------------------------------------------
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 4;

  const currentItems = productData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productData.length / 4);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % productData.length;
    setItemOffset(newOffset);
  };
  const editHandler = async () => {
   await Promise.all(
      priceList.map((item) =>
        axios.put(`http://localhost:3002/products/${item.id}`, item)
      )
    );
     await Promise.all(
      quantityList.map((item) =>
        axios.put(`http://localhost:3002/products/${item.id}`, item)
      )
    );
    axios.get(`http://localhost:3002/products`).then((res) => {
      setProductData(res.data);
    });
    toast.success("فیلد مورد نظر ذخیره شد", {
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
    <div>
      <div className="flex justify-between items-center text-orange-800  text-xl w-[70%] -mt-10 m-auto ">
        <p>مدیریت موجودی و قیمت ها</p>

        <button
          onClick={editHandler}
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
          ذخیره
        </button>
      </div>
      <div className="w-[60%] relative overflow-x-auto shadow-xl sm:rounded-lg dir-rtl m-auto">
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px- py-3 pl-6">
                کالا
              </th>
              <th scope="col" className="px-16  py-3">
                قیمت
              </th>
              <th scope="col" className="px-16 py-3">
                موجودی
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => {
              return <Tr item={item} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-10 flex justify-center items-center ">
        <ReactPaginate
          className="pagination flex gap-4 flex-row-reverse bg-gray-500 p-5 text-white rounded-2xl"
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
    </div>
  );
};

export default StockPriceManagment;
