import { cn } from "@/lib/utils";
import { useEditorState } from "@/store/use-editor-store";
import { Link2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";

export const LinkButton = () => {
  const { editor } = useEditorState();
  const [value, setValue] = useState(editor?.getAttributes("link")?.href || "");
  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  const isActive = editor?.isActive("link");
  return (
    <DropdownMenu
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setValue(editor?.getAttributes("link")?.href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm",
            isActive && "bg-neutral-200/80"
          )}
        >
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          type="text"
          value={value}
          disabled={isActive}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-2 py-1 rounded-sm border border-neutral-300"
        />
        {isActive && (
          <Button
            onClick={() => editor?.chain().focus().unsetLink().run()}
            className="rounded-sm"
          >
            Remove
          </Button>
        )}
        {!isActive && (
          <Button
            onClick={() => onChange(value)}
            className="px-2 py-1 rounded-sm"
          >
            Apply
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
