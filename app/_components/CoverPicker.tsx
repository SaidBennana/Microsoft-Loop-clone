"use client";
import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CoverImages from "../_shared/CoverOption";
import Image from "next/image";
import clsx from "clsx";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CoverPicker({
  children,
  setNewCover,
}: {
  children: ReactNode;
  setNewCover: (value?: string) => void;
}) {
  const [coverSelect, setCoverSelect] = useState<string>();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Cover</DialogTitle>
            <DialogDescription>
              Choose a cover image for your microsite
            </DialogDescription>
            <div className="grid grid-cols-3 gap-3 mt-9">
              {CoverImages.map((cover, index) => (
                <Image
                  onClick={() => {
                    setCoverSelect(cover.imageUrl);
                  }}
                  className={clsx("h-[80px] w-full rounded-md cursor-pointer", {
                    "outline outline-primary outline-offset-1":
                      coverSelect == cover.imageUrl,
                  })}
                  width={200}
                  height={140}
                  key={index}
                  alt="cover"
                  src={cover.imageUrl}
                />
              ))}
            </div>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setNewCover(coverSelect)}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
