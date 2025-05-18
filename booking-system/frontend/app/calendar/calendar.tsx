import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 月檢視
import timeGridPlugin from "@fullcalendar/timegrid"; // 週、日檢視
import listPlugin from "@fullcalendar/list"; // 清單檢視
import interactionPlugin from "@fullcalendar/interaction"; // 支持點擊事件
import zhTwLocale from '@fullcalendar/core/locales/zh-tw';
import axios from "axios";

const Calendar = () => {
    const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

    const [events, setEvents] = useState();
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, "0");
                const search = `${year}/${month}`

                const response = await axios.get(`${API_DOMAIN}/booking/list?search=${search}`);
                const data = response.data;
                console.log(data)

                // 轉換 API 回傳格式為 FullCalendar 所需格式
                const formattedEvents = data.map((item: { desc: any; start_at: any; end_at: any; }) => ({
                    title: item.desc,
                    start: item.start_at,
                    end: item.end_at,
                    backgroundColor: getColorByDesc(item.desc), // 根據 desc 設定不同顏色
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error("取得預約資料失敗", error);
            }
        }
        fetchEvents()
    }, [API_DOMAIN, currentDate]);

    // 預約當天的某個時間點
    const handleDateClick = (arg: { dateStr: string; }) => {
        console.log(arg);
        alert("點擊日期: " + arg.dateStr);
    };

    // 顯示該時間點的預約詳細資訊
    const handleEventClick = (clickInfo: { event: { title: string; }; }) => {
        alert("點擊事件: " + clickInfo.event.title);
    };

    const getColorByDesc = (desc: any) => {
        // 根據 desc 指定不同顏色，可自由擴充
        switch (desc) {
            case "剪髮":
                return "#FFADAD";
            case "染髮":
                return "#FFD6A5";
            case "燙髮":
                return "#9BF6FF";
            default:
                return "#BDB2FF"; // 預設顏色
        }
    };

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={zhTwLocale}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                }}
                events={events}
                datesSet={(arg) => {
                    const newDate = new Date(arg.view.currentStart);
                    if (newDate.getFullYear() !== currentDate.getFullYear() ||
                        newDate.getMonth() !== currentDate.getMonth()) {
                        setCurrentDate(newDate);
                    }
                }}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventContent={(arg) => {
                    const start = arg.event.start;
                    const end = arg.event.end;

                    if (!start || !end) return {html: ""};

                    const formatTime = (date: Date) => {
                        const h = date.getHours().toString().padStart(2, '0')
                        const m = date.getMinutes().toString().padStart(2, '0')
                        return `${h}:${m}`;
                    };

                    const timeRange = `${formatTime(start)} ~ ${formatTime(end)}`
                    return {
                        html: `
                            <div style="display:flex; align-items:center;">
                            <span style="display:inline-block; width:8px; height:8px; background:${arg.event.backgroundColor || '#BDB2FF'}; border-radius:50%; margin-right:5px;"></span>
                                <div>
                                    <div style="font-size: 12px; font-weight: bold;">${timeRange}</div>
                                    <div>${arg.event.title}</div>
                                </div>
                            </div>`
                    }
                }}
            />
        </div>
    );
};

export default Calendar;
