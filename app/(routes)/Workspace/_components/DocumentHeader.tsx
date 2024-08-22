import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

export default function DocumentHeader() {
  return (
    <div className="flex items-center justify-between py-3 px-7 shadow-md">
      <div></div>
      <OrganizationSwitcher />
      <div className="flex gap-2 items-center">
        <Button size="sm">Share</Button>
        <UserButton />
      </div>
    </div>
  );
}
