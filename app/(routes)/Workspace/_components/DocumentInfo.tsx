"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPicker_Component from "@/app/_components/EmojiPickerComponent";
import { db } from "@/config/firebaseConfiger";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function DocumentInfo({ params }: { params: any }) {
  const [workspaceCover, setWorkspaceCover] = useState("/images/cover.jpg");
  const [Emoji, setEmoji] = useState("😀");
  const [DocumentName, setDocumentName] = useState<any>({});

  useEffect(() => {
    GetDocumentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  /**
   * Retrieves the document information for the current workspace.
   */
  const GetDocumentInfo = async () => {
    const docRef = doc(db, "WorkspaceDocument", params?.documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setDocumentName(docSnap.data());
      docSnap.data().emoji && setEmoji(docSnap.data().emoji);
      docSnap.data().conveImage && setWorkspaceCover(docSnap.data().conveImage);
    }
  };

  const UpdateDocument = async (body: any) => {
    const refDoc = doc(db, "WorkspaceDocument", params?.documentId);
    const docSnap = await updateDoc(refDoc, body);
  };
  return (
    <div>
      <CoverPicker
        setNewCover={(value) => {
          setWorkspaceCover(value!);
          UpdateDocument({
            conveImage: value,
          });
        }}
      >
        <div className="relative group duration-300 cursor-pointer">
          <h1 className="absolute text-xl items-center justify-center h-full w-full opacity-100 hidden group-hover:flex">
            Change Cover
          </h1>
          <Image
            width={1000}
            height={1000}
            className="w-full h-[200px] object-cover rounded-t-xl duration-300 group-hover:opacity-75"
            src={workspaceCover}
            alt="cover"
          />
        </div>
      </CoverPicker>
      <div className="absolute mt-[-40px] ms-5">
        <EmojiPicker_Component
          setEmoji={(v) => {
            setEmoji(v.emoji);
            UpdateDocument({
                emoji: v.emoji,
            })
          }}
        >
          <div className="p-1 bg-white/50 rounded-lg text-3xl">{Emoji}</div>
        </EmojiPicker_Component>
      </div>
      <div className="mt-10 ms-5">
        <input
          onBlur={(e) => {
            UpdateDocument({
              name: e.target?.value,
            });
          }}
          className="font-bold text-3xl outline-none w-full"
          type="text"
          placeholder="Utitled Document"
          defaultValue={DocumentName?.name}
        />
      </div>
    </div>
  );
}
