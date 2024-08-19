"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Grid2X2, TableOfContents } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function WorkspaceList() {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState([]);
  return (
    <div className="mt-20 px-40">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Hello , {user?.fullName}</h2>
        <Link href="/CreateWorkspace">
          <Button size="icon">+</Button>
        </Link>
      </div>
      <div className="flex justify-between mt-6">
        <h2 className="text-primary">Workspace</h2>
        <div>
          <Button size="icon" variant="ghost">
            <Grid2X2 />
          </Button>
          <Button size="icon" variant="ghost">
            <TableOfContents />
          </Button>
        </div>
      </div>

      {workspaceList.length == 0 ? (
        <div className="w-full flex items-center mt-6 flex-col justify-center">
          <Image
            width={400}
            height={400}
            alt="workspace Image"
            src="/images/workspace.png"
          />
          <Link href="/CreateWorkspace">
            <Button size="sm" className="mt-6">
              + Create Workspace
            </Button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
