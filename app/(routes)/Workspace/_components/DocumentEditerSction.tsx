import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichDocumentEditor from "./RichDocumentEditor";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import CommentBox from "./CommentBox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DocumentEditerSction({ params }: { params: any }) {
  return (
    <div>
      {/* Header section 1*/}
      <DocumentHeader />
      {/* cover image section 2*/}
      <DocumentInfo params={params} />
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {/* Ritch document Editor section 3*/}
          <RichDocumentEditor params={params} />
        </div>
        <div className="fixed bottom-10 right-10">
          <Popover>
            <PopoverTrigger className="bg-primary text-white rounded-full p-3">
              <MessageCircle />
            </PopoverTrigger>
            <PopoverContent>
              <CommentBox />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
