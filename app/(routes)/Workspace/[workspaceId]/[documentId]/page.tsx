import React from "react";
import SideNav from "../../_components/SideNav";
import DocumentEditerSction from "../../_components/DocumentEditerSction";

export default function Workspace({ params }: { params: any }) {
  return (
    <div>
      {/* sidbar */}
      <div>
        <SideNav params={params} />
      </div>
      {/* document */}
      <div className="ml-72">
        <DocumentEditerSction params={params}/>
      </div>
    </div>
  );
}
