'use client';

import { Phone, MessageSquare, Mail } from 'lucide-react';
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
  return (
    <div className="bg-[#FAF8F5] p-8 sm:p-14 lg:p-16 rounded-3xl border border-sand/50 shadow-sm space-y-8 sm:space-y-10">
      {showTitle && (
        <div className="border-b border-graphite/10 pb-6 sm:pb-8">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal leading-tight">
            {title}
          </h2>
        </div>
      )}

      <div className="max-w-3xl mx-auto text-center space-y-8">
        <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-graphite font-light leading-snug">
          Расскажите о своих мечтах, а мы найдем решения, чтобы воплотить их в жизнь
        </p>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-graphite/60 font-sans">
          <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
          <span>Пн – Сб, 10:00 — 19:00</span>
        </div>

        <div className="max-w-md mx-auto space-y-3 pt-2">
          {/* Direct Phone CTA */}
          <a
            href={`tel:${contacts.phoneRaw || '+79298131013'}`}
            className="w-full p-5 bg-graphite text-milk rounded-2xl flex items-center justify-between group hover:bg-olive transition-all duration-300 shadow-md"
          >
            <div className="text-left space-y-1">
              <span className="text-[11px] text-sand group-hover:text-milk/80 font-sans block">
                Прямой телефон архитектора
              </span>
              <span className="text-xl sm:text-2xl font-serif tracking-wide font-medium block text-milk">
                {contacts.phone}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
              <Phone className="w-5 h-5 text-sand group-hover:text-milk" />
            </div>
          </a>

          {/* Secondary Action Buttons (WhatsApp & Mail) */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 bg-white border border-graphite/15 rounded-xl text-graphite hover:border-olive hover:text-olive transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm font-sans font-medium shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-olive shrink-0" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${contacts.email}`}
              className="px-4 py-3.5 bg-white border border-graphite/15 rounded-xl text-graphite hover:border-olive hover:text-olive transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm font-sans font-medium shadow-xs"
            >
              <Mail className="w-4 h-4 text-olive shrink-0" />
              <span>Почта</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
