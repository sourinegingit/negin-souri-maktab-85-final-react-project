import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  return (
    <section className="">
      <div className="flex  justify-center items-center ">
        <input
          type="text"
          placeholder=" سرچ کنید ..."
          className="w-72 bg-gray-100 p-1 ml-1  border border-orange-300  focus:border-orange-600 focus:outline-none"
        />
    <div className="bg-gray-100 p-2  border border-orange-300  focus:border-orange-600 focus:outline-none">
    <AiOutlineSearch />
    </div>
      </div>
    </section>
  );
};

export default Search;
