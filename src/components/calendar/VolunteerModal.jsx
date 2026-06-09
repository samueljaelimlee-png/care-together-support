import React, { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import VolunteerSignupForm from './VolunteerSignupForm';
import VolunteerEditModal from './VolunteerEditModal';

function formatTimeSlot(slot) {
  if (!slot) return '';
  const [start, end] = slot.split('-');
  const fmt = (t) => {
    const [h, m] = t.split(':').map(Number);
    const ampm = h < 12 ? '오전' : '오후';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${ampm} ${h12}:${String(m).padStart(2, '0')}`;
  };
  return `${fmt(start)} - ${fmt(end)}`;
}

const TYPE_LABELS = {
  laundry: { label: '빨래', emoji: '🧺', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  meal: { label: '식사봉사', emoji: '🍽️', color: 'bg-amber-100 text-amber-700 border-amber-200' },
};

export default function VolunteerModal({ open, onClose, date, schedules = [], onSubmit, onEdit, onDelete }) {
  const [selectedTypes, setSelectedTypes] = useState([]); // [] | ['laundry'] | ['meal'] | ['laundry','meal']
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  if (!date) return null;

  const dateStr = format(date, 'yyyy-MM-dd');
  const daySchedules = schedules.filter(s => s.date === dateStr);

  const handleClose = () => {
    setSelectedTypes([]);
    setShowForm(false);
    onClose();
  };

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSignupSubmit = async (data, memos = {}) => {
    for (const type of selectedTypes) {
      await onSubmit({ ...data, type, date: dateStr, memo: memos[type] || '' });
    }
    setSelectedTypes([]);
    setShowForm(false);
  };

  return (
    <>
      <Dialog open={open && !editTarget} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-center text-base">
              {format(date, 'yyyy년 M월 d일 (EEEE)', { locale: ko })}
            </DialogTitle>
          </DialogHeader>

          {showForm ? (
            <VolunteerSignupForm
              types={selectedTypes}
              onSubmit={handleSignupSubmit}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <div className="space-y-5 mt-1">
              {/* 배정된 봉사 */}
              {daySchedules.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">배정된 봉사</p>
                  <div className="space-y-2">
                    {daySchedules.map((s) => {
                      const t = TYPE_LABELS[s.type] || { label: s.type, emoji: '', color: '' };
                      return (
                        <div key={s.id} className="border rounded-xl p-3 bg-card relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${t.color}`}>
                              {t.emoji} {t.label}
                            </span>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditTarget(s)}
                                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onDelete(s.id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2 text-foreground">
                              <span className="text-muted-foreground text-base">👤</span>
                              <span className="font-medium">{s.volunteer_name}</span>
                            </div>
                            {s.time_slot && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="text-base">🕐</span>
                                <span>{formatTimeSlot(s.time_slot)}</span>
                              </div>
                            )}
                            {s.memo && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="text-base">💬</span>
                                <span>{s.memo}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 신청 가능한 봉사 — 멀티 선택 */}
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">봉사 선택 (중복 신청 가능)</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'laundry', emoji: '🧺', label: '빨래' },
                    { type: 'meal', emoji: '🍽️', label: '식사봉사' },
                  ].map(({ type, emoji, label }) => {
                    const selected = selectedTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-5 text-sm font-medium transition-all ${
                          selected
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <span className="text-2xl">{emoji}</span>
                        <span>{label}</span>
                        <span className="text-lg leading-none">{selected ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedTypes.length > 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  신청하기 ({selectedTypes.map(t => TYPE_LABELS[t]?.label).join(' + ')})
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit modal */}
      <VolunteerEditModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        schedule={editTarget}
        onSave={(id, data) => {
          onEdit(id, data);
          setEditTarget(null);
        }}
      />
    </>
  );
}