import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Trash2, Loader2 } from 'lucide-react';

const STATUS_LABEL = { pending: '검토중', confirmed: '확인됨', cancelled: '취소됨' };
const STATUS_COLOR = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const PRESET_AMOUNTS = [10, 30, 50, 100];

export default function MyDonations({ donorEmail }) {
  const queryClient = useQueryClient();
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({});

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['my-donations', donorEmail],
    queryFn: () => base44.entities.Donation.filter({ donor_email: donorEmail }),
    enabled: !!donorEmail,
    initialData: [],
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Donation.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-donations', donorEmail] });
      setEditTarget(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Donation.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-donations', donorEmail] }),
  });

  const openEdit = (d) => {
    setEditTarget(d);
    setEditForm({ donor_name: d.donor_name, donor_phone: d.donor_phone, amount: String(d.amount), message: d.message || '' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editTarget.id, data: { ...editForm, amount: Number(editForm.amount) } });
  };

  if (!donorEmail) return null;
  if (isLoading) return <p className="text-center text-sm text-muted-foreground py-4">불러오는 중...</p>;
  if (donations.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="font-heading font-semibold text-base text-foreground mb-3">내 모금 신청 내역</h2>
      <div className="space-y-3">
        {donations.map((d) => (
          <div key={d.id} className="bg-card border border-border/50 rounded-xl px-4 py-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-sm">{d.donor_name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLOR[d.status]}`}>
                  {STATUS_LABEL[d.status]}
                </span>
              </div>
              <p className="text-base font-bold text-primary">${d.amount}</p>
              {d.message && <p className="text-xs text-muted-foreground mt-0.5 truncate">{d.message}</p>}
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(d)}>
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => deleteMutation.mutate(d.id)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>모금 신청 수정</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>이름</Label>
              <Input value={editForm.donor_name || ''} onChange={(e) => setEditForm({ ...editForm, donor_name: e.target.value })} required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>전화번호</Label>
              <Input value={editForm.donor_phone || ''} onChange={(e) => setEditForm({ ...editForm, donor_phone: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>금액 ($)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                <Input type="number" min="1" step="0.01" value={editForm.amount || ''} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} required className="rounded-xl pl-7" />
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESET_AMOUNTS.map((a) => (
                  <Button key={a} type="button" variant="outline" size="sm" className="rounded-full text-xs" onClick={() => setEditForm({ ...editForm, amount: String(a) })}>
                    ${a}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>응원 메시지</Label>
              <Textarea value={editForm.message || ''} onChange={(e) => setEditForm({ ...editForm, message: e.target.value })} className="rounded-xl resize-none h-20" />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setEditTarget(null)}>취소</Button>
              <Button type="submit" className="flex-1 rounded-xl" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : '저장'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}