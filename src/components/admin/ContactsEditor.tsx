'use client';

import { useState } from 'react';
import { GlobalContactsData } from '@/types';
import { saveLandingSection } from '@/lib/supabase/queries';
import { Save, CheckCircle2, AlertCircle, Phone, Mail, MessageSquare, Send } from 'lucide-react';

interface ContactsEditorProps {
  initialData: GlobalContactsData;
}

export default function ContactsEditor({ initialData }: ContactsEditorProps) {
  const [data, setData] = useState<GlobalContactsData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveLandingSection('contacts', data);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Контакты и реквизиты успешно сохранены!' });
    } else {
      setFeedback({ type: 'error', message: res.error || 'Ошибка при сохранении' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand/40 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
            Глобальные контакты и реквизиты
          </h2>
          <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
            Номера телефонов, email, ссылки на мессенджеры и подпись в футере
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
        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-olive" />
            Отображаемый телефон
          </label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="+7 929 813-10-13"
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Телефон для ссылки tel: (только цифры и +)
          </label>
          <input
            type="text"
            value={data.phoneRaw}
            onChange={(e) => setData({ ...data, phoneRaw: e.target.value })}
            placeholder="+79298131013"
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-olive" />
            Электронная почта (Email)
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="nastasia.latsinnik@yandex.ru"
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-olive" />
            Ссылка на WhatsApp
          </label>
          <input
            type="text"
            value={data.whatsapp}
            onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
            placeholder="https://wa.me/79298131013"
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-olive" />
            Ссылка на Telegram (необязательно)
          </label>
          <input
            type="text"
            value={data.telegram || ''}
            onChange={(e) => setData({ ...data, telegram: e.target.value })}
            placeholder="https://t.me/..."
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-graphite font-sans">
            Копирайт в подвале сайта
          </label>
          <input
            type="text"
            value={data.copyright}
            onChange={(e) => setData({ ...data, copyright: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive"
          />
        </div>
      </div>
    </div>
  );
}
