"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfiger";
import { useAuth, useUser } from "@clerk/nextjs";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { Grid2X2, TableOfContents } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WorkspaceCard from "./WorkspaceCard";

export default function WorkspaceList() {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState<any>([]);
  const { orgId } = useAuth();

  useEffect(() => {
    Get_workspaceList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId,user]);

  const Get_workspaceList = async () => {
    const refDoc = query(
      collection(db, "Workspace"),
      where(
        "orgId",
        "==",
        orgId ? orgId : user?.primaryEmailAddress?.emailAddress
      )
    );
    const data = await getDocs(refDoc);
    setWorkspaceList([]);
    data.forEach((doc) => {
      setWorkspaceList((old: any) => [...old, doc.data()]);
    });
    console.log(workspaceList);
  };
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
        <div className="grid grid-cols-4 gap-4 mt-6">
          {workspaceList.map((item: any) => {
            return <WorkspaceCard workspaceId={item.id} emoji={item?.emoji} name={item?.name} key={item?.name} image={item?.conveImage}/>;
          })}
        </div>
      )}
    </div>
  );
}
