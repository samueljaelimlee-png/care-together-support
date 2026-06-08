import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HandHeart, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

const fmt = (v) => `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)}`;

export default function DonationStats({ donations }) {
  const confirmed = donations.filter(d => d.status === 'confirmed');
  const pending = donations.filter(d => d.status === 'pending');
  const cancelled = donations.filter(d => d.status === 'cancelled');

  const totalConfirmed = confirmed.reduce((s, d) => s + (d.amount || 0), 0);
  const totalPending = pending.reduce((s, d) => s + (d.amount || 0), 0);
  const totalAll = donations.reduce((s, d) => s + (d.amount || 0), 0);

  const stats = [
    { label: '확인된 모금 총액', value: fmt(totalConfirmed), sub: `${confirmed.length}건 확인`, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: '대기 중 금액', value: fmt(totalPending), sub: `${pending.length}건 대기`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '전체 신청 금액', value: fmt(totalAll), sub: `총 ${donations.length}건 신청`, icon: HandHeart, color: 'text-primary', bg: 'bg-primary/10' },
    { label: '취소', value: `${cancelled.length}건`, sub: `취소된 신청`, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div>
      <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        모금 통계
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: IconComp, color, bg }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <IconComp className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
              <p className="text-base font-bold text-foreground leading-tight">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}