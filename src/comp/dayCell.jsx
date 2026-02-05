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
  cellShape,
  href,
}) => {
  const todayLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const rounded = cellShape === "square" ? "rounded-md" : "rounded-full";
  const isToday = day === todayLabel;
  const baseButtonClasses = `
    flex items-center justify-center
    ${rounded} border-2 transition-colors duration-150 hover:scale-150
    ${!isToday && !isSelected && hoverborderColor ? "hover-border-var" : ""}
  `;
  const shouldLink = Boolean(href && isSelected);

  const renderButton = (extraClasses = "", style) => (
    <button
      type="button"
      className={`${baseButtonClasses} ${extraClasses} ${shouldLink ? "cursor-pointer" : ""}`}
      style={style}
    ></button>
  );

  const wrapIfLink = (content) =>
    shouldLink ? (
      <a href={href} className="contents">
        {content}
      </a>
    ) : (
      content
    );

  if (isToday) {
    // Wrap today's cell in a spinning conic-gradient border to mimic RainbowRing
    const inner = (
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
        <div
          className={`relative flex items-center justify-center w-4 h-4 ${rounded} p-[2px]`}
        >
          {renderButton(
            "today-cell-btn w-full h-full rounded-md border-transparent",
            {
              "--border-fill-color": isSelected
                ? borderfillColor
                : cellBorderColor,
              backgroundColor: isSelected ? fillingColor : cellColor,
            },
          )}
        </div>
      </div>
    );

    return wrapIfLink(inner);
  }

  const style =
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
        : undefined;

  return wrapIfLink(renderButton("w-4 h-4", style));
};

export default DayCell;
