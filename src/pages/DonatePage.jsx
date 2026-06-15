import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle2, Heart, HandHeart, TrendingUp, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MyDonations from '@/components/donate/MyDonations';

const PRESET_AMOUNTS = [10, 30, 50, 100];

export default function DonatePage() {
  const queryClient = useQueryClient();

  const { data: rounds = [] } = useQuery({
    queryKey: ['fundraising-round'],
    queryFn: () => base44.entities.FundraisingRound.list('-created_date'),
    initialData: [],
  });

  const { data: donations = [] } = useQuery({
    queryKey: ['donations-closed-stats'],
    queryFn: () => base44.entities.Donation.filter({ status: 'confirmed' }),
    initialData: [],
  });

  const currentRound = rounds[0];
  const isActive = currentRound?.active !== false;
  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  const [form, setForm] = useState({
    donor_name: '',
    donor_phone: '',
    donor_email: '',
    amount: '',
    payment_method: '',
    message: '',
  });
  const [done, setDone] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.Donation.create({ ...data, status: 'pending' }),
    onSuccess: () => {
      setSubmittedEmail(form.donor_email);
      queryClient.invalidateQueries({ queryKey: ['my-donations', form.donor_email] });
      setDone(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.payment_method) {
      alert('전달 방법을 선택해주세요.');
      return;
    }
    mutation.mutate({ ...form, amount: Number(form.amount) });
  };

  const handleReset = () => {
    setDone(false);
    setForm({ donor_name: '', donor_phone: '', donor_email: '', amount: '', payment_method: '', message: '' });
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10 md:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 mb-4">
          <HandHeart className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          모금 신청
        </h1>
        <p className="text-muted-foreground text-sm">
          따뜻한 마음으로 함께돌봄을 응원해주세요
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-foreground">신청이 완료되었습니다!</h2>
            <p className="text-muted-foreground text-sm">
              관리자 확인 후 모금 현황에 반영됩니다.
            </p>
            <Button variant="outline" className="rounded-xl mt-4" onClick={handleReset}>
              추가 신청하기
            </Button>

            <MyDonations donorEmail={submittedEmail} />
          </motion.div>
        ) : isActive ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-border/50 shadow-sm">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="donor_name">이름 *</Label>
                    <Input
                      id="donor_name"
                      required
                      value={form.donor_name}
                      onChange={(e) => setForm({ ...form, donor_name: e.target.value })}
                      placeholder="홍길동"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donor_phone">전화번호 *</Label>
                    <Input
                      id="donor_phone"
                      required
                      value={form.donor_phone}
                      onChange={(e) => setForm({ ...form, donor_phone: e.target.value })}
                      placeholder="010-1234-5678"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donor_email">이메일 *</Label>
                    <Input
                      id="donor_email"
                      type="email"
                      required
                      value={form.donor_email}
                      onChange={(e) => setForm({ ...form, donor_email: e.target.value })}
                      placeholder="example@email.com"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">금액 ($) *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                      <Input
                        id="amount"
                        type="number"
                        required
                        min="1"
                        step="0.01"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="0.00"
                        className="rounded-xl text-lg font-semibold pl-7"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {PRESET_AMOUNTS.map((a) => (
                        <Button
                          key={a}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-full text-xs"
                          onClick={() => setForm({ ...form, amount: String(a) })}
                        >
                          ${a}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      💡 위 금액 외에도 원하시는 금액을 직접 입력하셔도 됩니다.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>전달 방법 *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'venmo', label: 'Venmo 송금', emoji: '📱', sub: '@Jenny-Kim-112' },
                        { value: 'cash', label: 'Cash 전달', emoji: '💵', sub: null },
                      ].map(({ value, label, emoji, sub }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm({ ...form, payment_method: value })}
                          className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-4 text-sm font-medium transition-all ${
                            form.payment_method === value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          <span className="text-2xl">{emoji}</span>
                          <span>{label}</span>
                          {sub && <span className="text-xs font-normal opacity-70">{sub}</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Venmo QR 안내 */}
                  {form.payment_method === 'venmo' && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 flex flex-col items-center gap-2 text-center">
                      <p className="text-sm font-semibold text-blue-800">Venmo 송금 정보</p>
                      <img
                        src="https://media.base44.com/images/public/6a271749be36c1ce6fc67f93/e1af5b21b_KakaoTalk_20260608_214837841.jpg"
                        alt="Venmo QR Code"
                        className="w-48 h-48 object-contain rounded-lg border border-blue-100 bg-white"
                      />
                      <div>
                        <p className="font-bold text-blue-900">Jenny Kim</p>
                        <a
                          href="https://venmo.com/Jenny-Kim-112"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          @Jenny-Kim-112
                        </a>
                      </div>
                      <p className="text-xs text-blue-700">위 QR코드를 스캔하거나 Venmo에서 <strong>@Jenny-Kim-112</strong>로 검색해 송금해주세요.</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">응원 메시지 (선택)</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="따뜻한 한 마디를 남겨주세요"
                      className="rounded-xl resize-none h-20"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl h-12 text-base gap-2"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Heart className="w-4 h-4" />
                    )}
                    모금 신청하기
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* 이메일 입력 후 내 신청 내역 조회 */}
            {form.donor_email && form.donor_email.includes('@') && (
              <MyDonations donorEmail={form.donor_email} />
            )}
          </motion.div>
        ) : (
          <motion.div key="closed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 shadow-sm">
              <CardContent className="pt-6 pb-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100">
                  <Lock className="w-7 h-7 text-slate-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">모금이 마감되었습니다</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentRound?.message || '현재 모금이 마감되었습니다. 다음 모금을 기다려주세요.'}
                  </p>
                </div>

                {/* Stats */}
                <div className="rounded-xl bg-slate-50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">총 모금액</span>
                    <span className="text-lg font-bold text-foreground">
                      ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">총 건수</span>
                    <span className="text-lg font-bold text-foreground">{donations.length}건</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">상태</span>
                    <span className="text-sm font-semibold text-slate-500">마감</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  확인된(confirmed) 기부 건만 집계됩니다
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}