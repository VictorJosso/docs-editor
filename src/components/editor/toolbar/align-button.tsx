import { cn } from "@/lib/utils";
import { useEditorState } from "@/store/use-editor-store";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export const AlignButton = () => {
  const { editor } = useEditorState();

  const alignments = [
    { label: "Left", value: "left", icon: AlignLeftIcon },
    { label: "Center", value: "center", icon: AlignCenterIcon },
    { label: "Right", value: "right", icon: AlignRightIcon },
    { label: "Justify", value: "justify", icon: AlignJustifyIcon },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map((alignment) => (
          <button
            key={alignment.value}
            onClick={() => {
              editor?.chain().focus().setTextAlign(alignment.value).run();
              console.log("Alignment", alignment.value);
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: alignment.value }) &&
                "bg-neutral-200/80"
            )}
          >
            <alignment.icon className="size-4" />
            <span>{alignment.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
