import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const MESSAGES = [
  {
    id: 1,
    verse: '야고보서 5:14–16',
    lines: [
      { num: 14, text: '너희 중에 병든 자가 있거든, 그는 교회의 장로들을 청할 것이요,\n그들은 주의 이름으로 기름을 바르며 위하여 기도할지니라.' },
      { num: 15, text: '믿음의 기도는 병든 자를 구원하리니, 주께서 그를 일으키시리라.\n혹시 죄를 범하였을지라도 사함을 얻으리라.' },
      { num: 16, text: '이러므로 너희 죄를 서로 고백하며 병 낫기를 위하여 서로 기도하라.\n의인의 간구는 역사하는 힘이 많으니라.' },
    ],
  },
  {
    id: 2,
    verse: '마태복음 25:36, 40',
    lines: [
      { num: 36, text: '벌거벗었을 때에 옷 입히고, 병들었을 때에 돌아보았고,\n옥에 갇혔을 때에 와서 보았습니다.' },
      { num: 40, text: '임금이 대답하여 가라사대,\n내가 진실로 너희에게 이르노니\n너희가 여기 내 형제 중에 지극히 작은 자 하나에게 한 것이\n곧 내게 한 것이니라 하시고' },
    ],
  },
  {
    id: 3,
    verse: '갈라디아서 6:2, 10',
    lines: [
      { num: 2, text: '너희가 서로 짐을 지라.\n그리하여 그리스도의 법을 성취하라.' },
      { num: 10, text: '그러면 우리는 기회 있는 대로 모든 이에게 착한 일을 하되\n더욱 믿음의 가정들에게 할지니라.' },
    ],
  },
  {
    id: 4,
    verse: '로마서 12:8, 15',
    lines: [
      { num: 8, text: '긍휼을 베푸는 자는 즐거움으로 할지니라.' },
      { num: 15, text: '즐거워하는 자들과 함께 즐거워하고,\n우는 자들과 함께 울라.' },
    ],
  },
  {
    id: 5,
    verse: '데살로니가전서 5:14',
    lines: [
      { num: 14, text: '또 형제들아 너희를 권면하노니,\n규모 없는 자들을 권계하며\n마음이 약한 자들을 안위하고,\n힘이 없는 자들을 붙들어 주며,\n모든 사람을 대하여 오래 참으라.' },
    ],
  },
  {
    id: 6,
    verse: '누가복음 10:33–35',
    subtitle: '착한 사마리아인',
    lines: [
      { num: 33, text: '어떤 사마리아인은 여행하는 중 거기 이르러 그를 보고 불쌍히 여겨' },
      { num: 34, text: '가까이 가서 기름과 포도주를 그 상처에 붓고 싸매고 자기 짐승에 태워 주막으로 데리고 가서 돌보아 주고' },
      { num: 35, text: '이튿날에 데나리온 둘을 내어 주막 주인에게 주며 이르되 이 사람을 돌보아 주라 비용이 더 들면\n내가 돌아올 때에 갚으리라 하였으니' },
    ],
  },
  {
    id: 7,
    verse: '요한일서 3:17–18',
    lines: [
      { num: 17, text: '누가 이 세상 재물을 가지고 형제의 궁핍함을 보고도\n도와줄 마음을 막으면\n하나님의 사랑이 어찌 그 속에 거하겠느냐.' },
      { num: 18, text: '자녀들아, 우리가 말과 혀로만 사랑하지 말고\n오직 행함과 진실함으로 하자.' },
    ],
  },
];

export default function MessagesTab() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <BookOpen className="w-7 h-7 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">말씀과 함께</h1>
        <p className="text-sm text-muted-foreground">함께돌봄의 마음을 담은 성경 말씀</p>
      </div>

      {/* Verses */}
      {MESSAGES.map((msg) => (
        <div key={msg.id} className="bg-card rounded-2xl border border-border/50 p-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground w-5 flex-shrink-0 pt-0.5">{msg.id}</span>
            <div>
              <h3 className="font-heading font-semibold text-base text-foreground">{msg.verse}</h3>
              {msg.subtitle && <p className="text-xs text-muted-foreground mt-0.5">{msg.subtitle}</p>}
            </div>
          </div>
          <div className="space-y-2 pl-8">
            {msg.lines.map((line) => (
              <p key={line.num} className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                <span className="text-primary font-semibold mr-1.5">{line.num}</span>
                {line.text}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="text-center pt-4 pb-2 space-y-1">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
          <Heart className="w-4 h-4 text-primary fill-primary/30" />
          말씀 위에 세워진 섬김
        </p>
        <p className="text-xs text-muted-foreground">함께하는 따뜻한 마음 💜</p>
      </div>
    </div>
  );
}