import { format, addMonths, subMonths } from "date-fns";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getMonthCalendar = (date: Date) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const daysInMonth = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      daysInMonth.push(new Date(day));
    }

    return daysInMonth;
  };

  const getDayClass = (day: Date) => {
    const isToday = 
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear();

    const isSelected = selectedDate && 
      day.getDate() === selectedDate.getDate() &&
      day.getMonth() === selectedDate.getMonth() &&
      day.getFullYear() === selectedDate.getFullYear();

    return `
      cursor-pointer hover:bg-zinc-700 transition-colors p-1 text-xs rounded-full
      ${isToday ? 'bg-zinc-100 text-zinc-900' : ''}
      ${isSelected ? 'bg-red-500 text-white hover:bg-red-600' : ''}
    `;
  };

  return (
    <div className="w-full bg-zinc-900 rounded-xl p-4">
      <div className="flex items-center mb-4 space-x-4">
        <span className="text-xl font-bold text-white flex-1">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-1 hover:bg-zinc-700 rounded-full"
          >
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-1 hover:bg-zinc-700 rounded-full"
          >
            <ChevronRightIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs text-white font-bold mb-2">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-zinc-400">
        {getMonthCalendar(currentMonth).map((day, index) => (
          <div
            key={index}
            onClick={() => onDateSelect(day)}
            className="flex justify-center"
          >
            <div className={getDayClass(day)}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;