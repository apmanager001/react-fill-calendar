import * as React from "react";

export type CalendarSelectedDate = string | { day: string };

export interface CalendarProps {
  fillingColor?: string;
  borderfillColor?: string;
  hoverborderColor?: string;
  cellBorderColor?: string;
  cellColor?: string;
  legend?: boolean;
  mainBorder?: boolean;
  borderColor?: string;
  textColor?: string;
  selectedDates?: CalendarSelectedDate[];
  title?: string;
  cellShape?: string;
}

/**
 * Default export: FillCalendar component, which simply forwards props
 * to the underlying Calendar component.
 */
declare const FillCalendar: React.FC<CalendarProps>;

/**
 * Named export of the core Calendar component.
 */
export declare const Calendar: React.FC<CalendarProps>;

export default FillCalendar;
