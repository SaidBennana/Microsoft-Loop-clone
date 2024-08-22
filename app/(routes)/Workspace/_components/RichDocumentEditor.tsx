"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import List from '@editorjs/list';
// @ts-ignoreimport List from "@editorjs/list";
import Alert from "editorjs-alert";
// @ts-ignoreimport List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
// @ts-ignoreimport List from "@editorjs/list";
import SimpleImage from "simple-image-editorjs";
// @ts-ignoreimport List from "@editorjs/list";
import Table from "@editorjs/table";
// @ts-ignoreimport List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import { useUser } from "@clerk/nextjs";
// @ts-ignoreimport List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfiger";
import GenerateAi from "./GenerateAi";

function RichDocumentEditor({ params }: { params: any }) {
  const ref = useRef<EditorJS>();
  let editor: any;
  let isFetched = false;
  const { user } = useUser();
  useEffect(() => {
    InitEditor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Get_Document = () => {
    onSnapshot(doc(db, "documentOutput", params?.documentId), (doc) => {
      if (
        doc.data()?.editeBy != user?.primaryEmailAddress?.emailAddress ||
        isFetched == false
      ) {
        console.log(
          doc.data()?.editedBy,
          " , ",
          user?.primaryEmailAddress?.emailAddress
        );
        console.log("change");
        doc.data()?.output && editor?.render(JSON.parse(doc.data()?.output));
      }
      isFetched = true;
    });
  };

  const save_document = () => {
    ref.current?.save().then(async (outputData: any) => {
      const refDoc = doc(db, "documentOutput", params?.documentId);
      await updateDoc(refDoc, {
        output: JSON.stringify(outputData),
        editeBy: user?.primaryEmailAddress?.emailAddress
          ? user?.primaryEmailAddress?.emailAddress
          : "",
      });
    });
  };

  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        onChange: (ap, event) => {
          save_document();
        },
        onReady: () => {
          Get_Document();
        },

        /**
         * Id of Element that should contain Editor instance
         */
        holder: "editorjs",
        tools: {
          header: Header,
          delimiter: Delimiter,
          paragraph: Paragraph,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+A",
            config: {
              alertTypes: [
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger",
                "light",
                "dark",
              ],
              defaultType: "primary",
              messagePlaceholder: "Enter something",
            },
          },
          list: {
            // @ts-ignoreimport List from "@editorjs/list";
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          table: Table,
          checklist: {
            class: Checklist,
            shortcut: "CMD+SHIFT+C",
            inlineToolbar: true,
          },
          image: SimpleImage,
          code: {
            class: CodeTool,
            shortcut: "CMD+SHIFT+P",
          },
          //   textVariant: TextVariantTune
        },
      });
      ref.current = editor;
    }
  };
  return (
    <div className="mt-10 ms-20 relative">
      <div id="editorjs"></div>
      <div className="fixed bottom-28 left-5">
        <GenerateAi setGeneratedOutput={(output) => editor?.render(output)} />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
