import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 月檢視
import timeGridPlugin from "@fullcalendar/timegrid"; // 週、日檢視
import listPlugin from "@fullcalendar/list"; // 清單檢視
import interactionPlugin from "@fullcalendar/interaction"; // 支持點擊事件
import zhTwLocale from '@fullcalendar/core/locales/zh-tw';
import axios from "axios";
import {formatDate} from "~/routes/home";
import type {DateSelectArg} from "@fullcalendar/core";
import Select from 'react-select'

const Calendar = () => {
    const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
    const [events, setEvents] = useState<any[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarView, setCalendarView] = useState("dayGridMonth");
    const [showModal, setShowModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState<{ start: Date; end: Date } | null>(null);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [tags, setTags] = useState<{value: number, label: string}[]>([])
    const [desc, setDesc] = useState("");
    const calendarRef = useRef<FullCalendar | null>(null);

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

    useEffect(() => {
        fetch(`${API_DOMAIN}/booking/tags`)
            .then(res => res.json())
            .then(data => {
                const tagsArray = Object.entries(data).map(([key, value]) => ({
                    value: Number(key),
                    label: String(value),
                }));
                setTags(tagsArray);
            });
    }, []);

    // 預約當天的某個時間點
    const handleDateClick = (arg: { dateStr: string; }) => {
        setCalendarView("timeGridDay");

        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView("timeGridDay", arg.dateStr); // 切換到日檢視，並跳轉到當天
        }
    };

    // 格式化成 HH:mm
    const formatTime = (date: Date) => {
        const h = date.getHours().toString().padStart(2, '0');
        const m = date.getMinutes().toString().padStart(2, '0');
        return `${h}:${m}`;
    };

    const handleTimeSelect = (selectInfo: DateSelectArg) => {
        setSelectedTime({start: selectInfo.start, end: selectInfo.end});
        setShowModal(true);
    };

    const handleConfirm = async () => {
        if (!selectedTime || selectedServices.length == 0) return;

        const {start, end} = selectedTime;
        try {
            const response = await axios.post(`${API_DOMAIN}/booking/add`, {
                desc: desc,
                start_at: formatDate(start),
                end_at: formatDate(end),
                tags: selectedServices
            });
            console.log(response.data);

            const newEvent = {
                title: selectedServices.map(id =>
                    tags.find(tag => tag.value === id)?.label).join(', '),
                start,
                end,
                backgroundColor: "#A0C4FF"
            };

            setEvents([...events, newEvent]);
        } catch (err) {
            console.error("API 錯誤", err);
        }

        setDesc("");
        setShowModal(false);
        setSelectedTime(null);
        setSelectedServices([]);
    }

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
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView={calendarView}
                selectable={calendarView === "timeGridDay"}
                locale={zhTwLocale}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                }}
                events={events}
                datesSet={(arg) => {
                    const newDate = new Date(arg.view.currentStart);
                    const newView = arg.view.type;

                    if (newDate.getFullYear() !== currentDate.getFullYear() ||
                        newDate.getMonth() !== currentDate.getMonth()) {
                        setCurrentDate(newDate);
                    }

                    if (newView !== calendarView) {
                        setCalendarView(newView);
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
                select={handleTimeSelect}  // 啟用可選取時間功能
                selectMirror={true}  // 顯示滑動選取時的影子效果
                unselectAuto={true}  // 點其他區域會自動取消選取
            />

            {showModal && selectedTime && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-80">
                        <h2 className="text-lg font-bold mb-4">預約確認</h2>
                        <p>時間：{formatTime(selectedTime.start)} ~ {formatTime(selectedTime.end)}</p>

                        <label className="block mt-4 mb-2 font-medium">選擇項目：</label>
                        <Select
                            isMulti
                            options={tags}
                            onChange={(e) => {
                                const selectedValues = (e || []).map(option => option.value);
                                setSelectedServices(selectedValues);
                            }}
                        />

                        <div className="mb-4">
                            <label className="block mt-4 mb-2 font-medium">說明：</label>
                            <input
                                type="text"
                                placeholder="請輸入說明"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end mt-6 gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded">
                                取消
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-blue-500 text-white rounded">
                                確認
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Calendar;
