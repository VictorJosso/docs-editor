import { cn } from "@/lib/utils";
import { useEditorState } from "@/store/use-editor-store";
import { Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const HeadingLevelButton = () => {
  const { editor } = useEditorState();

  const headings = [
    { Label: "Normal text", value: 0, fontSize: "16px" },
    { Label: "Heading 1", value: 1, fontSize: "32px" },
    { Label: "Heading 2", value: 2, fontSize: "24px" },
    { Label: "Heading 3", value: 3, fontSize: "20px" },
    { Label: "Heading 4", value: 4, fontSize: "18px" },
    { Label: "Heading 5", value: 5, fontSize: "16px" },
    { Label: "Heading 6", value: 6, fontSize: "13px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive(`heading`, { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map((heading) => (
          <DropdownMenuItem
            key={heading.value}
            onClick={() => {
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              getCurrentHeading() === heading.Label && "bg-neutral-200/80"
            )}
            style={{ fontSize: heading.fontSize }}
          >
            {heading.Label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
