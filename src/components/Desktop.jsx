import React, { useState, useRef } from "react";
import TopBar from "./TopBar";
import Notes from "./Notes";
import DesktopIcon from "./DesktopIcon";
import notesIcon from "../assets/Notes-icon.png";
import WindowGUI from "./WindowGUI";
import browserIcon from "../assets/Browser-icon.png";
import Browser from "./Browser";

function Desktop() {
  const [nextOffset, setNextOffset] = useState({
    x: 0,
    y: 0,
  });
  const desktopRef = useRef(null);
  const [openWindows, setOpenWindows] = useState([]);
  const closeWindowByName = (nameToRemove) => {
    setOpenWindows((prevWindows) => {
      return prevWindows.filter((app) => app.type !== nameToRemove);
    });
  };
  const focusWindow = (type) => {
    let others = openWindows.filter((w) => w.type !== type);
    const w = openWindows.find((Window) => Window.type === type);
    setOpenWindows([...others, w ]);
  };
  const windows = openWindows.map((app) => {
    if (app.type === "notes") {
      return (
        <WindowGUI
          onFocus={() => focusWindow("notes")}
          key={app.id}
          title="Notes"
          onClose={() => closeWindowByName("notes")}
          desktopRef={desktopRef}
          x={app.x}
          y={app.y}
        >
          <Notes />
        </WindowGUI>
      );
    }
    if (app.type === "browser") {
      return (
        <WindowGUI
          onFocus={() => focusWindow("browser")}
          key={app.id}
          title="Browser"
          onClose={() => closeWindowByName("browser")}
          desktopRef={desktopRef}
          x={app.x}
          y={app.y}
        >
          <Browser />
        </WindowGUI>
      );
    }
  });
  return (
    <div
      className='h-screen w-screen bg-[url("./assets/Desktop-bg.png")]
     bg-cover bg-center bg-no-repeat relative'
      ref={desktopRef}
    >
      <TopBar />
      <div className="absolute top-24 left-6 grid grid-cols-1 gap-4">
        <DesktopIcon
          icon={notesIcon}
          name="Notes"
          onClick={() => {
            if (!openWindows.map((Window) => Window.type).includes("notes")) {
              setOpenWindows([
                ...openWindows,
                {
                  id: crypto.randomUUID(),
                  type: "notes",
                  x: 100 + nextOffset.x,
                  y: 80 + nextOffset.y,
                },
              ]);
              setNextOffset((prev) => ({
                x: prev.x + 30,
                y: prev.y + 30,
              }));
            }
          }}
        />
        <DesktopIcon
          icon={browserIcon}
          name="Browser"
          onClick={() => {
            if (!openWindows.map((Window) => Window.type).includes("browser")) {
              setOpenWindows([
                ...openWindows,
                {
                  id: crypto.randomUUID(),
                  type: "browser",
                  x: 100 + nextOffset.x,
                  y: 80 + nextOffset.y,
                },
              ]);
              setNextOffset((prev) => ({
                x: prev.x + 30,
                y: prev.y + 30,
              }));
            }
          }}
        />
      </div>
      {windows}
    </div>
  );
}

export default Desktop;
