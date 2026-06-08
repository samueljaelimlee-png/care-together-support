import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Smartphone, Heart, Calendar, HandHeart, MessageSquare, ChevronDown, ChevronUp, Download, Share } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Section = ({ icon: Icon, iconBg, iconColor, title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <span className="font-heading font-semibold text-base text-foreground">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <CardContent className="pt-0 pb-5 px-5">{children}</CardContent>}
    </Card>
  );
};

const Step = ({ num, text }) => (
  <div className="flex items-start gap-3 py-2">
    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
      {num}
    </div>
    <p className="text-sm text-foreground leading-relaxed">{text}</p>
  </div>
);

const MenuItem = ({ icon: Icon, iconBg, iconColor, label, desc }) => (
  <div className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
    <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div>
      <p className="font-semibold text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function GuidePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-10 md:py-16 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">이용 안내</h1>
        <p className="text-muted-foreground text-sm">처음 오신 분들을 위한 사용 가이드입니다</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">

        {/* 앱 설치 방법 */}
        <Section icon={Smartphone} iconBg="bg-blue-50" iconColor="text-blue-600" title="📱 폰 화면에 앱 설치하기">
          <div className="space-y-4">
            {/* iOS */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-foreground">🍎 아이폰 (iPhone / Safari)</span>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 space-y-1">
                <Step num="1" text="Safari 브라우저로 이 앱 주소를 열어주세요." />
                <Step num="2" text="하단 가운데 공유 버튼(□↑)을 탭하세요." />
                <Step num="3" text="스크롤을 내려 '홈 화면에 추가'를 탭하세요." />
                <Step num="4" text="오른쪽 위 '추가'를 탭하면 완료!" />
              </div>
            </div>
            {/* Android */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-foreground">🤖 안드로이드 (Chrome 브라우저)</span>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 space-y-1">
                <Step num="1" text="Chrome 브라우저로 이 앱 주소를 열어주세요." />
                <Step num="2" text="오른쪽 위 점 세 개(⋮) 메뉴를 탭하세요." />
                <Step num="3" text="'앱 설치' 또는 '홈 화면에 추가'를 탭하세요." />
                <Step num="4" text="'설치'를 탭하면 완료!" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground bg-amber-50 rounded-xl p-3">
              💡 설치 후에는 마치 일반 앱처럼 홈 화면 아이콘을 탭해서 바로 열 수 있어요!
            </p>
          </div>
        </Section>

        {/* 메뉴 설명 */}
        <Section icon={Heart} iconBg="bg-primary/10" iconColor="text-primary" title="🗂️ 메뉴 안내">
          <div>
            <MenuItem
              icon={Heart}
              iconBg="bg-primary/10"
              iconColor="text-primary"
              label="홈"
              desc="함께돌봄 전체 현황을 한눈에 볼 수 있어요. 모금 총액, 빠른 메뉴, 오늘의 말씀이 있습니다."
            />
            <MenuItem
              icon={Calendar}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              label="봉사 캘린더"
              desc="빨래·식사 봉사 일정을 캘린더로 확인하고 신청할 수 있어요. 내 봉사 일정도 여기서 관리할 수 있습니다."
            />
            <MenuItem
              icon={HandHeart}
              iconBg="bg-rose-50"
              iconColor="text-rose-500"
              label="모금 신청"
              desc="함께돌봄을 위한 모금을 신청하는 페이지입니다. Venmo 또는 Cash로 전달 방법을 선택할 수 있어요."
            />
            <MenuItem
              icon={MessageSquare}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
              label="말씀"
              desc="함께돌봄을 격려하는 성경 말씀 모음입니다. 봉사하며 힘이 필요할 때 읽어보세요."
            />
          </div>
        </Section>

        {/* 봉사 신청 방법 */}
        <Section icon={Calendar} iconBg="bg-blue-50" iconColor="text-blue-600" title="🙋 봉사 신청하는 방법">
          <div className="bg-muted/50 rounded-xl p-3 space-y-1">
            <Step num="1" text="상단 메뉴에서 '봉사 캘린더'를 탭하세요." />
            <Step num="2" text="달력에서 봉사하고 싶은 날짜를 탭하세요." />
            <Step num="3" text="빨래 봉사 또는 식사 봉사 중 원하는 종류를 선택하세요." />
            <Step num="4" text="시간대를 선택하고 이름, 연락처를 입력 후 신청 완료!" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 bg-green-50 rounded-xl p-3">
            ✅ '내 봉사 일정' 탭에서 내가 신청한 봉사를 확인하고 수정·취소할 수 있어요.
          </p>
        </Section>

        {/* 모금 신청 방법 */}
        <Section icon={HandHeart} iconBg="bg-rose-50" iconColor="text-rose-500" title="💝 모금 신청하는 방법">
          <div className="bg-muted/50 rounded-xl p-3 space-y-1">
            <Step num="1" text="상단 메뉴에서 '모금 신청'을 탭하세요." />
            <Step num="2" text="이름, 전화번호, 이메일을 입력하세요." />
            <Step num="3" text="금액을 선택하거나 직접 입력하세요." />
            <Step num="4" text="전달 방법(Venmo / Cash)을 선택하세요." />
            <Step num="5" text="응원 메시지를 남기고 '모금 신청하기' 버튼을 탭하세요." />
          </div>
          <p className="text-xs text-muted-foreground mt-3 bg-amber-50 rounded-xl p-3">
            💡 신청 후 관리자 확인이 완료되면 모금 현황에 반영됩니다.
          </p>
        </Section>

      </motion.div>

      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">문의사항이 있으시면 관리자에게 연락주세요 🙏</p>
      </div>
    </div>
  );
}