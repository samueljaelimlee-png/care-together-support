import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, Lock } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import DonationStats from '../components/admin/DonationStats';
import DonationTable from '../components/admin/DonationTable';
import DonationChart from '../components/admin/DonationChart';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me()
      .then((u) => { setUser(u); setAuthChecked(true); })
      .catch(() => setAuthChecked(true));
  }, []);

  const { data: donations = [] } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: () => base44.entities.Donation.list('-created_date'),
    initialData: [],
    enabled: user?.role === 'admin',
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Donation.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-donations'] }),
  });

  const handleStatusChange = (id, status) => updateMutation.mutate({ id, status });
  const handleLogout = () => base44.auth.logout('/');

  if (!authChecked) return null;

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="font-heading text-xl font-bold">접근 권한이 없습니다</h2>
        <p className="text-muted-foreground text-sm text-center">이 페이지는 관리자만 접근할 수 있습니다.</p>
        <Button variant="outline" onClick={() => window.location.href = '/'}>홈으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-base leading-tight">관리자 대시보드</h1>
              <p className="text-xs text-muted-foreground">모금 현황 관리</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <DonationStats donations={donations} />
        <DonationChart donations={donations} />
        <DonationTable
          donations={donations}
          onStatusChange={handleStatusChange}
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      </div>
    </div>
  );
}