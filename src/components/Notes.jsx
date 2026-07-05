import React from "react";
import { useState, useEffect } from "react";
import WindowGUI from "./WindowGUI";

function Notes() {
  const [note, setNote] = useState("");
  const save = () => {
    localStorage.setItem("note", note);
  };
  useEffect(() => {
    const savedNote = localStorage.getItem("note");

    if (savedNote !== null) {
      setNote(savedNote);
    }
  }, []);
  return (
    <div className="flex flex-col h-full">
      <textarea
        value={note}
        className="flex-1 border bg-transparent
    text-white/90
    placeholder:text-white/40
    caret-sky-300
    outline-none"
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button
        className="px-8 py-2 rounded-full bg-linear-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
        onClick={save}
      >
        Save
      </button>
    </div>
  );
}

export default Notes;
