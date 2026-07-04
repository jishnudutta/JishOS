import React from "react";

export default function BootWindow({ currentScreen, changeScreen }) {
  function Boot() {
    changeScreen("desktop");
  }
  return (
    <div
      className="bg-white/20 flex w-md rounded-xl justify-center items-center
   p-8"
    >
      <h1 className="text-4xl">
        JishOS
        <br />A modern web operating system
      </h1>
      <button className="relative block group" onClick={Boot}>
        <span className="absolute inset-0  bg-indigo-500  rounded-lg"></span>
        <div className="transition bg-black relative border-2 rounded-lg -translate-x-2 -translate-y-2">
          <div className="p-2 ">
            <p className="text-xl text-white font-outerSans font-medium">
              Boot
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
