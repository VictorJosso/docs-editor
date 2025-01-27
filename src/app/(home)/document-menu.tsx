import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@clerk/nextjs";
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import { Doc, Id } from "../../../convex/_generated/dataModel";

interface DocumentMenuProps {
  document: Doc<"documents">;
  title: string;
  ownNewTab: (id: Id<"documents">) => void;
}

export const DocumentMenu = ({
  document,
  title,
  ownNewTab,
}: DocumentMenuProps) => {
  const { userId, has } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(document.ownerId === userId ||
          (has && has({ role: "org:admin" }))) && (
          <>
            <RenameDialog documentId={document._id} initialTitle={title}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <FilePenIcon className="size-4 mr-2" />
                Rename
              </DropdownMenuItem>
            </RenameDialog>
            <RemoveDialog document={document}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <TrashIcon className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </RemoveDialog>
          </>
        )}

        <DropdownMenuItem onClick={() => ownNewTab(document._id)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
