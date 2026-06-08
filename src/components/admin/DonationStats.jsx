import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HandHeart, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function DonationStats({ donations }) {
  const confirmed = donations.filter(d => d.status === 'confirmed');
  const pending = donations.filter(d => d.status === 'pending');
  const cancelled = donations.filter(d => d.status === 'cancelled');

  const totalConfirmed = confirmed.reduce((s, d) => s + (d.amount || 0), 0);
  const totalPending = pending.reduce((s, d) => s + (d.amount || 0), 0);

  const stats = [
    { label: '확인된 모금', value: `₩${new Intl.NumberFormat('ko-KR').format(totalConfirmed)}`, sub: `${confirmed.length}건`, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: '대기 중', value: `₩${new Intl.NumberFormat('ko-KR').format(totalPending)}`, sub: `${pending.length}건`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '전체 신청', value: `${donations.length}건`, sub: `취소 ${cancelled.length}건`, icon: HandHeart, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
        <Card key={label} className="border-border/50">
          <CardContent className="p-5 flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}