![NPM Version](https://img.shields.io/npm/v/react-fill-calendar)
![NPM Downloads](https://img.shields.io/npm/dw/react-fill-calendar)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-fill-calendar)

# React Filled Calendar

A lightweight, customizable React calendar component that automatically fills and highlights dates passed in as props. Designed for simplicity, reusability, and easy styling with Tailwind and DaisyUI.

---

## 🚀 Features

- Pass in an array of dates to automatically fill or highlight them  
- Fully responsive layout  
- Built with React  
- Easily styled with TailwindCSS + DaisyUI  
- Ideal for dashboards, planners, journals, and scheduling tools  

---

## 📦 Installation

`npm install react-fill-calendar`

### Example

<div style="display: flex; gap: 20px; justify-content: center;">
    <div style="display: flex; justify-content: space-around"> <img src="https://github.com/apmanager001/react-fill-calendar/blob/main/assets/calendar.png?raw=true" width="300" alt='image of component'/>
    </div>
    <div style="display: flex; justify-content: space-around"> <img src="https://github.com/apmanager001/react-fill-calendar/blob/main/assets/calendar2.png?raw=true" width="300" alt='image of component'/>
    </div>
</div>

``` 
    import Calendar from 'react-fill-calendar'

    const Calendar = () => {
    return (
        <div>
            <Calendar 
                fillingColor = "#50C878",
                borderfillColor = "#27592D",
                hoverborderColor = "#FFCCCB",
                cellBorderColor = "#808080",
                cellColor = "#ADADAD",
                legend = true,
                mainBorder = true,
                borderColor = "#708090",
                textColor = "#708090",
                selectedDates = [
                    {
                        day: '2026-1-13',
                    },
                    {
                        day: '2026-1-15',
                    },
                ],
                title = "Calendar"
            />
        </div>
    )
    }

    export default Calendar
```






## Props

| Prop              | Type       | Required | Default     | Options               | Description |
|-------------------|------------|----------|-------------|------------------------|-------------|
| `fillingColor`     | `string`   | No       | `"#50C878"` | —                      | Background color used to fill selected or marked dates. |
| `borderfillColor`  | `string`   | No       | `"#27592D"` | —                      | Border color applied to filled date cells. |
| `title`            | `string`   | No       | `"Calendar"` | —                      | Title displayed above the calendar. |
| `hoverborderColor` | `string`   | No       | `"#FFCCCB"` | —                      | Border color applied when hovering over a date cell. |
| `cellColor`        | `string`   | No       | `"#ADADAD"` | —                      | Background color for unfilled date cells. |
| `cellBorderColor`  | `string`   | No       | `"#808080"` | —                      | Border color for unfilled date cells. |
| `mainBorder`       | `boolean`  | No       | `true`      | —                      | Removes border and shadow for the calendar. |
| `borderColor`      | `string`   | No       | `"#708090"` | —                      | Changes color of the calendar border. |
| `cellShape`        | `string`   | No       | `"square"`  | `"square"`, `"circle"` | Shape of each calendar cell. |
| `legend`           | `boolean`  | No       | `true`      | —                      | Toggles the display of the legend explaining filled vs. unfilled dates. |