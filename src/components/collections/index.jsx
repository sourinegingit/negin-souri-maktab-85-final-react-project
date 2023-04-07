import React from "react";
import SideBar from "../sidebarCategory";
import DataInformation from "./dataInformation";

const Collection = () => {
  return (
    < >
      <div className=" relative w-[100%]  ">
        <SideBar />
      </div>
      <div>
        <DataInformation />
      </div>
    </>
  );
};

export default Collection;
