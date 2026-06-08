import React from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, XCircle, Clock, List } from 'lucide-react';

const STATUS_CONFIG = {
  pending: { label: '대기', icon: Clock, className: 'border-amber-300 text-amber-700 bg-amber-50' },
  confirmed: { label: '확인', icon: CheckCircle2, className: 'border-green-300 text-green-700 bg-green-50' },
  cancelled: { label: '취소', icon: XCircle, className: 'border-red-300 text-red-700 bg-red-50' },
};

const fmtAmount = (v) => `${new Intl.NumberFormat('ko-KR').format(v)}원`;

export default function DonationTable({ donations, onStatusChange, statusFilter, onFilterChange }) {
  const filtered = statusFilter === 'all' ? donations : donations.filter(d => d.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
          <List className="w-5 h-5 text-primary" />
          모금 신청 목록
        </h3>
        <Select value={statusFilter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-28 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="pending">대기</SelectItem>
            <SelectItem value="confirmed">확인</SelectItem>
            <SelectItem value="cancelled">취소</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>이름</TableHead>
                <TableHead>전화번호</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead className="text-right">금액</TableHead>
                <TableHead>메시지</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>신청일</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    신청 내역이 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((d) => {
                  const cfg = STATUS_CONFIG[d.status || 'pending'];
                  const Icon = cfg.icon;
                  return (
                    <TableRow key={d.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{d.donor_name}</TableCell>
                      <TableCell className="text-sm">{d.donor_phone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{d.donor_email}</TableCell>
                      <TableCell className="text-right font-semibold">{fmtAmount(d.amount)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">{d.message || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`gap-1 ${cfg.className}`}>
                          <Icon className="w-3 h-3" />
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {d.created_date ? format(new Date(d.created_date), 'MM/dd HH:mm') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {d.status !== 'confirmed' && (
                            <Button size="sm" variant="ghost"
                              className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => onStatusChange(d.id, 'confirmed')}>확인</Button>
                          )}
                          {d.status !== 'cancelled' && (
                            <Button size="sm" variant="ghost"
                              className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => onStatusChange(d.id, 'cancelled')}>취소</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}