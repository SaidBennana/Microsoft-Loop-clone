import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/config/GoogleAI";
import { LoaderCircleIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export default function GenerateAi({
  setGeneratedOutput,
}: {
  setGeneratedOutput: (output: any) => void;
}) {
  const [InputValue, setInputValue] = useState("");
  const [isLaoding, set_isLaoding] = useState(false);
  const DailogTriggerRef = useRef<HTMLButtonElement>(null);

  const Generate = async () => {
    set_isLaoding(true);
    const PROMPT =
      "generate a template for Editor.js in JSON for " + InputValue;
    const result = await chatSession.sendMessage(PROMPT);
    try {
      const output = JSON.parse(result.response.text());
      setGeneratedOutput(output);
      console.log(output)
      DailogTriggerRef.current?.click();
    } catch (error) {
      set_isLaoding(false);
      toast("Error in generating template", {
        style: {
          background: "#f44336",
          color: "#fff",
        },
      });
    }
    set_isLaoding(false);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger
          ref={DailogTriggerRef}
          className="z-50 border p-1 rounded-lg border-primary text-primary"
        >
          Generate AI
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI</DialogTitle>
            <DialogDescription>
              What vou want to write in document?
            </DialogDescription>
          </DialogHeader>
          <textarea
            className="w-full h-40 p-2 rounded-lg border-primary"
            onChange={(event) => {
              setInputValue(event?.target?.value);
            }}
            color="20"
            placeholder="Ex. Project idea"
          />
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={Generate}
              disabled={InputValue.length <= 4 || isLaoding}
            >
              {isLaoding ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Generat"
              )}
            </Button>
            <DialogClose>Cancle</DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
