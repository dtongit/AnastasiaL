'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getLandingContent, getProjects } from '@/lib/supabase/queries';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { getImagePath } from '@/utils/image';
import { LandingContent, Project } from '@/types';
import { DEFAULT_LANDING_CONTENT } from '@/data/landingDefaults';
import { PROJECTS as STATIC_PROJECTS } from '@/data/projects';

// Section Editors
import HeroEditor from '@/components/admin/HeroEditor';
import ManifestoEditor from '@/components/admin/ManifestoEditor';
import ApproachEditor from '@/components/admin/ApproachEditor';
import ServicesEditor from '@/components/admin/ServicesEditor';
import BureauEditor from '@/components/admin/BureauEditor';
import CertificatesEditor from '@/components/admin/CertificatesEditor';
import FinalBannerEditor from '@/components/admin/FinalBannerEditor';
import ContactsEditor from '@/components/admin/ContactsEditor';
import ProjectsManager from '@/components/admin/ProjectsManager';
import LeadsManager from '@/components/admin/LeadsManager';
import SupabaseStatusCard from '@/components/admin/SupabaseStatusCard';

import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Phone,
  Database,
  LogOut,
  ExternalLink,
  Loader2,
  Sparkles,
  Layers,
  FileText,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [content, setContent] = useState<LandingContent>(DEFAULT_LANDING_CONTENT);
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'landing' | 'projects' | 'leads' | 'contacts' | 'db'>('landing');
  const [activeLandingSection, setActiveLandingSection] = useState<
    'hero' | 'manifesto' | 'approach' | 'services' | 'bureau' | 'certificates' | 'finalBanner'
  >('hero');
  const [adminEmail, setAdminEmail] = useState<string>('admin@mesto-sily.ru');

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('admin_authenticated');
    const storedEmail = sessionStorage.getItem('admin_user_email');
    if (storedEmail) setAdminEmail(storedEmail);

    if (!isAuth && isSupabaseConfigured()) {
      // Check Supabase session
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          router.push('/admin/login');
        }
      });
    }

    // Load initial data
    async function loadData() {
      setIsLoading(true);
      try {
        const [cData, pData] = await Promise.all([getLandingContent(), getProjects()]);
        setContent(cData);
        setProjects(pData);
      } catch (err) {
        console.warn('Error loading admin data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [router]);

  const handleLogout = async () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_user_email');
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-milk flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-olive animate-spin" />
        <p className="text-xs font-sans text-graphite/60">Загрузка панели управления...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-graphite">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-milk/95 backdrop-blur-md border-b border-sand/50 shadow-xs px-6 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10">
                <Image
                  src={getImagePath('/images/logo_03_blueprint.webp')}
                  alt="Место силы"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-medium text-graphite block leading-none">
                  Место силы
                </span>
                <span className="text-[10px] text-olive font-sans font-medium uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-sand/60 text-xs font-sans text-graphite hover:bg-sand/20 transition-colors"
            >
              <span>Сайт</span>
              <ExternalLink className="w-3 h-3 text-graphite/50" />
            </Link>

            <div className="text-right hidden md:block">
              <span className="text-[11px] text-graphite/50 block font-sans">Вы вошли как:</span>
              <span className="text-xs font-medium text-graphite font-sans">{adminEmail}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full border border-sand/60 hover:bg-red-50 hover:text-red-600 text-graphite/60 transition-colors"
              title="Выйти"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-milk-light rounded-2xl border border-sand/50 shadow-xs">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-2 transition-all ${
              activeTab === 'landing'
                ? 'bg-graphite text-milk shadow-sm'
                : 'text-graphite/70 hover:text-graphite hover:bg-sand/20'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Главная страница (Лендинг)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-2 transition-all ${
              activeTab === 'projects'
                ? 'bg-graphite text-milk shadow-sm'
                : 'text-graphite/70 hover:text-graphite hover:bg-sand/20'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Портфолио и проекты</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-2 transition-all ${
              activeTab === 'leads'
                ? 'bg-graphite text-milk shadow-sm'
                : 'text-graphite/70 hover:text-graphite hover:bg-sand/20'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Заявки с сайта</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-2 transition-all ${
              activeTab === 'contacts'
                ? 'bg-graphite text-milk shadow-sm'
                : 'text-graphite/70 hover:text-graphite hover:bg-sand/20'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Контакты</span>
          </button>

          <button
            onClick={() => setActiveTab('db')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-2 transition-all ${
              activeTab === 'db'
                ? 'bg-graphite text-milk shadow-sm'
                : 'text-graphite/70 hover:text-graphite hover:bg-sand/20'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Подключение к базе</span>
          </button>
        </div>

        {/* TAB 1: LANDING PAGE CONTENT */}
        {activeTab === 'landing' && (
          <div className="space-y-6">
            {/* Landing Sub-Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {(
                [
                  { id: 'hero', label: '1. Главный экран (Hero)' },
                  { id: 'manifesto', label: '2. Манифест' },
                  { id: 'approach', label: '3. Метод и принципы' },
                  { id: 'services', label: '4. Услуги и чек-лист' },
                  { id: 'bureau', label: '5. О бюро и авторе' },
                  { id: 'certificates', label: '6. Сертификаты' },
                  { id: 'finalBanner', label: '7. Финальный баннер' },
                ] as const
              ).map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveLandingSection(sec.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all ${
                    activeLandingSection === sec.id
                      ? 'bg-olive text-milk font-medium shadow-xs'
                      : 'bg-white border border-sand/50 text-graphite/70 hover:text-graphite hover:border-sand'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Sub-section views */}
            {activeLandingSection === 'hero' && <HeroEditor initialData={content.hero} />}
            {activeLandingSection === 'manifesto' && (
              <ManifestoEditor initialData={content.manifesto} />
            )}
            {activeLandingSection === 'approach' && (
              <ApproachEditor initialData={content.approach} />
            )}
            {activeLandingSection === 'services' && (
              <ServicesEditor initialData={content.services} />
            )}
            {activeLandingSection === 'bureau' && (
              <BureauEditor initialData={content.bureau} />
            )}
            {activeLandingSection === 'certificates' && (
              <CertificatesEditor initialData={content.certificates} />
            )}
            {activeLandingSection === 'finalBanner' && (
              <FinalBannerEditor initialData={content.finalBanner} />
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === 'projects' && <ProjectsManager initialProjects={projects} />}

        {/* TAB 3: LEADS */}
        {activeTab === 'leads' && <LeadsManager />}

        {/* TAB 4: CONTACTS */}
        {activeTab === 'contacts' && <ContactsEditor initialData={content.contacts} />}

        {/* TAB 5: DATABASE & SCHEMA */}
        {activeTab === 'db' && (
          <div className="space-y-6">
            <SupabaseStatusCard />

            <div className="bg-white rounded-3xl border border-sand/50 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl text-graphite font-medium">
                Как подключить базу данных Supabase
              </h3>
              <div className="space-y-3 text-xs font-sans text-graphite/80 leading-relaxed">
                <p>1. Создайте проект в <a href="https://supabase.com" target="_blank" className="text-olive underline font-medium">Supabase</a>.</p>
                <p>2. Перейдите в <strong>Project Settings → API</strong> и скопируйте <code>Project URL</code> и <code>anon public key</code>.</p>
                <p>3. Вставьте их в файл <code>.env.local</code> в корне проекта или в Settings хостинга (Vercel / GitHub Secrets).</p>
                <p>4. Откройте <strong>SQL Editor</strong> в панели Supabase и выполните скрипт из файла <code>supabase/schema.sql</code>.</p>
                <p>5. Готово! Все изменения в этой панели управления будут синхронизироваться с вашей живой базой данных.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
