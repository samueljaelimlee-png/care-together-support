import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';

const DOT_COLORS = {
  laundry: 'bg-blue-400',
  meal: 'bg-amber-400',
};

export default function CalendarGrid({ currentMonth, schedules, onDateClick }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = [];
  let day = calStart;
  while (day <= calEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const getSchedulesForDay = (d) => {
    const dateStr = format(d, 'yyyy-MM-dd');
    return schedules.filter(s => s.date === dateStr);
  };

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((wd) => (
          <div key={wd} className="text-center text-xs font-medium text-muted-foreground py-2">{wd}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-border/40 rounded-2xl overflow-hidden">
        {days.map((d, idx) => {
          const daySchedules = getSchedulesForDay(d);
          const inMonth = isSameMonth(d, currentMonth);
          const today = isToday(d);

          return (
            <motion.button
              key={idx}
              onClick={() => inMonth && onDateClick(d)}
              whileTap={{ scale: 0.95 }}
              className={`
                relative min-h-[80px] md:min-h-[100px] p-1.5 md:p-2 text-left transition-colors
                ${inMonth ? 'bg-card hover:bg-secondary/50 cursor-pointer' : 'bg-muted/30 cursor-default'}
                ${today ? 'ring-2 ring-primary ring-inset' : ''}
              `}
            >
              <span className={`
                text-xs md:text-sm font-medium
                ${!inMonth ? 'text-muted-foreground/40' : today ? 'text-primary font-bold' : 'text-foreground'}
              `}>
                {format(d, 'd')}
              </span>

              <div className="mt-1 space-y-0.5">
                {daySchedules.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${DOT_COLORS[s.type]}`} />
                    <span className="text-[10px] md:text-xs text-muted-foreground truncate">
                      {s.volunteer_name}
                    </span>
                  </div>
                ))}
                {daySchedules.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">+{daySchedules.length - 3}명</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}