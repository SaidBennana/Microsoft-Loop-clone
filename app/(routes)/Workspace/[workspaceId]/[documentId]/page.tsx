import React from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditerSction from "../../_components/DocumentEditerSction";
import { Room } from "@/app/Room";

export default function Workspace({ params }: { params: any }) {
  return (
    <Room params={params}>
      {/* sidbar */}
      <div>
        <SideNav params={params} />
      </div>
      {/* document */}
      <div className="ml-72">
        <DocumentEditerSction params={params}/>
      </div>
    </Room>
  );
}
