import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import DonationTotal from '../components/home/DonationTotal';
import QuickActions from '../components/home/QuickActions';

export default function Home() {
  const { data: donations = [] } = useQuery({
    queryKey: ['donations-total'],
    queryFn: () => base44.entities.Donation.filter({ status: 'confirmed' }),
    initialData: [],
  });

  const total = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16 space-y-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
          <Heart className="w-3.5 h-3.5 fill-primary/40" />
          함께돌봄
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          CareTogether
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          따뜻한 마음으로 함께하는 돌봄 커뮤니티
        </p>
      </motion.div>

      {/* Donation Total */}
      <DonationTotal total={total} count={donations.length} />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}