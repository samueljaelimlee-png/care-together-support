import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const TIME_SLOTS = [
  '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00',
  '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
  '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00',
  '19:00-20:00', '20:00-21:00', '21:00-22:00',
];

export default function VolunteerEditModal({ open, onClose, schedule, onSave }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (schedule) {
      setForm({
        volunteer_name: schedule.volunteer_name || '',
        volunteer_phone: schedule.volunteer_phone || '',
        volunteer_email: schedule.volunteer_email || '',
        type: schedule.type || 'laundry',
        time_slot: schedule.time_slot || '',
        memo: schedule.memo || '',
      });
    }
  }, [schedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(schedule.id, form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>봉사 신청 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label>시간대</Label>
            <Select value={form.time_slot || ''} onValueChange={(v) => setForm({ ...form, time_slot: v })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="시간대를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>봉사 유형</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laundry">🧺 빨래</SelectItem>
                <SelectItem value="meal">🍽️ 식사봉사</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>이름 *</Label>
            <Input required value={form.volunteer_name || ''} onChange={(e) => setForm({ ...form, volunteer_name: e.target.value })} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label>전화번호</Label>
            <Input value={form.volunteer_phone || ''} onChange={(e) => setForm({ ...form, volunteer_phone: e.target.value })} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label>이메일</Label>
            <Input type="email" value={form.volunteer_email || ''} onChange={(e) => setForm({ ...form, volunteer_email: e.target.value })} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label>메모</Label>
            <Textarea value={form.memo || ''} onChange={(e) => setForm({ ...form, memo: e.target.value })} className="rounded-xl resize-none h-20" placeholder="전달 사항이 있으면 적어주세요" />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={onClose}>취소</Button>
            <Button type="submit" className="flex-1 rounded-xl">저장</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}