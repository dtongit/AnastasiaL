'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const isConnected = isSupabaseConfigured();

    if (!isConnected) {
      // In local mode without live Supabase credentials, allow demo access
      sessionStorage.setItem('admin_authenticated', 'true');
      sessionStorage.setItem('admin_user_email', email || 'admin@mesto-sily.ru');
      router.push('/admin');
      return;
    }

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || 'Неверный email или пароль');
        setIsLoading(false);
        return;
      }

      if (data.session) {
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_user_email', email);
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-milk flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Brand logo & header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block relative w-16 h-16 mx-auto">
            <Image
              src="/images/logo_03_blueprint.webp"
              alt="Место силы"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-graphite font-normal">
              Панель управления
            </h1>
            <p className="text-xs sm:text-sm text-graphite/60 font-sans mt-1">
              «Место силы» — бюро Анастасии Лацинник
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-sand/50 p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-sand/30">
            <ShieldCheck className="w-4 h-4 text-olive" />
            <span className="text-xs font-sans font-medium text-graphite">Вход для администратора</span>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-graphite/80 font-sans">
                Электронная почта
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-graphite/40 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mesto-sily.ru"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive text-graphite"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-graphite/80 font-sans">
                Пароль
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-graphite/40 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand/60 font-sans text-xs focus:outline-none focus:border-olive text-graphite"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-graphite text-milk text-xs font-sans font-medium hover:bg-olive transition-all flex items-center justify-center gap-2 shadow-sm mt-4 disabled:opacity-50"
            >
              <span>{isLoading ? 'Проверка...' : 'Войти в панель'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {!isSupabaseConfigured() && (
            <div className="p-3.5 rounded-2xl bg-sand/20 border border-sand/30 text-[11px] text-graphite/70 font-sans leading-relaxed">
              <span className="font-semibold text-graphite block mb-0.5">Режим разработчика:</span>
              Переменные Supabase еще не заданы в .env.local — вы можете войти с любым email и паролем для тестирования интерфейса админки.
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-graphite/60 hover:text-graphite font-sans font-medium transition-colors"
          >
            ← Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </div>
  );
}
