import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MINIMUM_SPACE = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));
      if (isDraggingLeft) {
        const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUM_SPACE;
        const newLeftPosition = Math.min(maxLeftPosition, rawPosition);
        setLeftMargin(newLeftPosition); // TODO: make collaborative
      } else if (isDraggingRight) {
        const maxRightPosition = PAGE_WIDTH - leftMargin - MINIMUM_SPACE;
        const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
        const contrainedRightPosition = Math.min(
          maxRightPosition,
          newRightPosition
        );
        setRightMargin(contrainedRightPosition); // TODO: make collaborative
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleDoubleClickLeft = () => {
    setLeftMargin(56);
  };

  const handleDoubleClickRight = () => {
    setRightMargin(56);
  };

  return (
    <div
      className="h-6 flex items-end relative select-none print:hidden"
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {}}
    >
      <div
        id="ruler-container"
        className="max-w-[816px] mx-auto h-full w-full relative border-b border-grey-300"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleDoubleClickLeft}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleDoubleClickRight}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((i) => {
              const position = (i * 816) / 82;

              return (
                <div
                  key={i}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {i % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {i / 10 + 1}
                      </span>
                    </>
                  )}
                  {i % 5 === 0 && i % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {i % 1 === 0 && i % 5 !== 0 && i % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft?: boolean;
  isDragging?: boolean;
  onMouseDown?: () => void;
  onDoubleClick?: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2 transition-opacity"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3B72F6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
