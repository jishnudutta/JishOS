import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";

function TopBar() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <nav
      className="flex flex-row fixed top-4 left-1/2 -translate-x-1/2
    w-[95%] max-w-7xl h-14 items-center justify-between
    px-5
    rounded-2xl
    bg-white/15
    backdrop-blur-xl
    border border-white/20
    shadow-xl shadow-black/10 ring-1 ring-white/10 backdrop-saturate-150"
    >
      <div className="flex items-center justify-between w-full select-none">
        <img src={logo} alt="JishOS" className="h-8 w-auto rounded-4xl" />
        <h2 className="px-20">{time}</h2>
      </div>
    </nav>
  );
}

export default TopBar;
