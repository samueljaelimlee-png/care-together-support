import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { BarChart2 } from 'lucide-react';

const fmt = (v) => `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)}`;

export default function DonationChart({ donations }) {
  // Group confirmed donations by month
  const confirmed = donations.filter(d => d.status === 'confirmed' && d.created_date);

  const monthMap = {};
  confirmed.forEach(d => {
    const key = format(new Date(d.created_date), 'yyyy-MM');
    const label = format(new Date(d.created_date), 'M월', { locale: ko });
    if (!monthMap[key]) monthMap[key] = { key, label, amount: 0, count: 0 };
    monthMap[key].amount += d.amount || 0;
    monthMap[key].count += 1;
  });

  const data = Object.values(monthMap).sort((a, b) => a.key.localeCompare(b.key)).slice(-6);

  if (data.length === 0) return null;

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-heading text-base flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-primary" />
          월별 모금 현황 (최근 6개월)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `$${new Intl.NumberFormat('en-US', { notation: 'compact' }).format(v)}`} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value) => [fmt(value), '모금액']}
              labelStyle={{ fontWeight: 600 }}
              contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }}
            />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill="hsl(var(--primary))" fillOpacity={0.75 + i * 0.04} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}