import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 支持點擊事件

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "事件 1", date: "2025-05-10" },
    { title: "事件 2", date: "2025-05-15" },
  ]);

  const handleDateClick = (arg) => {
    alert("點擊日期: " + arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    alert("點擊事件: " + clickInfo.event.title);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
