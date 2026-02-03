import React from "react";

// Props:
// - day: string (full date label, e.g. "February 1, 2026")
// - isSelected: boolean (controls the fill/heat color)
// - fillingColor: string (CSS color for selected days)
// - borderfillColor: string (CSS color for selected border)
// - onClick: () => void (optional click handler)
const DayCell = ({
  fillingColor,
  borderfillColor,
  hoverborderColor,
  cellBorderColor,
  cellColor,
  day,
  isSelected = false,
}) => {
  const todayLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isToday = day === todayLabel;
  const baseButtonClasses = `
    flex items-center justify-center
    rounded-md border-2 transition-colors duration-150 hover:scale-150
    ${!isToday && !isSelected && hoverborderColor ? "hover-border-var" : ""}
  `;
  if (isToday) {
    // Wrap today's cell in a spinning conic-gradient border to mimic RainbowRing
    return (
      <div className="relative flex items-center justify-center w-4 h-4">
        <div
          className="absolute inset-0 rounded-md rainbow-spin"
          style={{
            background:
              "conic-gradient(from 0deg, #ff0000 0deg, #ff4000 20deg, #ff8000 40deg, #ffbf00 60deg, #ffff00 80deg, #bfff00 100deg, #80ff00 120deg, #40ff00 140deg, #00ff00 160deg, #00ff40 180deg, #00ff80 200deg, #00ffbf 220deg, #00ffff 240deg, #00bfff 260deg, #0080ff 280deg, #0040ff 300deg, #0000ff 320deg, #4000ff 340deg, #8000ff 360deg)",
            padding: "2px",
            boxShadow:
              "0 0 8px rgba(255,0,255,0.35), 0 0 14px rgba(0,255,255,0.25)",
            borderRadius: "0.5rem",
          }}
        />
        <div className="relative flex items-center justify-center w-4 h-4 rounded-md p-[2px]">
          <button
            type="button"
            className="today-cell-btn flex items-center justify-center w-full h-full rounded-md border-2 border-transparent transition-colors duration-150 hover:scale-150"
            style={{
              "--border-fill-color": isSelected
                ? borderfillColor
                : cellBorderColor,
              backgroundColor: isSelected ? fillingColor : cellColor,
            }}

            // style={
            //   isSelected
            //     ? {
            //         backgroundColor: fillingColor,
            //         "--border-fill-color": borderfillColor,
            //       }
            //     : { "--border-fill-color": borderfillColor }

            // }
          ></button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`${baseButtonClasses} w-4 h-4`}
      style={
        isSelected && !isToday
          ? {
              backgroundColor: fillingColor,
              borderColor: borderfillColor,
              "--hover-border-color": hoverborderColor,
            }
          : !isToday
          ? {
              backgroundColor: cellColor,
              "--border-color": cellBorderColor,
              "--hover-border-color": hoverborderColor,
            }
          : undefined
      }
    ></button>
  );
};

export default DayCell;
