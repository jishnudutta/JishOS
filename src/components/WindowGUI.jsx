import React, { useEffect, useState, useRef } from "react";

function WindowGUI({ title, onClose, children, desktopRef }) {
  const windowRef = useRef(null);

  const [position, setPosition] = useState({
    X: 400,
    Y: 120,
  });
  const offset = useRef({
    X: 0,
    Y: 0,
  });
  const draggingRef = useRef(false);
  const handleMouseMove = (e) => drag(e);
  const handleMouseUp = (e) => {
    draggingRef.current = false;
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      // Cleanup
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      // Cleanup
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
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

  return (
    <div
      className="w-md bg-sky-100/10
                    backdrop-blur-2xl
                    backdrop-saturate-150
                    border border-white/20
                    ring-1 ring-white/10
                    rounded-3xl
                    shadow-2xl shadow-sky-900/10
                    overflow-hidden
                    absolute
                    "
      style={{
        left: position.X,
        top: position.Y,
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
        onMouseDown={(e) => {
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
      <div className="p-8">{children}</div>
    </div>
  );
}

export default WindowGUI;
