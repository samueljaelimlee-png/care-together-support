import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { LogOut, Shield } from 'lucide-react';
import DonationStats from '../components/admin/DonationStats';
import DonationTable from '../components/admin/DonationTable';

export default function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: donations = [] } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: () => base44.entities.Donation.list('-created_date'),
    initialData: [],
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Donation.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-donations'] }),
  });

  const handleStatusChange = (id, status) => {
    updateMutation.mutate({ id, status });
  };

  const handleLogout = () => {
    base44.auth.logout('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-heading font-bold text-lg">관리자 대시보드</h1>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <DonationStats donations={donations} />
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