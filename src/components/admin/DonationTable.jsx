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

const fmtAmount = (v) => `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)}`;

function PaymentBadge({ method }) {
  if (method === 'venmo') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">📱 Venmo</span>
  );
  if (method === 'cash') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">💵 Cash</span>
  );
  return <span>-</span>;
}

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

      {/* 모바일: 카드 목록 */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">신청 내역이 없습니다</p>
        ) : (
          filtered.map((d) => {
            const cfg = STATUS_CONFIG[d.status || 'pending'];
            const Icon = cfg.icon;
            return (
              <div key={d.id} className="rounded-2xl border border-border/50 bg-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{d.donor_name}</p>
                    <p className="text-xs text-muted-foreground">{d.donor_phone}</p>
                    <p className="text-xs text-muted-foreground">{d.donor_email}</p>
                  </div>
                  <Badge variant="outline" className={`gap-1 shrink-0 ${cfg.className}`}>
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{fmtAmount(d.amount)}</span>
                    <PaymentBadge method={d.payment_method} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {d.created_date ? format(new Date(d.created_date), 'MM/dd HH:mm') : '-'}
                  </span>
                </div>
                {d.message && (
                  <p className="text-sm text-muted-foreground border-t pt-2">💬 {d.message}</p>
                )}
                <div className="flex gap-2 border-t pt-2">
                  {d.status !== 'confirmed' && (
                    <Button size="sm" variant="outline"
                      className="flex-1 h-8 text-green-600 border-green-300 hover:bg-green-50"
                      onClick={() => onStatusChange(d.id, 'confirmed')}>확인</Button>
                  )}
                  {d.status !== 'cancelled' && (
                    <Button size="sm" variant="outline"
                      className="flex-1 h-8 text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => onStatusChange(d.id, 'cancelled')}>취소</Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 데스크탑: 테이블 */}
      <div className="hidden md:block rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>이름</TableHead>
                <TableHead>전화번호</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead className="text-right">금액</TableHead>
                <TableHead>전달방법</TableHead>
                <TableHead>메시지</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>신청일</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
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
                      <TableCell className="text-sm"><PaymentBadge method={d.payment_method} /></TableCell>
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