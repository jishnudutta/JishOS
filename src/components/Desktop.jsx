import React, { useState, useRef } from "react";
import TopBar from "./TopBar";
import Notes from "./Notes";
import DesktopIcon from "./DesktopIcon";
import notesIcon from "../assets/Notes-icon.png";
import WindowGUI from "./WindowGUI";
import browserIcon from "../assets/Browser-icon.png";
import Browser from "./Browser";
import ClockWidget from "./Clock";
import BasicDateCalendar from "./Calendar";
import wallpaper from "../assets/azure-horizon.3840x2160.mp4";

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
    setOpenWindows([...others, w]);
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
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative bg-transparent"
      ref={desktopRef}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={wallpaper} type="video/mp4" />
      </video>
      <TopBar />
      <div
        className="
    absolute
    top-20
    right-6
    z-10
    p-3
  "
      >
        <ClockWidget />
      </div>
      <div
        className="
    absolute
    top-60
    right-6
    z-10
    p-4
    rounded-3xl

    bg-slate-900/25
    backdrop-blur-2xl
    border border-white/10

    shadow-2xl
    shadow-black/20

    overflow-hidden
  "
      >
        <BasicDateCalendar
          sx={{
            bgcolor: "transparent",

            /* Month & Year */
            "& .MuiPickersCalendarHeader-label": {
              color: "#fff",
              fontWeight: 600,
            },

            /* Previous / Next buttons */
            "& .MuiPickersArrowSwitcher-button": {
              color: "#fff",
            },

            "& .MuiSvgIcon-root": {
              color: "#fff",
            },

            /* Weekday labels (S M T W...) */
            "& .MuiDayCalendar-weekDayLabel": {
              color: "rgba(255,255,255,0.7)",
              fontWeight: 500,
            },

            /* All day buttons */
            "& .MuiPickerDay-root": {
              color: "#fff !important",
              borderRadius: "10px",
            },

            /* Hover */
            "& .MuiPickerDay-root:hover": {
              backgroundColor: "rgba(255,255,255,0.12)",
            },

            /* Today */
            "& .MuiPickerDay-root.MuiPickerDay-today": {
              border: "1px solid rgba(255,255,255,0.45)",
            },

            /* Selected day */
            "& .MuiPickerDay-root.Mui-selected": {
              backgroundColor: "#7DD3FC !important",
              color: "#0F172A !important",
            },

            "& .MuiPickerDay-root.Mui-selected:hover": {
              backgroundColor: "#38BDF8 !important",
            },

            /* Disabled days */
            "& .Mui-disabled": {
              color: "rgba(255,255,255,0.25) !important",
            },

            /* Any typography inside */
            "& .MuiTypography-root": {
              color: "#fff",
            },
          }}
        />
      </div>
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
