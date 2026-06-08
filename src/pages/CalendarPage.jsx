import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CalendarGrid from '../components/calendar/CalendarGrid';
import VolunteerModal from '../components/calendar/VolunteerModal';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const queryClient = useQueryClient();

  const { data: schedules = [] } = useQuery({
    queryKey: ['schedules'],
    queryFn: () => base44.entities.VolunteerSchedule.list(),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.VolunteerSchedule.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules'] }),
  });

  const filtered = filter === 'all' ? schedules : schedules.filter(s => s.type === filter);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          함께돌봄 스케줄
        </h1>
        <p className="text-muted-foreground text-sm">
          빈 날짜를 클릭하여 봉사를 신청해주세요
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex justify-center gap-2 mb-6">
        {[
          { key: 'all', label: '전체' },
          { key: 'laundry', label: '🧺 빨래' },
          { key: 'meal', label: '🍽️ 식사봉사' },
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={filter === key ? 'default' : 'outline'}
            size="sm"
            className="rounded-full px-5"
            onClick={() => setFilter(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-heading font-bold text-xl min-w-[140px] text-center">
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </h2>
        <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <CalendarGrid
        currentMonth={currentMonth}
        schedules={filtered}
        onDateClick={handleDateClick}
      />

      <VolunteerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        date={selectedDate}
        onSubmit={handleSubmit}
      />
    </div>
  );
}