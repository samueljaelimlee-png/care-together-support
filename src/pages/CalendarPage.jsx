import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import CalendarGrid from '../components/calendar/CalendarGrid';
import VolunteerModal from '../components/calendar/VolunteerModal';
import MyVolunteerTab from '../components/calendar/MyVolunteerTab';
import MessagesTab from '../components/calendar/MessagesTab';

const TABS = [
  { key: 'calendar', label: '캘린더', icon: Calendar },
  { key: 'my', label: '내 봉사', icon: User },
  { key: 'messages', label: '말씀', icon: BookOpen },
];

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState('calendar');
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
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
      {/* Tab navigation — matches original app style */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-muted rounded-xl p-1 gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-card shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'calendar' && (
          <div>
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                함께돌봄 스케줄
              </h1>
              <p className="text-muted-foreground text-sm">빈 날짜를 클릭하여 봉사를 신청해주세요</p>
            </div>

            {/* Type filter legend */}
            <div className="flex flex-wrap gap-3 justify-center mb-5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                빨래
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                식사봉사
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex justify-center gap-2 mb-5">
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
            <div className="flex items-center justify-between mb-5">
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="font-heading font-bold text-xl">
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
        )}

        {activeTab === 'my' && <MyVolunteerTab />}
        {activeTab === 'messages' && <MessagesTab />}
      </motion.div>
    </div>
  );
}