import React, { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function VolunteerModal({ open, onClose, date, onSubmit }) {
  const [form, setForm] = useState({ volunteer_name: '', volunteer_phone: '', volunteer_email: '', type: 'laundry' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({
      ...form,
      date: format(date, 'yyyy-MM-dd'),
    });
    setLoading(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm({ volunteer_name: '', volunteer_phone: '', volunteer_email: '', type: 'laundry' });
      onClose();
    }, 1500);
  };

  if (!date) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">봉사 신청</DialogTitle>
          <DialogDescription>
            {format(date, 'yyyy년 M월 d일 (EEEE)', { locale: ko })}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center py-8 gap-3">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <p className="font-medium text-foreground">신청이 완료되었습니다!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>봉사 유형</Label>
              <RadioGroup value={form.type} onValueChange={(v) => setForm({ ...form, type: v })} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="laundry" id="laundry" />
                  <Label htmlFor="laundry" className="cursor-pointer">🧺 빨래</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="meal" id="meal" />
                  <Label htmlFor="meal" className="cursor-pointer">🍽️ 식사봉사</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                required
                value={form.volunteer_name}
                onChange={(e) => setForm({ ...form, volunteer_name: e.target.value })}
                placeholder="홍길동"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                value={form.volunteer_phone}
                onChange={(e) => setForm({ ...form, volunteer_phone: e.target.value })}
                placeholder="010-1234-5678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={form.volunteer_email}
                onChange={(e) => setForm({ ...form, volunteer_email: e.target.value })}
                placeholder="example@email.com"
              />
            </div>

            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              신청하기
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}