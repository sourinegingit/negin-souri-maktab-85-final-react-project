import React from "react";
import SideItem from "./SideItem";


const SideBar = () => {
  return (
    <div className=" p-5 h-screen w-[20%] bg-gray-300 absolute border-orange-500 right-0 text-right  ">
      <SideItem name='شال بهاره' path='/spingCollection' />
      <SideItem name='شال تابستانه' path='/summerCollection'/>
      <SideItem name='شال پاییزه' path='/fallCollection'/>
      <SideItem name='شال زمستانه' path='/winterCollection'/>
 
    </div>
  );
};

export default SideBar;
