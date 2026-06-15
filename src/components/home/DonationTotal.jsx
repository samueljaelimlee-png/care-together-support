import React from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Lock } from 'lucide-react';

export default function DonationTotal({ total, count, closed = false }) {
  const formattedTotal = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(total);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${closed ? 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-400 text-white' : 'bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-primary-foreground'}`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            {closed ? <Lock className="w-5 h-5" /> : <Heart className="w-5 h-5 fill-white/50" />}
          </div>
          <p className="text-sm font-medium text-white/80 tracking-wide uppercase">
            함께돌봄 모금 현황 {closed && '(마감)'}
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-2">
            ${formattedTotal}
          </p>
        </motion.div>

        <div className="flex items-center gap-2 mt-3">
          <TrendingUp className="w-4 h-4 text-white/60" />
          <p className="text-sm text-white/70">
            총 <span className="font-semibold text-white/90">{count}건</span>의 따뜻한 마음이 모였습니다
          </p>
        </div>
      </div>
    </motion.div>
  );
}