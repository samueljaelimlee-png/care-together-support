import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const MESSAGES = [
  {
    verse: '마태복음 25:40',
    text: '내가 진실로 너희에게 이르노니 너희가 여기 내 형제 중에 지극히 작은 자 하나에게 한 것이 곧 내게 한 것이니라',
    theme: '섬김',
  },
  {
    verse: '갈라디아서 6:2',
    text: '너희가 짐을 서로 지라 그리하여 그리스도의 법을 성취하라',
    theme: '나눔',
  },
  {
    verse: '잠언 19:17',
    text: '가난한 자를 불쌍히 여기는 것은 여호와께 꾸어 드리는 것이니 그의 선행을 그에게 갚아 주시리라',
    theme: '돌봄',
  },
  {
    verse: '고린도전서 13:13',
    text: '그런즉 믿음, 소망, 사랑, 이 세 가지는 항상 있을 것인데 그 중의 제일은 사랑이라',
    theme: '사랑',
  },
  {
    verse: '이사야 58:7',
    text: '또 주린 자에게 네 양식을 나누어 주며 유리하는 빈민을 집에 들이며 헐벗은 자를 보면 입히며 또 네 골육을 피하여 스스로 숨지 아니하는 것이 아니겠느냐',
    theme: '나눔',
  },
  {
    verse: '로마서 12:13',
    text: '성도들의 쓸 것을 공급하며 손 대접하기를 힘쓰라',
    theme: '섬김',
  },
];

const THEME_COLORS = {
  섬김: 'bg-purple-50 text-purple-700 border-purple-200',
  나눔: 'bg-green-50 text-green-700 border-green-200',
  돌봄: 'bg-blue-50 text-blue-700 border-blue-200',
  사랑: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function MessagesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-semibold text-lg">말씀과 함께</h2>
      </div>

      {MESSAGES.map((msg, i) => (
        <div key={i} className="p-4 rounded-2xl border border-border/50 bg-card space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Heart className="w-4 h-4 text-primary/40 flex-shrink-0 mt-0.5" />
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${THEME_COLORS[msg.theme]}`}>
              {msg.theme}
            </span>
          </div>
          <blockquote className="text-base text-foreground leading-relaxed font-medium">
            "{msg.text}"
          </blockquote>
          <p className="text-sm text-primary font-semibold text-right">— {msg.verse}</p>
        </div>
      ))}
    </div>
  );
}