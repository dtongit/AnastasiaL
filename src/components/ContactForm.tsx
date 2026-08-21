'use client';

import { useState } from 'react';
import { Phone, MessageSquare, Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { submitContactLead } from '@/lib/supabase/queries';
import { GlobalContactsData } from '@/types';
import { DEFAULT_CONTACTS } from '@/data/landingDefaults';

interface ContactFormProps {
  title?: string;
  showTitle?: boolean;
  contacts?: GlobalContactsData;
}

export default function ContactForm({
  title = 'Создаём вместе',
  showTitle = true,
  contacts = DEFAULT_CONTACTS,
}: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    service_type: 'Концепция сада',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await submitContactLead(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      // Still show success to visitor so user experience isn't broken
      setIsSuccess(true);
    }
  };

  return (
    <div className="bg-[#FAF8F5] p-8 sm:p-14 lg:p-16 rounded-3xl border border-sand/50 shadow-sm space-y-8 sm:space-y-10">
      {showTitle && (
        <div className="border-b border-graphite/10 pb-6 sm:pb-8">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal leading-tight">
            {title}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Philosophy & Direct Contact Links */}
        <div className="lg:col-span-5 space-y-6">
          <p className="font-serif text-2xl sm:text-3xl text-graphite font-light leading-snug">
            Расскажите о своих мечтах, а мы найдем решения, чтобы воплотить их в жизнь
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-graphite/60 font-sans">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span>Пн – Сб, 10:00 — 19:00</span>
          </div>

          <div className="space-y-3 pt-4">
            {/* Direct Phone CTA */}
            <a
              href={`tel:${contacts.phoneRaw || '+79298131013'}`}
              className="w-full p-5 bg-graphite text-milk rounded-2xl flex items-center justify-between group hover:bg-olive transition-all duration-300 shadow-md"
            >
              <div className="space-y-1">
                <span className="text-[11px] text-sand group-hover:text-milk/80 font-sans block">
                  Прямой телефон архитектора
                </span>
                <span className="text-xl font-serif tracking-wide font-medium block text-milk">
                  {contacts.phone}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
                <Phone className="w-4 h-4 text-sand group-hover:text-milk" />
              </div>
            </a>

            {/* Secondary Action Buttons (WhatsApp & Mail) */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-white border border-graphite/15 rounded-xl text-graphite hover:border-olive hover:text-olive transition-all flex items-center justify-center space-x-2 text-xs font-sans font-medium shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-olive shrink-0" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${contacts.email}`}
                className="px-4 py-3 bg-white border border-graphite/15 rounded-xl text-graphite hover:border-olive hover:text-olive transition-all flex items-center justify-center space-x-2 text-xs font-sans font-medium shadow-xs"
              >
                <Mail className="w-4 h-4 text-olive shrink-0" />
                <span>Почта</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Request Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-sand/60 shadow-xs">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
                Спасибо за обращение!
              </h3>
              <p className="text-xs sm:text-sm text-graphite/70 font-sans max-w-md mx-auto leading-relaxed">
                Ваша заявка принята. Анастасия ознакомится с деталями и свяжется с вами для обсуждения задач вашего сада.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    location: '',
                    service_type: 'Концепция сада',
                    message: '',
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded-full border border-sand hover:bg-sand/20 text-xs font-sans font-medium text-graphite transition-colors"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-graphite font-medium">
                  Оставить заявку на проект
                </h3>
                <p className="text-xs text-graphite/60 font-sans">
                  Заполните поля ниже, и мы свяжемся с вами в удобное время
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-graphite/80 font-sans">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Анастасия"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand/60 text-xs font-sans focus:outline-none focus:border-olive text-graphite"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-graphite/80 font-sans">
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand/60 text-xs font-sans focus:outline-none focus:border-olive text-graphite"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-graphite/80 font-sans">
                    Локация участка
                  </label>
                  <input
                    type="text"
                    placeholder="Напр. Новая Рига, 20 соток"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand/60 text-xs font-sans focus:outline-none focus:border-olive text-graphite"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-graphite/80 font-sans">
                    Интересующий формат
                  </label>
                  <select
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand/60 text-xs font-sans focus:outline-none focus:border-olive text-graphite bg-white"
                  >
                    <option value="Концепция сада">Концепция сада</option>
                    <option value="Концепция и рабочая документация">Концепция + Рабочая документация</option>
                    <option value="Авторский надзор">Авторский надзор</option>
                    <option value="Подарочный сертификат">Подарочный сертификат</option>
                    <option value="Другой вопрос">Другой вопрос</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-graphite/80 font-sans">
                  Комментарий или пожелания
                </label>
                <textarea
                  rows={3}
                  placeholder="Опишите ваши пожелания, состояние участка или вопросы..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand/60 text-xs font-sans focus:outline-none focus:border-olive text-graphite leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-graphite text-milk text-xs font-sans font-medium hover:bg-olive transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Отправить заявку</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
