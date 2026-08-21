'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon } from 'lucide-react';
import { uploadImage } from '@/lib/supabase/queries';
import { isSupabaseConfigured } from '@/lib/supabase/client';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  aspectHint?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  folder = 'landing',
  aspectHint,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualUrl, setManualUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    if (!isSupabaseConfigured()) {
      // Create local object URL for preview if Supabase not yet connected
      const previewUrl = URL.createObjectURL(file);
      onChange(previewUrl);
      setIsUploading(false);
      setError('Supabase не подключен (переменные окружения). Для постоянного сохранения загрузите файл в Supabase Storage.');
      return;
    }

    try {
      const res = await uploadImage(file, folder);
      if (res.error) {
        setError(res.error);
      } else if (res.url) {
        onChange(res.url);
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyManualUrl = () => {
    onChange(manualUrl);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-graphite/80 font-sans">
          {label} {aspectHint && <span className="text-graphite/40 font-normal">({aspectHint})</span>}
        </label>
        <button
          type="button"
          onClick={() => setManualMode(!manualMode)}
          className="text-xs text-olive hover:underline flex items-center gap-1 font-sans"
        >
          <LinkIcon className="w-3 h-3" />
          {manualMode ? 'Загрузка файла' : 'Ввести URL'}
        </button>
      </div>

      {manualMode ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://... или /images/..."
            className="flex-1 px-3 py-2 text-xs font-sans rounded-xl border border-sand/60 bg-white focus:outline-none focus:border-olive"
          />
          <button
            type="button"
            onClick={handleApplyManualUrl}
            className="px-3 py-2 text-xs font-sans font-medium rounded-xl bg-olive text-milk hover:bg-olive/90 transition-colors"
          >
            Применить
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {value ? (
            <div className="relative group rounded-xl overflow-hidden border border-sand/60 bg-sand/10 aspect-[16/9] max-h-48 flex items-center justify-center">
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero_garden_main.webp';
                }}
              />
              <div className="absolute inset-0 bg-graphite/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3 py-1.5 rounded-full bg-milk text-graphite text-xs font-medium hover:bg-white shadow-sm flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Заменить
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 shadow-sm"
                  title="Очистить"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-sand hover:border-olive rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-milk-light/50 hover:bg-milk-light text-graphite/60"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-olive" />
                  <span className="text-xs font-sans">Загрузка в Supabase Storage...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-olive/70" />
                  <span className="text-xs font-medium font-sans text-graphite">Нажмите для выбора фото</span>
                  <span className="text-[11px] text-graphite/40 font-sans">PNG, JPG, WEBP до 10MB</span>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {error && <p className="text-[11px] text-red-600 font-sans mt-1">{error}</p>}
    </div>
  );
}
