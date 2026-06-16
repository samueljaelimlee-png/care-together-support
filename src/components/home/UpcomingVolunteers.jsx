import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TYPE_LABELS = { laundry: '빨래', meal: '식사' };
const DOT_COLORS = { laundry: 'bg-blue-400', meal: 'bg-amber-400' };

export default function UpcomingVolunteers() {
  const today = new Date();
  const monthStart = format(startOfMonth(today), 'yyyy-MM-dd');
  const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd');

  const { data: schedules = [] } = useQuery({
    queryKey: ['home-upcoming-volunteers'],
    queryFn: () => base44.entities.VolunteerSchedule.filter({}, 'date', 200),
    initialData: [],
  });

  const thisMonthSchedules = schedules
    .filter((s) => s.date >= monthStart && s.date <= monthEnd)
    .sort((a, b) => a.date.localeCompare(b.date));

  const grouped = {};
  thisMonthSchedules.forEach((s) => {
    if (!grouped[s.date]) grouped[s.date] = [];
    grouped[s.date].push(s);
  });

  const days = Object.keys(grouped);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border/50 bg-card p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-heading font-semibold text-base text-foreground">
            봉사 캘린더
          </h2>
        </div>
        <Link
          to="/calendar"
          className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
        >
          전체보기
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {days.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          이번 달 등록된 봉사 일정이 없습니다
        </p>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {days.map((date) => {
            const daySchedules = grouped[date];
            const d = new Date(date + 'T00:00:00');
            const dayLabel = format(d, 'M/d (E)', { locale: ko });

            return (
              <div key={date} className="rounded-xl bg-muted/30 p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2">{dayLabel}</p>
                <div className="space-y-1.5">
                  {daySchedules.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOT_COLORS[s.type] || 'bg-slate-300'}`} />
                      <span className="text-xs text-muted-foreground w-10 flex-shrink-0">{s.time_slot || '-'}</span>
                      <span className="text-xs font-medium text-foreground flex-1">{s.volunteer_name}</span>
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                        {TYPE_LABELS[s.type] || s.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}