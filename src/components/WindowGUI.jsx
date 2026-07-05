import React, { useEffect, useState, useRef } from "react";

function WindowGUI({ title, onClose, children, desktopRef, x, y, onFocus }) {
  const windowRef = useRef(null);
  const resizingRef = useRef(null);

  const [position, setPosition] = useState({
    X: x,
    Y: y,
  });
  const [size, setSize] = useState({
    width: 700,
    height: 500,
  });
  const offset = useRef({
    X: 0,
    Y: 0,
  });
  const draggingRef = useRef(false);
  const handlePointerMove = (e) => {
    drag(e);
    resize(e);
  };
  const handlePointerUp = (e) => {
    draggingRef.current = false;
    resizingRef.current = null;
  };

  const drag = (e) => {
    if (draggingRef.current) {
      const maxX =
        desktopRef.current.clientWidth - windowRef.current.offsetWidth;
      const maxY =
        desktopRef.current.clientHeight - windowRef.current.offsetHeight;
      let mouseX = e.clientX;
      let mouseY = e.clientY;
      let windowX = mouseX - offset.current.X;
      let windowY = mouseY - offset.current.Y;
      windowX = Math.max(0, Math.min(windowX, maxX));
      windowY = Math.max(70, Math.min(windowY, maxY));

      setPosition({
        X: windowX,
        Y: windowY,
      });
    }
  };
  const resize = (e) => {
    if (resizingRef.current === "right") {
      let windowWidth = e.clientX - position.X;
      const MIN_WIDTH = 300;
      windowWidth = Math.min(
        desktopRef.current.clientWidth - position.X - 10,
        Math.max(MIN_WIDTH, windowWidth),
      );
      setSize((prev) => ({
        ...prev,
        width: windowWidth,
      }));
    }

    if (resizingRef.current === "left") {
      let rightEdge = position.X + size.width;
      let newX = e.clientX;
      let windowWidth = rightEdge - newX;
      const MIN_WIDTH = 300;
      let MAX_X = rightEdge - 300;
      windowWidth = Math.min(
        desktopRef.current.clientWidth - position.X - 10,
        Math.max(MIN_WIDTH, windowWidth),
      );

      newX = Math.min(MAX_X, newX);
      setSize((prev) => ({
        ...prev,
        width: windowWidth,
      }));
      setPosition({
        X: newX,
        Y: position.Y,
      });
    }

    if (resizingRef.current === "bottom") {
      let windowHeight = e.clientY - position.Y;
      const MIN_HEIGHT = 300;
      windowHeight = Math.min(
        desktopRef.current.clientHeight - position.Y - 10,
        Math.max(MIN_HEIGHT, windowHeight),
      );

      setSize((prev) => ({
        ...prev,
        height: windowHeight,
      }));
    }
    if (resizingRef.current === "top") {
      let newY = e.clientY;
      let bottomEdge = position.Y + size.height;
      let windowHeight = bottomEdge - newY;
      const MIN_HEIGHT = 300;
      const MIN_Y = 70;
      const MAX_Y = bottomEdge - MIN_HEIGHT;

      // Clamp the top edge
      newY = Math.max(MIN_Y, Math.min(MAX_Y, newY));

      // Now calculate the height from the clamped Y
      windowHeight = bottomEdge - newY;
      setPosition((prev) => ({
        ...prev,
        Y: newY,
      }));
      setSize((prev) => ({
        ...prev,
        height: windowHeight,
      }));
    }
  };
  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
       onPointerDown={() => onFocus()}
      className="bg-sky-100/10
                    backdrop-blur-2xl
                    backdrop-saturate-150
                    border border-white/20
                    ring-1 ring-white/10
                    rounded-3xl
                    shadow-2xl shadow-sky-900/10
                    overflow-hidden
                    absolute
                    flex flex-col 
                    "
      style={{
        left: position.X,
        top: position.Y,
        width: size.width,
        height: size.height,
      }}
      ref={windowRef}
    >
      <div
        className="flex items-center justify-between
                    h-11
                    px-4
                    bg-white/10
                    border-b border-white/20
                    select-none 
                    font-medium
                    text-xl
                  text-white/90"
        onPointerDown={(e) => {
          if (resizingRef.current) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          let windowX = position.X;
          let windowY = position.Y;
          let mouseX = e.clientX;
          let mouseY = e.clientY;
          offset.current = { X: mouseX - windowX, Y: mouseY - windowY };
          draggingRef.current = true;
        }}
      >
        <div className="font-semibold">{title}</div>
        <button
          className="w-9 h-9
                    flex items-center justify-center
                    rounded-lg
                  text-white/70
                    transition-colors
                  hover:bg-red-500
                  hover:text-white"
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={() => onClose()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-8 flex-1 child select-none">{children}</div>
      <div
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          e.stopPropagation();
          e.preventDefault();
          resizingRef.current = "right";
        }}
        className="
    absolute
    top-0
    right-0
    w-2
    h-full
    bg-transparent
    cursor-e-resize"
      />
      <div
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          e.stopPropagation();
          e.preventDefault();
          resizingRef.current = "left";
        }}
        className="
    absolute
    top-0
    left-0
    w-2
    h-full
    bg-transparent
    cursor-w-resize"
      />
      <div
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          e.stopPropagation();
          e.preventDefault();
          resizingRef.current = "top";
        }}
        className="
    absolute
    top-0
    right-0
    w-full
    h-2
    bg-transparent
    cursor-n-resize"
      />
      <div
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          e.stopPropagation();
          e.preventDefault();
          resizingRef.current = "bottom";
        }}
        className="
    absolute
    bottom-0
    right-0
    w-full
    h-2
    bg-transparent
    cursor-s-resize"
      />
    </div>
  );
}

export default WindowGUI;
