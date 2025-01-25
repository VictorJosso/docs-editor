import { useEditorState } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const FontSizeButton = () => {
  const { editor } = useEditorState();
  const currentFontSize = editor?.getAttributes("textStyle")?.fontSize
    ? editor?.getAttributes("textStyle")?.fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newFontSize: string) => {
    const size = parseInt(newFontSize, 10);
    if (!isNaN(size) && size > 0) {
      setFontSize(newFontSize);
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newFontSize);
      setInputValue(newFontSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const size = parseInt(fontSize, 10);
    if (size < 100) {
      updateFontSize(`${size + 1}`);
    }
  };

  const decrement = () => {
    const size = parseInt(fontSize, 10);
    if (size > 1) {
      updateFontSize(`${size - 1}`);
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
          }}
          className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent cursor-text hover:bg-neutral-200/80"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};
