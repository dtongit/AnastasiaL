'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  title?: string;
  showTitle?: boolean;
}

export default function ContactForm({ title = 'Создаём вместе', showTitle = true }: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contactMethod: 'phone', // phone | whatsapp | email
    region: '',
    plotArea: '',
    projectStage: ' строю дом',
    requestedFormat: 'концепция сада',
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMessage('Пожалуйста, подтвердите согласие на обработку персональных данных.');
      return;
    }
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя и телефон.');
      return;
    }

    setErrorMessage('');
    setStatus('loading');

    // Simulate submission / dispatch event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'contact_form_submit', {
        format: formData.requestedFormat,
        stage: formData.projectStage,
      });
    }

    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  return (
    <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-2xl border border-sand/40 shadow-sm">
      {status === 'success' ? (
        <div className="py-12 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-olive/10 text-olive rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="font-serif text-3xl text-graphite">Спасибо за обращение!</h3>
          <p className="text-graphite/70 max-w-md mx-auto text-sm font-sans leading-relaxed">
            Сообщение получено — мы свяжемся с вами удобным способом в ближайшее время для уточнения деталей.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setFormData({
                name: '',
                phone: '',
                contactMethod: 'phone',
                region: '',
                plotArea: '',
                projectStage: 'строю дом',
                requestedFormat: 'концепция сада',
                message: '',
                consent: false,
              });
            }}
            className="px-6 py-2.5 rounded-full border border-graphite/30 text-graphite text-xs font-sans font-medium hover:bg-graphite hover:text-milk transition-colors"
          >
            Отправить ещё одно сообщение
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {showTitle && (
            <div className="border-b border-graphite/10 pb-6">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal leading-tight">
                {title}
              </h2>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-50 text-red-800 text-xs rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
                Ваше имя *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Как к вам обращаться"
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive focus:ring-1 focus:ring-olive transition-all"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive focus:ring-1 focus:ring-olive transition-all"
              />
            </div>
          </div>

          {/* Region and Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="contactMethod" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
                Способ связи
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive transition-all"
              >
                <option value="phone">Телефонный звонок</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Электронная почта</option>
              </select>
            </div>

            <div>
              <label htmlFor="region" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
                Город / Регион
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="Например: Москва, Подмосковье"
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive transition-all"
              />
            </div>

            <div>
              <label htmlFor="plotArea" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
                Площадь участка
              </label>
              <input
                type="text"
                id="plotArea"
                name="plotArea"
                value={formData.plotArea}
                onChange={handleChange}
                placeholder="Например: 15 соток"
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive transition-all"
              />
            </div>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectStage" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
                Этап проекта
              </label>
              <select
                id="projectStage"
                name="projectStage"
                value={formData.projectStage}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive transition-all"
              >
                <option value="выбираю участок">Выбираю участок</option>
                <option value="строю дом">Строю дом</option>
                <option value="участок уже готов">Участок уже готов</option>
                <option value="хочу обновить существующий сад">Хочу обновить существующий сад</option>
                <option value="представляю общественную территорию">Общественная / коммерческая территория</option>
              </select>
            </div>

            <div>
              <label htmlFor="requestedFormat" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
                Формат работы
              </label>
              <select
                id="requestedFormat"
                name="requestedFormat"
                value={formData.requestedFormat}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive transition-all"
              >
                <option value="концепция сада">Концепция сада (ориентировочно 30 дней)</option>
                <option value="концепция и рабочая документация">Концепция и документация (ориентировочно 60 дней)</option>
                <option value="авторский надзор">Авторский надзор</option>
                <option value="подарочный сертификат">Подарочный сертификат</option>
                <option value="пока нужна консультация">Пока нужна консультация</option>
              </select>
            </div>
          </div>

          {/* Message field */}
          <div>
            <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-graphite/80 font-sans mb-2">
              Расскажите о вашей задаче
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Опишите особенности участка, ваши пожелания по стилистике, растениям или образу жизни..."
              className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-lg text-sm text-graphite focus:outline-none focus:border-olive transition-all"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-graphite/30 text-olive focus:ring-olive"
            />
            <label htmlFor="consent" className="text-xs text-graphite/70 leading-normal font-sans cursor-pointer">
              Я соглашаюсь на обработку персональных данных в соответствии с{' '}
              <a href="/privacy" className="underline hover:text-graphite">
                Политикой конфиденциальности
              </a>
              .
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-8 py-4 bg-graphite text-milk rounded-full text-xs sm:text-sm font-sans font-medium hover:bg-olive transition-all duration-200 flex items-center justify-center space-x-3 shadow-md"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Отправка...</span>
              </>
            ) : (
              <>
                <span>Обсудить участок</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
