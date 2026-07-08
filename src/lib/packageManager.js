function getInstalled() {
  return new Set(JSON.parse(localStorage.getItem("packages") ?? "[]"));
}

async function loadInstalled(pyodide) {
  const installed = getInstalled();

  try {
    for (const pkg of installed) {
      await pyodide.loadPackage(pkg);
    }
    return "Installed packages are loaded";
  } catch (err) {
    return err.message;
  }
}

async function installPackage(name, pyodide) {
  const installed = getInstalled();

  if (!installed.has(name)) {
    try {
      await pyodide.loadPackage(name);

      installed.add(name);
      localStorage.setItem("packages", JSON.stringify([...installed]));

      return "Package installed";
    } catch (err) {
      return err.message;
    }
  }

  return "Package was already installed";
}

export default { loadInstalled, installPackage };
