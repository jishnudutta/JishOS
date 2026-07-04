import React from "react";

function DesktopIcon({ icon, name, onClick }) {
  const iconClasses = "w-14 h-14 object-contain drop-shadow-lg";
  const textClasses =
    "text-white text-sm font-medium text-center drop-shadow-md";
  return (
    <div
      className="flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        w-24
                        p-3
                        rounded-xl
                        cursor-pointer
                        transition-all
                        duration-200
                        select-none
                        hover:bg-white/15
                        hover:backdrop-blur-md
                        hover:scale-105"
      onClick={onClick}
    >
      <div className={iconClasses}>
        <img
          className="w-full h-full object-contain"
          src={icon}
          alt={name}
          draggable={false}
        />
      </div>

      <div className={textClasses}>{name}</div>
    </div>
  );
}

export default DesktopIcon;
