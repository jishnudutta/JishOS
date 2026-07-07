import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Spinner } from "./ui/spinner";
import PackageManager from "../lib/packageManager";

function PythonIDE({ pyodide, onNewPlot }) {
  const terminalRef = useRef(null);
  const [code, setCode] = useState(
    localStorage.getItem("code") || "# Write Python code here...",
  );
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");
  const cmdRef = useRef(null);

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  const runCode = async () => {
    localStorage.setItem("code", code);
    if (!pyodide) return;

    const decoder = new TextDecoder();

    let stdout = "";

    pyodide.setStdout({
      write: (buffer) => {
        stdout += decoder.decode(buffer, { stream: true });
        return buffer.length;
      },
    });
    try {
      const result = await pyodide.runPythonAsync(code);
      const figCount = await pyodide.runPythonAsync(`
try:
    import matplotlib.pyplot as plt
    count = len(plt.get_fignums())

except Exception:
    count = 0

count
      `);

      if (figCount >= 1) {
        await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt

for num in plt.get_fignums():
    fig = plt.figure(num)
    fig.set_size_inches(6, 4, forward=True)
    `);
        const toolbars = document.querySelectorAll(".mpl-toolbar");
        const figures = [...toolbars].map((toolbar) => toolbar.parentElement);
        console.log(figures);
        console.log(figures.length);
        console.log(figures[0]);
        onNewPlot(figures);
      }
      setHistory((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "python",
          text: "Python:\n" + (stdout || String(result)),
        },
      ]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "python_err",
          text: "Python_err: " + err.toString(),
        },
      ]);
    }
  };
  const terminal = history.map((statement) => {
    if (statement.type === "python") {
      return (
        <div className="text-green-400 font-mono" key={statement.id}>
          {">>>" + statement.text}
        </div>
      );
    }
    if (statement.type === "python_err") {
      return (
        <div className="text-red-400 font-mono" key={statement.id}>
          {">>>" + statement.text}
        </div>
      );
    }
    if (statement.type === "user_cmd") {
      return (
        <div className="text-yellow-300 font-mono" key={statement.id}>
          {">>>" + statement.text}
        </div>
      );
    }
    if (statement.type === "cmd_out") {
      return (
        <div className="text-blue-400 font-mono" key={statement.id}>
          {">>>" + statement.text}
        </div>
      );
    }
  });
  return (
    <div className="grid grid-cols-2 h-full min-h-0">
      <div
        className="
        h-full
        overflow-hidden
        rounded-2xl
        border border-white/10
        shadow-xl
        "
      >
        <Editor
          onChange={(value) => {
            setCode(value || "");
          }}
          height="100%"
          defaultLanguage="python"
          value={code}
          theme="vs-dark"
          options={{
            fontSize: 18,
            minimap: { enabled: false },
          }}
        />
      </div>
      <div className="bg-black rounded-xl flex flex-col min-h-0">
        <div className="flex flex-row">
          <div className="px-3">
            <h2 className="text-2xl text-white p-1">Terminal</h2>
          </div>
          <div className="px-3">
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={runCode}
              disabled={!pyodide}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-lg font-medium text-white backdrop-blur-3xl">
                {pyodide ? (
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
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                ) : (
                  <div className="flex">
                    <Spinner className="size-8" />
                    <div>Loading Python...</div>
                  </div>
                )}
              </span>
            </button>
          </div>
        </div>
        <div
          className="
    bg-black
    p-4
    rounded-lg
    whitespace-pre-wrap
    overflow-y-scroll
    flex-1
    border
    border-slate-50/20
  "
          ref={terminalRef}
        >
          {terminal}
        </div>
        <input
          ref={cmdRef}
          type="text"
          onChange={(e) => setCommand(e.target.value)}
          value={command}
          placeholder="Enter 'help' to see available commands"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              setHistory((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  type: "user_cmd",
                  text: "user: " + command,
                },
              ]);
              switch (command) {
                case "clear":
                  setHistory([]);
                  setCommand("");
                  break;

                case "help":
                  setHistory((prev) => [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      type: "cmd_out",
                      text:
                        "JishOS: " +
                        "Available commands:\nhelp\nclear\npip install <packageName>",
                    },
                  ]);
                  setCommand("");
                  break;

                default:
                  if (command.startsWith("pip install ")) {
                    const words = command.split(" ");
                    const pkg = words[2];
                    setCommand("");
                    const msg = await PackageManager.installPackage(
                      pkg,
                      pyodide,
                    );
                    console.log(pyodide.loadedPackages);
                    setHistory((prev) => [
                      ...prev,
                      {
                        id: crypto.randomUUID(),
                        type: "cmd_out",
                        text: "JishOS: " + msg,
                      },
                    ]);
                    break;
                  } else {
                    break;
                  }
              }
            }
          }}
          className="
    w-full
    bg-black
    border-t
    border-slate-50/20
    px-4
    py-2
    outline-none
    text-yellow-300
    placeholder:text-slate-500
    font-mono
  "
        />
      </div>
    </div>
  );
}

export default PythonIDE;
