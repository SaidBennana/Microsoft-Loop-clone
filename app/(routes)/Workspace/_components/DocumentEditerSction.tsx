import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichDocumentEditor from "./RichDocumentEditor";

export default function DocumentEditerSction({ params }: { params: any }) {
  return (
    <div>
      {/* Header section 1*/}
      <DocumentHeader />
      {/* cover image section 2*/}
      <DocumentInfo params={params} />
      {/* Ritch document Editor section 3*/}
      <RichDocumentEditor params={params}/>
    </div>
  );
}
