import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, HandHeart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  {
    to: '/calendar',
    icon: Calendar,
    title: '봉사 캘린더',
    desc: '빨래·식사 봉사 일정을 확인하고 신청하세요',
    gradient: 'from-blue-50 to-indigo-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    to: '/donate',
    icon: HandHeart,
    title: '모금 신청',
    desc: '따뜻한 마음을 전해주세요',
    gradient: 'from-rose-50 to-pink-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map(({ to, icon: Icon, title, desc, gradient, iconBg, iconColor }, i) => (
        <motion.div
          key={to}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
        >
          <Link
            to={to}
            className={`group block rounded-2xl bg-gradient-to-br ${gradient} border border-border/30 p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}