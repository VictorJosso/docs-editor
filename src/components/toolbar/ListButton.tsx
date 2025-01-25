import { cn } from "@/lib/utils";
import { useEditorState } from "@/store/use-editor-store";
import { ListIcon, ListOrderedIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ListButton = () => {
  const { editor } = useEditorState();

  const listTypes = [
    {
      label: "Bullet List",
      value: "bullet_list",
      icon: ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      value: "ordered_list",
      icon: ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm",
            (editor?.isActive("bulletList") ||
              editor?.isActive("orderedList")) &&
              "bg-neutral-200/80"
          )}
        >
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {listTypes.map((listType) => (
          <button
            key={listType.value}
            onClick={listType.onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              listType.isActive && "bg-neutral-200/80"
            )}
          >
            <listType.icon className="size-4" />
            <span>{listType.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
