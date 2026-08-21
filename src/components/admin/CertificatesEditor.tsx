'use client';

import { useState } from 'react';
import { CertificatesSectionData, CertificateVoucher } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import ImageUploadField from './ImageUploadField';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface CertificatesEditorProps {
  initialData: CertificatesSectionData;
}

export default function CertificatesEditor({ initialData }: CertificatesEditorProps) {
  const [data, setData] = useState<CertificatesSectionData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleVoucherChange = (index: number, field: keyof CertificateVoucher, value: any) => {
    const nextVouchers = [...data.vouchers];
    nextVouchers[index] = { ...nextVouchers[index], [field]: value };
    setData((prev) => ({ ...prev, vouchers: nextVouchers }));
  };

  const handleVoucherItemAdd = (voucherIndex: number) => {
    const nextVouchers = [...data.vouchers];
    nextVouchers[voucherIndex].items = [
      ...nextVouchers[voucherIndex].items,
      'Новый пункт состава сертификата',
    ];
    setData((prev) => ({ ...prev, vouchers: nextVouchers }));
  };

  const handleVoucherItemChange = (vIdx: number, itemIdx: number, value: string) => {
    const nextVouchers = [...data.vouchers];
    const nextItems = [...nextVouchers[vIdx].items];
    nextItems[itemIdx] = value;
    nextVouchers[vIdx].items = nextItems;
    setData((prev) => ({ ...prev, vouchers: nextVouchers }));
  };

  const handleVoucherItemRemove = (vIdx: number, itemIdx: number) => {
    const nextVouchers = [...data.vouchers];
    nextVouchers[vIdx].items = nextVouchers[vIdx].items.filter((_, i) => i !== itemIdx);
    setData((prev) => ({ ...prev, vouchers: nextVouchers }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('certificates', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Секция Сертификаты успешно сохранена!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Секция 7: Подарочные сертификаты
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Фотография сертификата, описание подарка и форматы (Цветник / Сад)
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
            Описание ценности подарка
          </label>
          <textarea
            rows={2}
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs text-graphite focus:outline-none focus:border-olive leading-relaxed"
          />
        </div>

        {/* Certificate Showcase Photo */}
        <div className="space-y-2">
          <ImageUploadField
            label="Изображение подарочного сертификата в тубусе/боксе"
            value={data.image}
            onChange={(url) => setData({ ...data, image: url })}
            folder="certificates"
            aspectHint="Широкоформатный баннер 21:9"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Подзаголовок блоков форматов
          </label>
          <input
            type="text"
            value={data.subTitle}
            onChange={(e) => setData({ ...data, subTitle: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-serif text-base text-graphite focus:outline-none focus:border-olive"
          />
        </div>

        {/* Vouchers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-sand/30">
          {data.vouchers.map((v, vIdx) => (
            <div
              key={v.id || vIdx}
              className={`p-6 rounded-3xl border space-y-4 ${
                v.variant === 'dark' ? 'bg-graphite/5 border-ochre/50' : 'bg-milk-light/70 border-sand/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-olive">Вариант 0{vIdx + 1}</span>
                <span className="text-[11px] text-graphite/50 font-sans">
                  {v.variant === 'dark' ? 'Темная карточка (Премиум)' : 'Светлая карточка'}
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                  Название сертификата
                </label>
                <input
                  type="text"
                  value={v.title}
                  onChange={(e) => handleVoucherChange(vIdx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-serif text-base font-medium focus:outline-none focus:border-olive"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                  Краткое описание
                </label>
                <textarea
                  rows={2}
                  value={v.description}
                  onChange={(e) => handleVoucherChange(vIdx, 'description', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs focus:outline-none focus:border-olive"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                    Что входит в сертификат:
                  </label>
                  <button
                    type="button"
                    onClick={() => handleVoucherItemAdd(vIdx)}
                    className="text-[11px] text-olive hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" /> Добавить пункт
                  </button>
                </div>

                <div className="space-y-2">
                  {v.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleVoucherItemChange(vIdx, iIdx, e.target.value)}
                        className="flex-1 px-2 py-1 rounded border border-sand/40 text-[11px] font-sans focus:outline-none focus:border-olive"
                      />
                      <button
                        type="button"
                        onClick={() => handleVoucherItemRemove(vIdx, iIdx)}
                        className="text-graphite/30 hover:text-red-600 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-sand/30">
                <label className="block text-[11px] font-medium text-graphite/70 font-sans">
                  Упаковка и оформление
                </label>
                <input
                  type="text"
                  value={v.deliveryNote}
                  onChange={(e) => handleVoucherChange(vIdx, 'deliveryNote', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-sand/50 font-sans text-xs focus:outline-none focus:border-olive"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
