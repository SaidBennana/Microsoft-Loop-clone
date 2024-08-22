"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EmojiPicker_Component from "@/app/_components/EmojiPickerComponent";
import { EmojiClickData } from "emoji-picker-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfiger";
import { useAuth, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import uuid4 from "uuid4";

export default function Page() {
  const [workspaceCover, setWorkspaceCover] =
    useState<string>("/images/cover.jpg");
  const [workspaceName, setWorkspaceName] =
    useState<string>("/images/cover.jpg");
  const [emoji, setEmoji] = useState<EmojiClickData>();
  const { user } = useUser();
  const { orgId } = useAuth();
  const route = useRouter();

  const [loading, setLoading] = useState(false);
  // create Workspace
  const onCreateWorkspace = async () => {
    setLoading(true);
    const WorkspaceId = Date.now();
    await setDoc(doc(db, "Workspace", WorkspaceId.toString()), {
      name: workspaceName,
      conveImage: workspaceCover,
      emoji: emoji?.emoji,
      id: WorkspaceId.toString(),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
    });

    const docId = uuid4().toString();
    await setDoc(doc(db, "WorkspaceDocument", docId), {
      workspaceId: WorkspaceId.toString(),
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
    setLoading(false);
    route.replace(`/Workspace/${WorkspaceId}/${docId}`);
  };

  return (
    <div
      className={clsx("px-80 py-20", {
        "opacity-70": loading,
        "pointer-events-none": loading,
      })}
    >
      <Link href="/dashboard">
        <Button variant="link">
          <ArrowLeftIcon /> Cancel
        </Button>
      </Link>
      <div className="shadow-xl mt-5 rounded-xl">
        <CoverPicker
          setNewCover={(value) => {
            setWorkspaceCover(value!);
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
        <div className="mt-10 px-10">
          <h1 className="text-xl font-semibold">Create a new workspace</h1>
          <h1 className="text-sm opacity-80">
            This is a shared space where you can collaborate wih your team. You
            cn always rename tater.
          </h1>
        </div>
        {/* input section */}
        <div className="mt-10 flex gap-3 px-10">
          <EmojiPicker_Component
            setEmoji={(v) => {
              setEmoji(v);
            }}
          >
            {emoji?.emoji ? emoji.emoji : <SmilePlus />}
          </EmojiPicker_Component>
          <Input
            onChange={(e) => setWorkspaceName(e?.target?.value)}
            placeholder={"Your workspace name (e.g., My Team, My Project)"}
          />
        </div>
        <div className="mt-10 flex justify-end px-10 pb-6">
          <Button
            onClick={onCreateWorkspace}
            disabled={workspaceName?.length <= 4}
          >
            Create
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" className="ml-2">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
