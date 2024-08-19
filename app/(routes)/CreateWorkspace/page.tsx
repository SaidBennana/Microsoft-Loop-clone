"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [workspaceName, setWorkspaceName] =
    useState<string>("/images/cover.jpg");
  return (
    <div className="px-80 py-20">
      <Button variant="link">
        <ArrowLeftIcon /> Cancel
      </Button>
      <div className="shadow-xl mt-5 rounded-xl">
        <CoverPicker
          setNewCover={(value) => {
            setWorkspaceName(value!);
          }}
        >
          <div className="relative group duration-300 cursor-pointer">
            <h1 className="absolute text-xl items-center justify-center h-full w-full opacity-100 hidden group-hover:flex">
              Change Cover
            </h1>
            <Image
              width={1000}
              height={1000}
              className="w-full h-[150px] object-cover rounded-t-xl duration-300 group-hover:opacity-75"
              src={workspaceName}
              alt=""
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
          <Button size="icon" variant="outline">
            <SmilePlus />
          </Button>
          <Input
            onChange={(e) => setWorkspaceName(e?.target?.value)}
            placeholder={"Your workspace name (e.g., My Team, My Project)"}
          />
        </div>
        <div className="mt-10 flex justify-end px-10 pb-6">
          <Button disabled={workspaceName?.length <= 4}>Create</Button>
          <Button variant="outline" className="ml-2">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
