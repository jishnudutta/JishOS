import React, { useState, useRef } from "react";
import TopBar from "./TopBar";
import Notes from "./Notes";
import DesktopIcon from "./DesktopIcon";
import notesIcon from "../assets/Notes-icon.png";
import WindowGUI from "./WindowGUI";
import browserIcon from "../assets/Browser-icon.png";
import Browser from "./Browser";

function Desktop() {
  const desktopRef = useRef(null)
  const [openWindows, setOpenWindows] = useState([]);
  const closeWindowByName = (nameToRemove) => {
    setOpenWindows((prevWindows) => {
      return prevWindows.filter((app) => app !== nameToRemove);
    });
  };
  const windows = openWindows.map((app) => {
    if (app === "notes") {
      return (
        <WindowGUI
          key={app}
          title="Notes"
          onClose={() => closeWindowByName("notes")}
          desktopRef={desktopRef}
        >
          <Notes />
        </WindowGUI>
      );
    }
    if (app === "browser") {
      return (
        <WindowGUI
          key={app}
          title="Browser"
          onClose={() => closeWindowByName("browser")}
          desktopRef={desktopRef}
        >
          <Browser />
        </WindowGUI>
      );
    }
  });
  return (
    <div
      className='h-screen w-screen bg-[url("./assets/Desktop-bg.png")]
     bg-cover bg-center bg-no-repeat relative' ref={desktopRef}
    >
      <TopBar />
      <div className="absolute top-24 left-6 grid grid-cols-1 gap-4">
        <DesktopIcon
          icon={notesIcon}
          name="Notes"
          onClick={() => {
            if (!openWindows.includes("notes")) {
              setOpenWindows([...openWindows, "notes"]);
            }
          }}
        />
        <DesktopIcon
          icon={browserIcon}
          name="Browser"
          onClick={() => {
            if (!openWindows.includes("browser")) {
              setOpenWindows([...openWindows, "browser"]);
            }
          }}
        />
        <DesktopIcon
          icon={notesIcon}
          name="Notes"
          onClick={() => {
            if (!openWindows.includes("notes")) {
              setOpenWindows([...openWindows, "notes"]);
            }
          }}
        />
      </div>
      {windows}
    </div>
  );
}

export default Desktop;
