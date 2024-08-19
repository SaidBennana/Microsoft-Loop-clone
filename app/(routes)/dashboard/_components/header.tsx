"use client";
import { OrganizationSwitcher, useAuth, UserButton } from "@clerk/nextjs";
import React from "react";

export default function Header() {
  const { orgId } = useAuth();
  return (
    <div className="flex justify-between px-10 py-4 border-b">
      <h1 className="font-extrabold text-xl">
        <span className="text-primary">OPP</span> Loop
      </h1>
      <OrganizationSwitcher
        afterCreateOrganizationUrl={"/dashboard"}
        afterLeaveOrganizationUrl={"/dashboard"}
      />
      <UserButton />
    </div>
  );
}
