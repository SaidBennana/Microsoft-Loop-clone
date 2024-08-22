"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfiger";
import { CircleDashed, Loader2Icon } from "lucide-react";

export function Room({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  // const Key = process!.env!.NEXT_PUBLIC_LIVEBLOCK_KEY!;
  return (
    <LiveblocksProvider
      authEndpoint={`/api/liveblocks-auth?roomId=${params.documentId}`}
      resolveUsers={async ({ userIds }) => {
        const q = query(collection(db, "users"), where("email", "in", userIds));
        const snapshot = await getDocs(q);
        const listUser: Array<any> = [];
        snapshot.forEach((doc) => {
          listUser.push(doc.data());
        });

        return [...listUser];
      }}
    >
      <RoomProvider id={params?.documentId}>
        <ClientSideSuspense fallback={<div className="w-full min-h-screen flex justify-center items-center">
          <CircleDashed strokeWidth={1} className="animate-spin w-20 h-20 text-primary"/>
        </div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
