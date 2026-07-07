# JishOS

JishOS is a browser-based desktop environment built with React. It combines a modern desktop interface with a fully functional Python development environment powered by Pyodide, allowing Python code to run directly in the browser without a backend server.

The goal of this project is to recreate the experience of a lightweight operating system while keeping everything inside the browser.

---

# Deployed website link
<a href="https://jish-os.vercel.app">JishOS website</a>

## Features

### Desktop Environment

- Draggable and resizable windows
- Window focus management
- Desktop icons
- Live clock widget
- Calendar widget
- Modern glassmorphism-inspired interface

### Applications

#### Python IDE

- Monaco Editor
- Python execution using Pyodide
- Interactive terminal
- Package installation
- Automatic package persistence
- Matplotlib support
- Integrated Plot Viewer

#### Notes

A simple note-taking application for quickly saving text.

#### Browser

A lightweight browser application integrated into the desktop.

#### Plot Viewer

Displays Matplotlib figures generated from Python code with support for zooming, panning and downloading using Matplotlib's WebAgg backend.

#### Welcome

A built-in welcome guide that introduces new users to JishOS and explains the basic features.

---

## Python Features

The Python IDE supports:

- Running Python code entirely in the browser
- Installing supported Pyodide packages

Example:

```bash
pip install numpy
pip install pandas
pip install matplotlib
```

Installed packages are remembered using LocalStorage, so they only need to be installed once.

---

## Built With

- React
- Tailwind CSS
- Monaco Editor
- Pyodide
- Material UI
- Heroicons

---

## Current Status

JishOS is currently under active development.

The current version includes:

- Desktop environment
- Window manager
- Python IDE
- Terminal
- Package manager
- Plot Viewer
- Notes
- Browser
- Welcome application

Several larger features are planned for future releases.

---

## Planned Features

- Virtual filesystem
- Multiple Python files
- File Explorer
- Project management
- Improved Plot Viewer
- Additional desktop applications

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/J1234D/jishos.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Screenshots

<img src="src\assets\boot-screen-screenshot.png" alt="Boot-screen" width="800px"/>
<img src="src\assets\desktop-screen-screenshot.png" alt="Desktop" width="800px"/>
<img src="src\assets\pythonide-screenshot.png" alt="Python IDE" width="600px"/>

---

## Contributing

This project is currently a personal learning project, but suggestions and feedback are always welcome.

---

## License

This project is licensed under the MIT License.

---

Built by **Jishnu Dutta**.