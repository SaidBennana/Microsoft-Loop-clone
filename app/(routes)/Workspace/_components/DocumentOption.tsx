import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Link2, PenBox, Trash2 } from "lucide-react";
import React from "react";

export default function DocumentOption({onDelete,onRename,onShare}: {onDelete?: ()=>void,onRename?: ()=>void,onShare?: ()=>void}) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical strokeWidth={1} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onShare} className="flex gap-2 items-center cursor-pointer">
            <Link2 strokeWidth={1} size={15} />
            Share link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRename} className="flex gap-2 items-center cursor-pointer">
            <PenBox strokeWidth={1} size={15} />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="flex text-red-400 gap-2 items-center cursor-pointer"
          >
            <Trash2 strokeWidth={1} size={15} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
