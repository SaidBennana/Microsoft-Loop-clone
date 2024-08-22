"use client";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfiger";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import DocumentList from "./DocumentList";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function SideNav({ params }: { params: any }) {
  const [documents, setDocuments] = useState<any>([]);
  const { user } = useUser();
  const MAX_FILE = 5;

  async function GetDocumentsList() {
    const q = query(
      collection(db, "WorkspaceDocument"),
      where("workspaceId", "==", params?.workspaceId)
    );

    const ubsubscrip = onSnapshot(q, (snapShot) => {
      setDocuments([]);
      snapShot.forEach((doc) => {
        setDocuments((old: any) => [...old, doc.data()]);
      });
    });
  }

  useEffect(() => {
    GetDocumentsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  /// Creates a new workspace document in the Firestore database.
  const CreateNewWorkspaceDocument = async () => {
    if (documents?.length >= MAX_FILE) {
      toast("Uparade to add new file", {
        description:
          "You have reached the maximum number of files in this workspace. Upgrade to add more files.",
        action: {
          label: "Upgrade",
          onClick: () => {},
        },
      });

      return;
    }
    const docId = uuid4().toString();
    await setDoc(doc(db, "WorkspaceDocument", docId), {
      workspaceId: params.workspaceId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      emoji: null,
      conveImage: null,
      name: "Untitleb Document",
      id: docId,
      documentOutput: [],
    });
    await setDoc(doc(db, "documentOutput", docId), {
      docId: docId,
      output: {
        time: 1724328514628,
        version: "2.30.5",
        blocks: [
          {
            type: "header",
            id: "NqrquiNy2y",
            data: {
              level: 1,
              text: "Get started",
            },
          },
        ],
      },
    });
  };

  return (
    <div className="w-72 fixed h-screen bg-blue-50 px-5">
      <div className="flex justify-between  py-6 items-center">
        <Logo />
        <Bell className="w-5 h-5 text-gray-500" />
      </div>
      <hr className="my-3" />
      <div className="flex items-center justify-between mt-5">
        <h2 className="text-xl text-gray-600 font-semibold">Workspace Name</h2>
        <Button
          onClick={CreateNewWorkspaceDocument}
          className="w-8 h-8"
          size="icon"
        >
          +
        </Button>
      </div>
      <div className="mt-6">
        <DocumentList params={params} docments={documents} />
      </div>
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documents?.length / MAX_FILE) * 100} />
        <h3 className="text-sm">{documents?.length} Out of 5 files</h3>
        <p className="text-sm opacity-70">
          Upgrade your plan for unlimted access
        </p>
      </div>
    </div>
  );
}
