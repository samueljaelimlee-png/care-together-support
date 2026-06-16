import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Heart, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DonationTotal from '../components/home/DonationTotal';
import QuickActions from '../components/home/QuickActions';
import UpcomingVolunteers from '../components/home/UpcomingVolunteers';

const FEATURED_VERSE = {
  verse: '갈라디아서 6:2',
  text: '너희가 서로 짐을 지라.\n그리하여 그리스도의 법을 성취하라.',
};

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then((user) => {
      if (user?.role === 'admin') setIsAdmin(true);
    }).catch(() => {});
  }, []);

  const { data: donations = [] } = useQuery({
    queryKey: ['donations-total'],
    queryFn: () => base44.entities.Donation.filter({ status: 'confirmed' }),
    initialData: [],
  });

  const { data: rounds = [] } = useQuery({
    queryKey: ['fundraising-round-home'],
    queryFn: () => base44.entities.FundraisingRound.list('-created_date'),
    initialData: [],
  });

  const currentRound = rounds[0];
  const isActive = currentRound?.active !== false;
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

      {/* New User Guide Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link to="/guide">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5 hover:bg-amber-100 transition-colors group">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">처음 오셨나요? 👋</p>
              <p className="text-xs text-amber-700 mt-0.5">
                오른쪽 위 <span className="font-bold">☰ 메뉴 → 이용 안내</span>를 먼저 확인해 보세요!
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </Link>
      </motion.div>

      {/* Upcoming Volunteers Calendar */}
      <UpcomingVolunteers />

      {/* Quick Actions */}
      <QuickActions />

      {/* Donation Total (마감 안내) */}
      <DonationTotal total={total} count={donations.length} closed={!isActive} message={currentRound?.message} />

      {/* Featured Verse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link to="/messages" className="block group">
          <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20 hover:bg-primary/15 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-semibold">말씀</span>
              </div>
              <ChevronRight className="w-4 h-4 text-primary/60 group-hover:translate-x-1 transition-transform" />
            </div>
            <blockquote className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line font-medium mb-2">
              "{FEATURED_VERSE.text}"
            </blockquote>
            <p className="text-xs text-primary/70 font-semibold">{FEATURED_VERSE.verse}</p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}