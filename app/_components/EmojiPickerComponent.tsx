import React, { ReactNode, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
export default function EmojiPicker_Component({
  children,
  setEmoji,
}: {
  children: ReactNode;
  setEmoji: (value: EmojiClickData) => void;
}) {
  const PopoverTriggerRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Popover>
        <PopoverTrigger
          ref={PopoverTriggerRef}
          className="flex justify-center items-center rounded-md p-2 h-full"
        >
          {children}
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <EmojiPicker
            onEmojiClick={(v) => {
              setEmoji(v);
              PopoverTriggerRef?.current?.click();
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
