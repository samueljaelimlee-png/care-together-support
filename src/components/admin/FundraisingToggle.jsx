import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Loader2, Power, PowerOff } from 'lucide-react';

export default function FundraisingToggle() {
  const queryClient = useQueryClient();

  const { data: rounds = [], isLoading } = useQuery({
    queryKey: ['fundraising-round'],
    queryFn: () => base44.entities.FundraisingRound.list('-created_date'),
    initialData: [],
  });

  const currentRound = rounds[0];

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }) => base44.entities.FundraisingRound.update(id, { active }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fundraising-round'] }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        로딩 중...
      </div>
    );
  }

  if (!currentRound) return null;

  const isActive = currentRound.active;

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-green-100' : 'bg-slate-100'}`}>
            {isActive ? <Power className="w-5 h-5 text-green-600" /> : <PowerOff className="w-5 h-5 text-slate-500" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-sm">{currentRound.title || `${currentRound.round}차 모금`}</h3>
              <Badge variant="outline" className={isActive ? 'border-green-300 text-green-700 bg-green-50' : 'border-slate-300 text-slate-500 bg-slate-50'}>
                {isActive ? '진행 중' : '마감'}
              </Badge>
            </div>
            {currentRound.message && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{currentRound.message}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground">{isActive ? 'ON' : 'OFF'}</span>
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => toggleMutation.mutate({ id: currentRound.id, active: checked })}
            disabled={toggleMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}