import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Users, Eye } from 'lucide-react';

export default function VisitorStats() {
  const { data: visitors = [] } = useQuery({
    queryKey: ['visitor-stats'],
    queryFn: async () => {
      const all = await base44.entities.Visitor.list('-created_date', 10000);
      return all;
    },
    initialData: [],
  });

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = visitors.filter((v) => v.created_date?.slice(0, 10) === today).length;
  const BASE_VISITORS = 204;
  const totalCount = BASE_VISITORS + visitors.length;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl border border-border/50 bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Eye className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">오늘 방문자</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{todayCount.toLocaleString()}</p>
      </div>
      <div className="rounded-2xl border border-border/50 bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">전체 방문자</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{totalCount.toLocaleString()}</p>
      </div>
    </div>
  );
}