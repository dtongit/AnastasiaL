'use client';

import { useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { CheckCircle2, AlertTriangle, Database, Copy, ExternalLink } from 'lucide-react';

export default function SupabaseStatusCard() {
  const isConnected = isSupabaseConfigured();
  const [copied, setCopied] = useState(false);

  const handleCopySchemaNotice = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-olive/10 text-olive flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-graphite font-medium">
              Статус подключения к Supabase
            </h3>
            <p className="text-xs text-graphite/60 font-sans">
              Проверка переменных окружения и базы данных
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-sans font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              База подключена
            </span>
          ) : (
            <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-sans font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Локальный режим (дефолтные данные)
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 text-xs font-sans text-graphite/80 leading-relaxed">
        {isConnected ? (
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 space-y-2">
            <p className="font-medium">
              ✓ Проект успешно подключен к удаленному инстансу Supabase!
            </p>
            <p className="text-xs text-emerald-800">
              Все изменения текстов, изображений и проектов сохраняются в таблицы <code>site_content</code> и <code>projects</code>. Загружаемые файлы сохраняются в бакет <code>site-assets</code>.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-3">
            <p className="font-medium">
              Для синхронизации с реальной базой данных добавьте переменные в файл <code>.env.local</code> или настройки хостинга:
            </p>
            <div className="p-3 bg-graphite text-sand font-mono text-[11px] rounded-xl space-y-1 overflow-x-auto">
              <p>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
            </div>
            <p className="text-[11px] text-amber-800">
              Файл с полной схемой таблиц, RLS-политиками и сидом данных сохранен в файле <code>supabase/schema.sql</code>. Запустите его в SQL Editor в панели Supabase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
