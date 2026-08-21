'use client';

import { useState } from 'react';
import { ApproachSectionData, PillarCard } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import ImageUploadField from './ImageUploadField';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ApproachEditorProps {
  initialData: ApproachSectionData;
}

export default function ApproachEditor({ initialData }: ApproachEditorProps) {
  const [data, setData] = useState<ApproachSectionData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handlePillarChange = (index: number, field: keyof PillarCard, value: any) => {
    const nextPillars = [...data.pillars];
    nextPillars[index] = { ...nextPillars[index], [field]: value };
    setData((prev) => ({ ...prev, pillars: nextPillars }));
  };

  const handlePillarAdd = () => {
    const nextNum = String(data.pillars.length + 1).padStart(2, '0');
    setData((prev) => ({
      ...prev,
      pillars: [
        ...prev.pillars,
        {
          id: nextNum,
          num: nextNum,
          title: 'Новый принцип',
          text: 'Описание принципа метода',
          icon: 'Sun',
          bgClass: 'bg-[#FAF8F5]',
          borderClass: 'border-sand/50 hover:border-olive/50',
          iconBg: 'bg-olive/10',
          iconColor: 'text-olive',
          colSpan: 'col-span-12 lg:col-span-4',
        },
      ],
    }));
  };

  const handlePillarRemove = (index: number) => {
    setData((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('approach', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Секция Метод успешно сохранена!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Секция 4: Метод и философия
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Заголовки, главное фото эскиза/ландшафта и карточки столпов метода (Бенто-матрица)
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
              Главный заголовок
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
            Подзаголовок метода
          </label>
          <textarea
            rows={2}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs text-graphite focus:outline-none focus:border-olive"
          />
        </div>

        {/* Big Blueprint Image */}
        <div className="space-y-2">
          <ImageUploadField
            label="Изображение ландшафтного проекта / чертежа"
            value={data.image}
            onChange={(url) => setData({ ...data, image: url })}
            folder="approach"
            aspectHint="Широкоформатный баннер 21:9"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-sand/30">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-graphite font-sans">
              Подзаголовок блока столпов (бейдж)
            </label>
            <input
              type="text"
              value={data.subBadge}
              onChange={(e) => setData({ ...data, subBadge: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-graphite font-sans">
              Заголовок блока столпов
            </label>
            <input
              type="text"
              value={data.subTitle}
              onChange={(e) => setData({ ...data, subTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        {/* Pillars Cards */}
        <div className="space-y-4 pt-4 border-t border-sand/30">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-graphite font-sans">
              Столпы метода (Карточки)
            </label>
            <button
              type="button"
              onClick={handlePillarAdd}
              className="text-xs text-olive font-medium flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              Добавить столп
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.pillars.map((pillar, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-milk-light/60 border border-sand/40 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-olive">№ {pillar.num || idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handlePillarRemove(idx)}
                    className="text-graphite/40 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Название"
                      value={pillar.title}
                      onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-serif text-sm font-medium focus:outline-none focus:border-olive"
                    />
                  </div>
                  <div>
                    <select
                      value={pillar.icon}
                      onChange={(e) => handlePillarChange(idx, 'icon', e.target.value as any)}
                      className="w-full px-2 py-1.5 rounded-lg border border-sand/50 font-sans text-xs focus:outline-none focus:border-olive bg-white"
                    >
                      <option value="Sun">Иконка: Солнце</option>
                      <option value="Leaf">Иконка: Лист</option>
                      <option value="Clock">Иконка: Часы</option>
                      <option value="Layers">Иконка: Слои</option>
                      <option value="ShieldCheck">Иконка: Щит/Уход</option>
                    </select>
                  </div>
                </div>
                <textarea
                  rows={3}
                  placeholder="Текст описания принципа"
                  value={pillar.text}
                  onChange={(e) => handlePillarChange(idx, 'text', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs focus:outline-none focus:border-olive leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
