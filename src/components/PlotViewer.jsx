import React, { useEffect } from "react";

function PlotViewer({ plotRef, fig }) {
  useEffect(() => {
    if (!fig) return;
    plotRef.current.replaceChildren();
    fig.forEach((figure) => {
      figure.querySelectorAll("canvas").forEach((canvas) => {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      });
      plotRef.current.appendChild(figure);
    });
  }, [fig]);
  return <div ref={plotRef} className="w-full h-full overflow-auto"></div>;
}

export default PlotViewer;
