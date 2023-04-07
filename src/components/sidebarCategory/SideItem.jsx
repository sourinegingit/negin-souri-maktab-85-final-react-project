import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideItem = ({ name,path }) => {
  const navigate=useNavigate()
  const handleNavigate=(route)=>{
    navigate(`${route}`)
  }


  return (
    <div className=' mr-5 h-auto  w-[60%] border-b-2 border-b-orange-600 text-orange-700  items-start flex-col mb-10'>
      <p className="m-2 text-600" onClick={()=>handleNavigate(path)}>{name}</p>
    </div>
  );
};

export default SideItem;
