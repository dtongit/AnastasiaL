'use client';

import { useState } from 'react';
import { BureauSectionData } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import ImageUploadField from './ImageUploadField';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface BureauEditorProps {
  initialData: BureauSectionData;
}

export default function BureauEditor({ initialData }: BureauEditorProps) {
  const [data, setData] = useState<BureauSectionData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleParagraphAdd = () => {
    setData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, 'Новый абзац описания...'],
    }));
  };

  const handleParagraphChange = (index: number, value: string) => {
    const nextParas = [...data.paragraphs];
    nextParas[index] = value;
    setData((prev) => ({ ...prev, paragraphs: nextParas }));
  };

  const handleParagraphRemove = (index: number) => {
    setData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('bureau', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Секция О бюро успешно сохранена!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Секция 6: О бюро и авторе
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Фотография Анастасии, имя, должность, вступительные тезисы и биография
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
              Бейдж секции
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
              Главный заголовок секции
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
            Подзаголовок секции
          </label>
          <input
            type="text"
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-sand/30">
          <div className="md:col-span-4">
            <ImageUploadField
              label="Портретное фото автора"
              value={data.image}
              onChange={(url) => setData({ ...data, image: url })}
              folder="bureau"
              aspectHint="Вертикальное ~ 4:5"
            />
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-graphite font-sans">
                  Должность / статус
                </label>
                <input
                  type="text"
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-graphite font-sans">
                  Имя и фамилия
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-graphite font-sans">
                Вступительная фраза
              </label>
              <input
                type="text"
                value={data.subheading}
                onChange={(e) => setData({ ...data, subheading: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs font-medium focus:outline-none focus:border-olive"
              />
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-graphite font-sans">
                  Абзацы текста об авторе
                </label>
                <button
                  type="button"
                  onClick={handleParagraphAdd}
                  className="text-xs text-olive font-medium flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Добавить абзац
                </button>
              </div>

              <div className="space-y-3">
                {data.paragraphs.map((para, pIdx) => (
                  <div key={pIdx} className="flex gap-2">
                    <textarea
                      rows={2}
                      value={para}
                      onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-sand/60 font-sans text-xs text-graphite focus:outline-none focus:border-olive leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => handleParagraphRemove(pIdx)}
                      className="p-2 text-graphite/40 hover:text-red-600 transition-colors self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
