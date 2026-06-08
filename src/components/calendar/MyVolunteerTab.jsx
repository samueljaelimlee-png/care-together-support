import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Search, Calendar, Droplets, UtensilsCrossed } from 'lucide-react';

const TYPE_CONFIG = {
  laundry: { label: '빨래', icon: Droplets, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  meal: { label: '식사봉사', icon: UtensilsCrossed, color: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export default function MyVolunteerTab() {
  const [search, setSearch] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const { data: schedules = [], refetch, isFetching } = useQuery({
    queryKey: ['my-schedules', search.name, search.phone],
    queryFn: () => {
      const filters = {};
      if (search.name) filters.volunteer_name = search.name;
      if (search.phone) filters.volunteer_phone = search.phone;
      return base44.entities.VolunteerSchedule.filter(filters, 'date');
    },
    enabled: submitted,
    initialData: [],
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmitted(true);
    refetch();
  };

  const sorted = [...schedules].sort((a, b) => a.date > b.date ? 1 : -1);

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="pt-5">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="search-name">이름</Label>
                <Input
                  id="search-name"
                  value={search.name}
                  onChange={(e) => setSearch({ ...search, name: e.target.value })}
                  placeholder="홍길동"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="search-phone">전화번호</Label>
                <Input
                  id="search-phone"
                  value={search.phone}
                  onChange={(e) => setSearch({ ...search, phone: e.target.value })}
                  placeholder="010-1234-5678"
                />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={!search.name && !search.phone}>
              <Search className="w-4 h-4" />
              내 봉사 조회
            </Button>
          </form>
        </CardContent>
      </Card>

      {submitted && !isFetching && (
        <div>
          {sorted.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>등록된 봉사 일정이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">총 {sorted.length}건의 봉사 일정</p>
              {sorted.map((s) => {
                const cfg = TYPE_CONFIG[s.type];
                const Icon = cfg.icon;
                return (
                  <div key={s.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-card">
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{format(new Date(s.date), 'yyyy년 M월 d일 (EEEE)', { locale: ko })}</p>
                      <p className="text-xs text-muted-foreground">{cfg.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}