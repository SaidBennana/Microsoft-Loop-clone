import React from "react";
import SideNav from "../_components/SideNav";

function page({ params }: any) {
  return (
    <div>
      <SideNav params={params} />
    </div>
  );
}

export default page;
