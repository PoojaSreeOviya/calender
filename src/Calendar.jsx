import { useState } from "react";
import "./Calendar.css";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [message, setMessage] = useState(""); // notification message
  const year = date.getFullYear();
  const month = date.getMonth();
  const numDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  const prevMonth = () => setDate(new Date(year, month - 1));
  const nextMonth = () => setDate(new Date(year, month + 1));

  const handleClick = (dayNum) => {
    const clickedDate = new Date(year, month, dayNum).toDateString();
    if (bookedDates.includes(clickedDate)) {
      setMessage(`⚠️ ${dayNum}/${month + 1}/${year} is already booked.`);
    } else {
      setBookedDates((prev) => [...prev, clickedDate]);
      setMessage(`✅ ${dayNum}/${month + 1}/${year} booked successfully!`);
    }
    // Clear message after 3s
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="calendar-container">
      {/* Notification */}
      {message && <div className="notification">{message}</div>}

      <div className="calendar-header">
        <button onClick={prevMonth}>❮</button>
        <h2>{date.toLocaleString("default", { month: "long" })} {year}</h2>
        <button onClick={nextMonth}>❯</button>
      </div>

      <div className="calendar-days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-label">{day}</div>
        ))}
      </div>

      <div className="calendar-dates-grid">
        {Array(firstDayIndex).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-date empty"></div>
        ))}
        {Array(numDays).fill(null).map((_, i) => {
          const dayNum = i + 1;
          const currentDate = new Date(year, month, dayNum);
          const isToday = currentDate.toDateString() === today.toDateString();
          const isBooked = bookedDates.includes(currentDate.toDateString());

          return (
            <div
              key={i}
              className={`calendar-date ${isToday ? "today" : ""} ${
                isBooked ? "booked" : ""
              }`}
              onClick={() => handleClick(dayNum)}
            >
              {dayNum}
            </div>
          );
        })}
      </div>
    </div>
  );
}
