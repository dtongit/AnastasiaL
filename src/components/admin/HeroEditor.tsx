'use client';

import { useState } from 'react';
import { HeroSectionData } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import ImageUploadField from './ImageUploadField';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface HeroEditorProps {
  initialData: HeroSectionData;
}

export default function HeroEditor({ initialData }: HeroEditorProps) {
  const [data, setData] = useState<HeroSectionData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleBadgeAdd = () => {
    setData((prev) => ({ ...prev, badges: [...prev.badges, 'Новый тег'] }));
  };

  const handleBadgeChange = (index: number, value: string) => {
    const nextBadges = [...data.badges];
    nextBadges[index] = value;
    setData((prev) => ({ ...prev, badges: nextBadges }));
  };

  const handleBadgeRemove = (index: number) => {
    setData((prev) => ({ ...prev, badges: prev.badges.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('hero', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Секция Hero успешно сохранена!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Секция 1: Главный экран (Hero)
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Настройте главный заголовок, подзаголовок, кнопки действий, теги и фоновое изображение
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-full bg-olive text-milk font-sans text-xs font-semibold hover:bg-olive/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-sans ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Title Line 1 */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Заголовок: Строка 1
          </label>
          <input
            type="text"
            value={data.titleLine1}
            onChange={(e) => setData({ ...data, titleLine1: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
          />
        </div>

        {/* Title Line 2 */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Заголовок: Строка 2
          </label>
          <input
            type="text"
            value={data.titleLine2}
            onChange={(e) => setData({ ...data, titleLine2: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Подзаголовок (описание позиционирования)
          </label>
          <textarea
            rows={3}
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand/60 font-sans text-sm text-graphite focus:outline-none focus:border-olive leading-relaxed"
          />
        </div>

        {/* Primary button */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Главная кнопка: Текст
          </label>
          <input
            type="text"
            value={data.primaryBtnText}
            onChange={(e) => setData({ ...data, primaryBtnText: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Главная кнопка: Ссылка (якорь или URL)
          </label>
          <input
            type="text"
            value={data.primaryBtnLink}
            onChange={(e) => setData({ ...data, primaryBtnLink: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        {/* Secondary button */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Вторая кнопка: Текст
          </label>
          <input
            type="text"
            value={data.secondaryBtnText}
            onChange={(e) => setData({ ...data, secondaryBtnText: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Вторая кнопка: Ссылка
          </label>
          <input
            type="text"
            value={data.secondaryBtnLink}
            onChange={(e) => setData({ ...data, secondaryBtnLink: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        {/* Background Image */}
        <div className="space-y-2 md:col-span-2">
          <ImageUploadField
            label="Фоновое изображение Hero"
            value={data.bgImage}
            onChange={(url) => setData({ ...data, bgImage: url })}
            folder="hero"
            aspectHint="Рекомендуется горизонтальное 16:9 или 21:9"
          />
        </div>

        {/* Badges list */}
        <div className="space-y-3 md:col-span-2 pt-4 border-t border-sand/30">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-graphite font-sans">
              Теги / ключевые этапы внизу Hero
            </label>
            <button
              type="button"
              onClick={handleBadgeAdd}
              className="text-xs text-olive font-medium flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              Добавить тег
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => handleBadgeChange(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
                />
                <button
                  type="button"
                  onClick={() => handleBadgeRemove(idx)}
                  className="p-1.5 text-graphite/40 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
