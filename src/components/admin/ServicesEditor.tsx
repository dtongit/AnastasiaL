'use client';

import { useState } from 'react';
import { ServicesSectionData, Service, ChecklistItem } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle, Check } from 'lucide-react';

interface ServicesEditorProps {
  initialData: ServicesSectionData;
}

export default function ServicesEditor({ initialData }: ServicesEditorProps) {
  const [data, setData] = useState<ServicesSectionData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleServiceChange = (index: number, field: keyof Service, value: any) => {
    const nextServices = [...data.services];
    nextServices[index] = { ...nextServices[index], [field]: value };
    setData((prev) => ({ ...prev, services: nextServices }));
  };

  const handleIncludedItemAdd = (serviceIndex: number) => {
    const nextServices = [...data.services];
    nextServices[serviceIndex].included = [
      ...nextServices[serviceIndex].included,
      'Новый пункт состава',
    ];
    setData((prev) => ({ ...prev, services: nextServices }));
  };

  const handleIncludedItemChange = (serviceIndex: number, itemIndex: number, value: string) => {
    const nextServices = [...data.services];
    const nextIncluded = [...nextServices[serviceIndex].included];
    nextIncluded[itemIndex] = value;
    nextServices[serviceIndex].included = nextIncluded;
    setData((prev) => ({ ...prev, services: nextServices }));
  };

  const handleIncludedItemRemove = (serviceIndex: number, itemIndex: number) => {
    const nextServices = [...data.services];
    nextServices[serviceIndex].included = nextServices[serviceIndex].included.filter(
      (_, i) => i !== itemIndex
    );
    setData((prev) => ({ ...prev, services: nextServices }));
  };

  const handleChecklistChange = (index: number, field: keyof ChecklistItem, value: string) => {
    const nextChecklist = [...data.checklist];
    nextChecklist[index] = { ...nextChecklist[index], [field]: value };
    setData((prev) => ({ ...prev, checklist: nextChecklist }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('services', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Секция Услуги успешно сохранена!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Секция 5: Форматы работы и услуги
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            3 основных пакета проектирования, состав работ, итоговые результаты и чек-лист подготовки
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
              Главный заголовок услуг
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
            />
          </div>
        </div>

        {/* 3 Main Service Packages */}
        <div className="space-y-6 pt-4 border-t border-sand/30">
          <h3 className="font-serif text-xl text-graphite font-medium">3 Основных формата работы</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data.services.map((svc, sIdx) => (
              <div
                key={svc.slug || sIdx}
                className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between ${
                  sIdx === 1
                    ? 'bg-graphite/5 border-ochre/60'
                    : 'bg-milk-light/70 border-sand/50'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-olive">Формат 0{sIdx + 1}</span>
                    {sIdx === 1 && (
                      <span className="px-2 py-0.5 rounded-full bg-ochre/20 text-ochre text-[10px] font-sans font-medium">
                        Флагман
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                      Название пакета
                    </label>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => handleServiceChange(sIdx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-serif text-base font-medium focus:outline-none focus:border-olive"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                      Краткое описание
                    </label>
                    <textarea
                      rows={2}
                      value={svc.shortDescription}
                      onChange={(e) =>
                        handleServiceChange(sIdx, 'shortDescription', e.target.value)
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs focus:outline-none focus:border-olive"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                        Что входит в пакет:
                      </label>
                      <button
                        type="button"
                        onClick={() => handleIncludedItemAdd(sIdx)}
                        className="text-[11px] text-olive hover:underline flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Добавить
                      </button>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {svc.included.map((inc, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-olive shrink-0" />
                          <input
                            type="text"
                            value={inc}
                            onChange={(e) =>
                              handleIncludedItemChange(sIdx, iIdx, e.target.value)
                            }
                            className="flex-1 px-2 py-1 rounded border border-sand/40 text-[11px] font-sans focus:outline-none focus:border-olive"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncludedItemRemove(sIdx, iIdx)}
                            className="text-graphite/30 hover:text-red-600 p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-sand/30">
                  <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                    Итоговый результат
                  </label>
                  <textarea
                    rows={2}
                    value={svc.result}
                    onChange={(e) => handleServiceChange(sIdx, 'result', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs focus:outline-none focus:border-olive"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Checklist Strip */}
        <div className="space-y-4 pt-6 border-t border-sand/30">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-graphite font-sans">
              Заголовок чек-листа подготовки
            </label>
            <input
              type="text"
              value={data.checklistTitle}
              onChange={(e) => setData({ ...data, checklistTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-sand/60 font-serif text-lg text-graphite focus:outline-none focus:border-olive"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.checklist.map((item, cIdx) => (
              <div key={cIdx} className="p-4 rounded-2xl bg-milk-light/60 border border-sand/40 space-y-2">
                <span className="text-xs font-mono font-bold text-sand-dark">Шаг 0{cIdx + 1}</span>
                <input
                  type="text"
                  placeholder="Заголовок шага"
                  value={item.title}
                  onChange={(e) => handleChecklistChange(cIdx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs font-medium focus:outline-none focus:border-olive"
                />
                <textarea
                  rows={3}
                  placeholder="Описание"
                  value={item.text}
                  onChange={(e) => handleChecklistChange(cIdx, 'text', e.target.value)}
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
