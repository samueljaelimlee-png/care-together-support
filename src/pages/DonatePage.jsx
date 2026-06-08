import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle2, Heart, HandHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MyDonations from '@/components/donate/MyDonations';

const PRESET_AMOUNTS = [10, 30, 50, 100];

export default function DonatePage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    donor_name: '',
    donor_phone: '',
    donor_email: '',
    amount: '',
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
    mutation.mutate({ ...form, amount: Number(form.amount) });
  };

  const handleReset = () => {
    setDone(false);
    setForm({ donor_name: '', donor_phone: '', donor_email: '', amount: '', message: '' });
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
        ) : (
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
                  </div>

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
        )}
      </AnimatePresence>
    </div>
  );
}