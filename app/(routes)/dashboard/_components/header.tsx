"use client";
import Logo from "@/app/_components/Logo";
import { db } from "@/config/firebaseConfiger";
import {
  OrganizationSwitcher,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function Header() {
  const { user } = useUser();

  useEffect(() => {
    saveUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const saveUser = async () => {
    try {
      const id = user?.primaryEmailAddress?.emailAddress;
      await setDoc(doc(db, "users", id!), {
        name: user?.fullName,
        avater: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (error: any) {
      toast(error?.message);
    }
  };
  return (
    <div className="flex justify-between px-10 py-4 border-b">
      <Logo />
      <OrganizationSwitcher
        afterCreateOrganizationUrl={"/dashboard"}
        afterLeaveOrganizationUrl={"/dashboard"}
      />
      <UserButton />
    </div>
  );
}
