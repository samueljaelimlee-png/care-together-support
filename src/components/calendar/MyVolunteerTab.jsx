import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Heart, Droplets, UtensilsCrossed } from 'lucide-react';

const TYPE_CONFIG = {
  laundry: { label: '빨래', icon: Droplets, bg: 'bg-blue-100', text: 'text-blue-600', badge: 'bg-blue-50 text-blue-600 border-blue-200' },
  meal: { label: '식사봉사', icon: UtensilsCrossed, bg: 'bg-amber-100', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-600 border-amber-200' },
};

function ScheduleRow({ s }) {
  const cfg = TYPE_CONFIG[s.type];
  const Icon = cfg.icon;
  const dateObj = parseISO(s.date);
  const dateStr = format(dateObj, 'M/d (EEE)', { locale: ko });

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-border/40">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
        <Icon className={`w-4 h-4 ${cfg.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm text-foreground">{s.volunteer_name}</span>
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>
            <Icon className="w-3 h-3" />
            {cfg.label}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">📅 {dateStr}</p>
      </div>
    </div>
  );
}

export default function MyVolunteerTab() {
  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ['schedules-all'],
    queryFn: () => base44.entities.VolunteerSchedule.list('date'),
    initialData: [],
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = schedules.filter(s => {
    const d = parseISO(s.date);
    return d >= today;
  }).sort((a, b) => a.date > b.date ? 1 : -1);

  const past = schedules.filter(s => {
    const d = parseISO(s.date);
    return d < today;
  }).sort((a, b) => a.date < b.date ? 1 : -1);

  const uniqueVolunteers = new Set(schedules.map(s => s.volunteer_name)).size;

  const stats = [
    { label: '예정', value: upcoming.length, color: 'text-primary' },
    { label: '완료', value: past.length, color: 'text-green-600' },
    { label: '전체', value: schedules.length, color: 'text-foreground' },
    { label: '봉사자', value: uniqueVolunteers, color: 'text-amber-600' },
  ];

  if (isLoading) return <div className="text-center py-12 text-muted-foreground text-sm">불러오는 중...</div>;

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-display text-xl font-bold text-foreground">전체 봉사 현황</h2>
        <p className="text-xs text-muted-foreground mt-1">총 {schedules.length}건의 봉사가 등록되어 있습니다</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-card rounded-xl border border-border/40 py-3 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Heart className="w-4 h-4 text-primary fill-primary/30" />
          <h3 className="font-heading font-semibold text-sm text-foreground">예정된 봉사</h3>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">예정된 봉사가 없습니다</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map(s => <ScheduleRow key={s.id} s={s} />)}
          </div>
        )}
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-sm text-muted-foreground mb-3">지난 봉사</h3>
          <div className="space-y-2 opacity-70">
            {past.map(s => <ScheduleRow key={s.id} s={s} />)}
          </div>
        </div>
      )}
    </div>
  );
}