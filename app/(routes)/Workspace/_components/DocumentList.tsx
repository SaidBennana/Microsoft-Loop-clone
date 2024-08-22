import { db } from "@/config/firebaseConfiger";
import clsx from "clsx";
import { deleteDoc, doc } from "firebase/firestore";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import DocumentOption from "./DocumentOption";

export default function DocumentList({
  docments,
  params,
}: {
  docments: [];
  params: any;
}) {
  const deleteDocument = async (id: string) => {
    await deleteDoc(doc(db, "WorkspaceDocument", id));
    toast("Document Deleted", {});
  };
  return (
    <div className="flex flex-col gap-3">
      {docments.map((doc: any, index) => {
        return (
          <Link
            href={`/Workspace/${params.workspaceId}/${doc?.id}`}
            className={clsx(
              "flex text-start justify-between gap-2 items-center cursor-pointer duration-300 rounded-lg p-2 hover:bg-gray-200",
              {
                "border-2 border-primary": doc?.id == params?.documentId,
              }
            )}
            key={index}
          >
            <div className="flex items-center gap-2">
              {doc?.emoji ? doc?.emoji : <Edit2 size={20} />}
              <h2 className="font-medium">{doc?.name}</h2>
            </div>
            <DocumentOption
              onDelete={() => {
                deleteDocument(doc?.id);
              }}
            />
          </Link>
        );
      })}
    </div>
  );
}
