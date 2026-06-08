import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle2, ChevronLeft } from 'lucide-react';

const TIME_SLOTS = [
  '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00',
  '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
  '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00',
  '19:00-20:00', '20:00-21:00', '21:00-22:00',
];

function formatTimeSlot(slot) {
  if (!slot) return slot;
  const [start, end] = slot.split('-');
  const fmt = (t) => {
    const [h, m] = t.split(':').map(Number);
    const ampm = h < 12 ? '오전' : '오후';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${ampm} ${h12}:${String(m).padStart(2, '0')}`;
  };
  return `${fmt(start)} ~ ${fmt(end)}`;
}

const TYPE_LABELS = { laundry: '🧺 빨래', meal: '🍽️ 식사봉사' };

export default function VolunteerSignupForm({ type, onSubmit, onCancel }) {
  const [form, setForm] = useState({ volunteer_name: '', volunteer_phone: '', volunteer_email: '', memo: '', time_slot: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      onCancel();
    }, 1200);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center py-10 gap-3">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
        <p className="font-medium text-foreground">신청이 완료되었습니다!</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        뒤로
      </button>
      <p className="font-semibold text-sm mb-4">{TYPE_LABELS[type]} 신청</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>시간대</Label>
          <Select value={form.time_slot} onValueChange={(v) => setForm({ ...form, time_slot: v })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="시간대를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>{formatTimeSlot(slot)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>이름 *</Label>
          <Input required value={form.volunteer_name} onChange={(e) => setForm({ ...form, volunteer_name: e.target.value })} placeholder="홍길동" className="rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>전화번호</Label>
          <Input value={form.volunteer_phone} onChange={(e) => setForm({ ...form, volunteer_phone: e.target.value })} placeholder="010-1234-5678" className="rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>이메일</Label>
          <Input type="email" value={form.volunteer_email} onChange={(e) => setForm({ ...form, volunteer_email: e.target.value })} placeholder="example@email.com" className="rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>메모</Label>
          <Textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })} placeholder="전달 사항이 있으면 적어주세요" className="rounded-xl resize-none h-20" />
        </div>
        <Button type="submit" className="w-full rounded-xl" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          신청하기
        </Button>
      </form>
    </div>
  );
}