import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from '@headlessui/react';

interface CalendarProps {
  onTimeSlotSelect: (date: Date) => void;
  darkMode?: boolean;
  onlyWeekdays?: boolean;
  minTime?: string;
  maxTime?: string;
}

export default function Calendar({ onTimeSlotSelect, darkMode, onlyWeekdays, minTime, maxTime }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelect = (selectInfo: { start: Date }) => {
    setSelectedDate(selectInfo.start);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onTimeSlotSelect(selectedDate);
      setIsModalOpen(false);
    }
  };

  return (
    <div className={darkMode ? 'bg-[#232326] rounded-xl p-4 text-white' : 'bg-white/50 backdrop-blur-sm rounded-xl p-4'}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={!onlyWeekdays ? true : false}
        allDaySlot={false}
        businessHours={onlyWeekdays ? {
          daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
          startTime: minTime || '12:00',
          endTime: maxTime || '16:00',
        } : undefined}
        slotMinTime={minTime || '12:00:00'}
        slotMaxTime={maxTime || '16:00:00'}
        select={handleDateSelect}
        height="auto"
        dayHeaderFormat={{ weekday: 'short' }}
      />

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className={darkMode ? 'mx-auto max-w-sm rounded-2xl bg-[#232326] p-6 shadow-xl border border-white/10 text-white' : 'mx-auto max-w-sm rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-white/20'}>
            <Dialog.Title className="text-lg font-medium leading-6">
              Confirm Lesson Time
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm">
                Selected time: {selectedDate?.toLocaleString()}
              </p>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                className={darkMode ? 'inline-flex justify-center rounded-xl border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors' : 'inline-flex justify-center rounded-xl border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors'}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={darkMode ? 'inline-flex justify-center rounded-xl border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#232326] hover:bg-gray-200 transition-colors' : 'inline-flex justify-center rounded-xl border border-transparent bg-[#1a202c] px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors'}
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 