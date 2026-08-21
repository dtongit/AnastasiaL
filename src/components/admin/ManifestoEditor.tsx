'use client';

import { useState } from 'react';
import { ManifestoSectionData, ManifestoFeature } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ManifestoEditorProps {
  initialData: ManifestoSectionData;
}

export default function ManifestoEditor({ initialData }: ManifestoEditorProps) {
  const [data, setData] = useState<ManifestoSectionData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleFeatureAdd = () => {
    setData((prev) => ({
      ...prev,
      features: [...prev.features, { title: 'Новый пункт', text: 'Описание принципа' }],
    }));
  };

  const handleFeatureChange = (index: number, field: keyof ManifestoFeature, value: string) => {
    const nextFeatures = [...data.features];
    nextFeatures[index] = { ...nextFeatures[index], [field]: value };
    setData((prev) => ({ ...prev, features: nextFeatures }));
  };

  const handleFeatureRemove = (index: number) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('manifesto', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Секция Манифест успешно сохранена!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Секция 2: Манифест
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Ключевая философия бюро и 3 базовых принципа создания сада
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-graphite font-sans">
              Бейдж / подпись секции
            </label>
            <input
              type="text"
              value={data.badge}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
            />
          </div>

          <div className="space-y-2 md:col-span-3">
            <label className="block text-xs font-medium text-graphite font-sans">
              Главный заголовок манифеста
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Текст манифеста
          </label>
          <textarea
            rows={4}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand/60 font-sans text-sm text-graphite focus:outline-none focus:border-olive leading-relaxed"
          />
        </div>

        {/* Feature columns */}
        <div className="space-y-4 pt-4 border-t border-sand/30">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-graphite font-sans">
              3 ключевых акцента манифеста (колонки)
            </label>
            <button
              type="button"
              onClick={handleFeatureAdd}
              className="text-xs text-olive font-medium flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              Добавить колонку
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.features.map((feature, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-milk-light/60 border border-sand/40 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-olive">Колонка {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleFeatureRemove(idx)}
                    className="text-graphite/40 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Заголовок колонки"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs font-medium focus:outline-none focus:border-olive"
                />
                <textarea
                  rows={2}
                  placeholder="Текст пояснения"
                  value={feature.text}
                  onChange={(e) => handleFeatureChange(idx, 'text', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs focus:outline-none focus:border-olive"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
