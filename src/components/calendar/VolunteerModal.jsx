import React, { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function VolunteerModal({ open, onClose, date, onSubmit }) {
  const [form, setForm] = useState({
    volunteer_name: '',
    volunteer_phone: '',
    volunteer_email: '',
  });
  const [types, setTypes] = useState({ laundry: false, meal: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggleType = (key) => setTypes((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!types.laundry && !types.meal) return;
    setLoading(true);
    const dateStr = format(date, 'yyyy-MM-dd');
    // Create one record per selected type
    const promises = [];
    if (types.laundry) promises.push(onSubmit({ ...form, type: 'laundry', date: dateStr }));
    if (types.meal) promises.push(onSubmit({ ...form, type: 'meal', date: dateStr }));
    await Promise.all(promises);
    setLoading(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm({ volunteer_name: '', volunteer_phone: '', volunteer_email: '' });
      setTypes({ laundry: false, meal: false });
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
              <Label>봉사 유형 (중복 선택 가능) *</Label>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="laundry"
                    checked={types.laundry}
                    onCheckedChange={() => toggleType('laundry')}
                  />
                  <Label htmlFor="laundry" className="cursor-pointer font-normal">🧺 빨래</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="meal"
                    checked={types.meal}
                    onCheckedChange={() => toggleType('meal')}
                  />
                  <Label htmlFor="meal" className="cursor-pointer font-normal">🍽️ 식사봉사</Label>
                </div>
              </div>
              {!types.laundry && !types.meal && (
                <p className="text-xs text-destructive">봉사 유형을 하나 이상 선택해주세요</p>
              )}
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

            <Button
              type="submit"
              className="w-full rounded-xl"
              disabled={loading || (!types.laundry && !types.meal)}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              신청하기
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}