import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, Building2 } from 'lucide-react';

const STATUS_LABELS = { pending: '대기', confirmed: '확인', cancelled: '취소' };
const METHOD_LABELS = { venmo: 'Venmo', cash: 'Cash' };

// created_date는 UTC로 저장되므로 현지 시간대로 변환해서 표시
const toLocalDate = (s) => {
  if (!s) return null;
  const iso = s.endsWith('Z') ? s : s.replace(/(\.\d{3})\d+/, '$1') + 'Z';
  return new Date(iso);
};

function escapeCsv(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadCsv(filename, rows) {
  const csv = rows.map((r) => r.map(escapeCsv).join(',')).join('\r\n');
  // UTF-8 BOM for correct Korean display in Excel
  const blob = new Blob(['\uFEFF' + csv], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildRows(donations) {
  const header = ['이름', '전화번호', '이메일', '금액($)', '전달방법', '상태', '기부일', '신청일', '메시지'];
  const rows = donations.map((d) => [
    d.donor_name,
    d.donor_phone,
    d.donor_email,
    d.amount,
    METHOD_LABELS[d.payment_method] || d.payment_method || '-',
    STATUS_LABELS[d.status] || d.status,
    d.donation_date || '',
    d.created_date ? format(toLocalDate(d.created_date), 'yyyy-MM-dd HH:mm') : '',
    d.message || '',
  ]);
  return [header, ...rows];
}

export default function DonationExport({ donations }) {
  const exportAll = () => {
    const sorted = [...donations].sort((a, b) => (a.created_date || '').localeCompare(b.created_date || ''));
    downloadCsv(`기부내역_전체_${format(new Date(), 'yyyyMMdd')}.xls`, buildRows(sorted));
  };

  const exportRent = () => {
    const rent = donations
      .filter((d) => (d.message || '').includes('렌트비'))
      .sort((a, b) => (a.donation_date || '').localeCompare(b.donation_date || ''));
    const rows = buildRows(rent);
    const total = rent.reduce((sum, d) => sum + (d.amount || 0), 0);
    rows.push(['합계', '', '', total, '', '', '', '', '']);
    downloadCsv(`렌트비_지원현황_${format(new Date(), 'yyyyMMdd')}.xls`, rows);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button variant="outline" className="rounded-xl gap-2 flex-1" onClick={exportAll}>
        <FileSpreadsheet className="w-4 h-4 text-green-600" />
        전체 기부 내역 엑셀
      </Button>
      <Button variant="outline" className="rounded-xl gap-2 flex-1" onClick={exportRent}>
        <Download className="w-4 h-4 text-primary" />
        렌트비 지원 현황 엑셀
      </Button>
    </div>
  );
}