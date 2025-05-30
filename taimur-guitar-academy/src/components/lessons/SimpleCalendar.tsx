import { useState, useEffect } from 'react';
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, format, addDays as addDaysFn, isBefore, isAfter, isSameMonth as isSameMonthFn } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface SimpleCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  darkMode?: boolean;
  initialMonth?: Date;
}

export default function SimpleCalendar({ onDateSelect, selectedDate, darkMode, initialMonth }: SimpleCalendarProps) {
  const timeZone = 'America/New_York';
  const now = new Date();
  const today = toZonedTime(now, timeZone);
  const minDate = addDaysFn(today, 2); // 2 days ahead
  const maxDate = addMonths(today, 1); // 1 month ahead
  const maxNavMonth = addMonths(startOfMonth(today), 2); // 2 months ahead

  // Initialize currentMonth to initialMonth if provided, else current month
  const [currentMonth, setCurrentMonth] = useState(initialMonth ? startOfMonth(initialMonth) : startOfMonth(today));

  // Sync currentMonth with initialMonth if it changes after mount
  useEffect(() => {
    if (initialMonth) {
      setCurrentMonth(startOfMonth(initialMonth));
    }
  }, [initialMonth]);

  const canGoPrev = isAfter(currentMonth, startOfMonth(today));
  const canGoNext = isBefore(currentMonth, maxNavMonth);

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => canGoPrev && setCurrentMonth(subMonths(currentMonth, 1))}
        className={darkMode ? `px-2 py-1 rounded text-white bg-transparent hover:bg-white/10 ${!canGoPrev ? 'opacity-40 cursor-not-allowed' : ''}` : `px-2 py-1 rounded hover:bg-gray-100 ${!canGoPrev ? 'opacity-40 cursor-not-allowed' : ''}`}
        aria-label="Previous Month"
        disabled={!canGoPrev}
      >
        &lt;
      </button>
      <span className={darkMode ? 'font-semibold text-lg text-white' : 'font-semibold text-lg'}>{format(currentMonth, 'MMMM yyyy')}</span>
      <button
        onClick={() => canGoNext && setCurrentMonth(addMonths(currentMonth, 1))}
        className={darkMode ? `px-2 py-1 rounded text-white bg-transparent hover:bg-white/10 ${!canGoNext ? 'opacity-40 cursor-not-allowed' : ''}` : `px-2 py-1 rounded hover:bg-gray-100 ${!canGoNext ? 'opacity-40 cursor-not-allowed' : ''}`}
        aria-label="Next Month"
        disabled={!canGoNext}
      >
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const start = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className={darkMode ? 'text-xs font-medium text-center text-gray-200' : 'text-xs font-medium text-center text-gray-500'}>
          {format(addDays(start, i), 'EEEEE')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const thisDay = day;
        formattedDate = format(thisDay, 'd');
        const isCurrentMonth = isSameMonth(thisDay, monthStart);
        const isSelected = selectedDate && isSameDay(thisDay, selectedDate);
        const isWeekday = thisDay.getDay() >= 1 && thisDay.getDay() <= 5;
        const isAfterMin = thisDay >= minDate;
        const isBeforeMax = thisDay <= maxDate;
        const isPast = isBefore(thisDay, today) && isSameMonthFn(thisDay, today);
        const isEnabled = isCurrentMonth && isWeekday && isAfterMin && isBeforeMax && !isPast;
        days.push(
          <button
            key={format(thisDay, 'yyyy-MM-dd')}
            onClick={() => {
              if (isEnabled) {
                onDateSelect(thisDay);
              }
            }}
            className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition
              ${darkMode ? (isCurrentMonth ? 'text-white' : 'text-gray-500') : (isCurrentMonth ? 'text-gray-900' : 'text-gray-300')}
              ${isSelected ? (darkMode ? 'ring-2 ring-white text-white bg-transparent' : 'ring-2 ring-blue-600 text-blue-600 bg-transparent') : (darkMode ? 'hover:bg-white/10' : 'hover:bg-blue-100')}
              ${!isEnabled ? 'opacity-40 cursor-not-allowed' : ''}
              ${isPast ? 'line-through' : ''}
              ${!isCurrentMonth ? 'cursor-default' : 'cursor-pointer'}`}
            disabled={!isEnabled}
          >
            {formattedDate}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 mb-1" key={format(day, 'yyyy-MM-dd')}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className={darkMode ? 'bg-[#232326] rounded-xl shadow p-4 w-full max-w-md mx-auto border border-white/10 flex flex-col h-full min-h-full max-h-full justify-between' : 'bg-white rounded-xl shadow p-4 w-full max-w-md mx-auto flex flex-col h-full min-h-full max-h-full justify-between'}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
} 