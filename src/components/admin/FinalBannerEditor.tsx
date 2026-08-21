'use client';

import { useState } from 'react';
import { FinalBannerSectionData } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import ImageUploadField from './ImageUploadField';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface FinalBannerEditorProps {
  initialData: FinalBannerSectionData;
}

export default function FinalBannerEditor({ initialData }: FinalBannerEditorProps) {
  const [data, setData] = useState<FinalBannerSectionData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('finalBanner', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Финальный баннер успешно сохранен!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Секция 10: Финальный атмосферный баннер
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Крупный слоган внизу страницы и полноэкранная фоновая фотография
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

      <div className="space-y-6 pt-2">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Главный слоган баннера
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand/60 font-serif text-xl text-graphite focus:outline-none focus:border-olive"
          />
        </div>

        <div className="space-y-2">
          <ImageUploadField
            label="Фоновое изображение атмосферного баннера"
            value={data.bgImage}
            onChange={(url) => setData({ ...data, bgImage: url })}
            folder="banner"
            aspectHint="Рекомендуется широкоформатное 21:9 или 16:9"
          />
        </div>
      </div>
    </div>
  );
}
