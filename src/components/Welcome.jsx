import React from "react";
import { useState } from "react";

function Welcome() {
  const [dontShowAgain, setDontShowAgain] = useState(
    localStorage.getItem("showWelcome") === "false",
  );

  const handleChange = (e) => {
    const checked = e.target.checked;
    setDontShowAgain(checked);

    // false means "don't show the welcome window"
    localStorage.setItem("showWelcome", checked ? "false" : "true");
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">👋 Welcome to JishOS</h1>
          <p className="text-slate-400 mt-2 text-lg">
            A browser-based operating system with a built-in Python development
            environment.
          </p>
        </div>

        {/* Quick Start */}
        <section className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">🚀 Quick Start</h2>

          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            <li>
              Open <b>Python IDE</b> from the desktop.
            </li>
            <li>Write your Python code.</li>
            <li>Press the ▶ Run button.</li>
            <li>
              Install packages using:
              <pre className="bg-black rounded-lg p-3 mt-2 overflow-x-auto">
                pip install numpy{"\n"}
                pip install pandas{"\n"}
                pip install matplotlib{"\n"}
                ...
              </pre>
            </li>
            <li>Run plotting code to automatically open Plot Viewer.</li>
          </ol>
        </section>

        {/* Apps */}
        <section className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            🖥 Built-in Applications
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold">🐍 Python IDE</h3>
              <p className="text-sm text-slate-300 mt-2">
                Write and execute Python.
              </p>
            </div>

            <div className="bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold">📝 Notes</h3>
              <p className="text-sm text-slate-300 mt-2">Save quick notes.</p>
            </div>

            <div className="bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold">🌐 Browser</h3>
              <p className="text-sm text-slate-300 mt-2">Browse websites.</p>
            </div>

            <div className="bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold">📊 Plot Viewer</h3>
              <p className="text-sm text-slate-300 mt-2">
                View Matplotlib figures.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">✨ Features</h2>

          <ul className="space-y-2 text-slate-300">
            <li>• Monaco Editor</li>
            <li>• Interactive Terminal</li>
            <li>• Python Package Installation</li>
            <li>• Local Package Persistence</li>
            <li>• Matplotlib Support</li>
            <li>• Window Manager</li>
            <li>• Desktop Widgets</li>
          </ul>
        </section>

        {/* Tips */}
        <section className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">💡 Tips</h2>

          <ul className="space-y-2 text-slate-300">
            <li>
              • Type <code>help</code> in the terminal.
            </li>
            <li>• Code is saved automatically.</li>
            <li>• Installed packages remain available.</li>
            <li>• Drag and resize windows just like a desktop OS.</li>
          </ul>
        </section>

        {/* About */}
        <section className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">ℹ About</h2>

          <p className="text-slate-300">
            <b>Version:</b> JishOS v1
          </p>

          <p className="text-slate-300 mt-2">
            Built using React, Tailwind CSS, Monaco Editor and Pyodide.
          </p>

          <p className="text-slate-500 mt-6 text-sm">
            Created by <b>Jishnu Dutta</b>.
          </p>
        </section>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-slate-700 pt-6">
        <label className="flex items-center gap-3 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={handleChange}
            className="size-4 accent-sky-500"
          />
          Don't show this again
        </label>
      </div>
    </div>
  );
}

export default Welcome;
