import React, { useMemo } from "react";
import DayCell from "./dayCell";

// API:
// - selectedDates: array of strings in 'YYYY-MM-DD' format that should be filled
//   e.g. ['2026-02-01', '2026-02-10']
// Renders a strip of empty squares for 3 months:
// previous month, current month, next month.
const Calendar = ({
  fillingColor = "#50C878",
  borderfillColor = "#27592D",
  hoverborderColor = "#FFCCCB",
  cellBorderColor = "#808080",
  cellColor = "#ADADAD",
  legend = true,
  mainBorder = true,
  borderColor = "#708090",
  textColor = "#708090",
  selectedDates = [],
  title = "Calendar",
  cellShape = "square",
  column = 15,
  legendColumn = false,
}) => {
  const today = new Date();

  // Normalize selectedDates into structures we can use for fast lookups.
  // Supports either plain strings 'YYYY-MM-DD' or objects
  // like { day: 'YYYY-MM-DD', href: '/journal/123' }.
  const { selectedSet, hrefMap } = useMemo(() => {
    const normalize = (v) => {
      if (!v) return "";
      if (typeof v === "string") {
        const parts = v.split("-");
        if (parts.length === 3) {
          const y = parts[0];
          const m = String(Number(parts[1])).padStart(2, "0");
          const d = String(Number(parts[2])).padStart(2, "0");
          return `${y}-${m}-${d}`;
        }
        return v;
      }
      if (typeof v === "object" && v.day) return normalize(v.day);
      return "";
    };

    const set = new Set();
    const map = new Map();

    for (const entry of selectedDates || []) {
      const normalized =
        entry && typeof entry === "object" && entry.day
          ? normalize(entry.day)
          : normalize(entry);

      if (!normalized) continue;

      set.add(normalized);

      if (entry && typeof entry === "object" && entry.href) {
        map.set(normalized, entry.href);
      }
    }

    return { selectedSet: set, hrefMap: map };
  }, [selectedDates]);

  const days = useMemo(() => {
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-11

    // From first day of previous month
    const startDate = new Date(year, month - 1, 1);
    // To last day of next month (0th day of month+2)
    const endDate = new Date(year, month + 2, 0);

    const result = [];
    const cursor = new Date(startDate);

    while (cursor <= endDate) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(
        cursor.getDate(),
      ).padStart(2, "0")}`;
      const isSelected = selectedSet.has(key);
      const href = hrefMap.get(key);

      result.push({
        key,
        isSelected,
        href,
        // keep a Date copy in case you want to use it later
        dateObj: new Date(cursor),
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    return result;
  }, [selectedDates, today]);

  // Split days into rows of up to 15 cells each
  const rows = [];
  const chunkSize = column;
  for (let i = 0; i < days.length; i += chunkSize) {
    rows.push(days.slice(i, i + chunkSize));
  }
  const rounded = cellShape === "square" ? "rounded-md" : "rounded-full";
  return (
    <div
      className={`inline-flex flex-col gap-2 p-3 rounded-xl ${mainBorder ? `border shadow-sm` : ""} `}
      style={{
        borderColor: mainBorder ? borderColor : undefined,
      }}
    >
      {legend && (
        <div
          className={`flex ${legendColumn ? "flex-col items-start" : "justify-between"}  text-sm`}
          style={{ color: textColor }}
        >
          <strong>{title}</strong>
          <div className="flex items-center gap-2 font-semibold">
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
                className={`relative flex items-center justify-center w-4 h-4 rounded-md p-[2px]`}
              >
                <button
                  type="button"
                  className={`flex items-center justify-center w-full h-full rounded-md border-2 border-transparent transition-colors duration-150`}
                  style={{
                    "--border-fill-color": borderfillColor,
                    backgroundColor: cellColor,
                  }}
                ></button>
              </div>
            </div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <button
              type="button"
              className={`flex items-center justify-center w-4 h-4 ${rounded} border-2 border-emerald-600 transition-colors duration-150`}
              style={{
                backgroundColor: fillingColor,
                borderColor: borderfillColor,
              }}
            ></button>
            <span>Completed</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((day) => {
              const formatted = day.dateObj.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  className="tooltip tooltip-top"
                  key={day.key}
                  data-tip={formatted}
                >
                  <DayCell
                    fillingColor={fillingColor}
                    borderfillColor={borderfillColor}
                    hoverborderColor={hoverborderColor}
                    cellBorderColor={cellBorderColor}
                    cellColor={cellColor}
                    isSelected={day.isSelected}
                    day={formatted}
                    href={day.href}
                    cellShape={cellShape}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
