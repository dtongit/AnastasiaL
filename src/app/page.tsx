'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  CheckCircle,
  Sun,
  Leaf,
  Clock,
  Layers,
  ShieldCheck,
  Gift,
  Compass,
  Sprout,
  Droplets,
  Lightbulb,
  Grid3X3,
} from 'lucide-react';
import { getLandingContent, getProjects } from '@/lib/supabase/queries';
import { getImagePath } from '@/utils/image';
import { DEFAULT_LANDING_CONTENT } from '@/data/landingDefaults';
import { PROJECTS as STATIC_PROJECTS } from '@/data/projects';
import { LandingContent, Project } from '@/types';
import ProjectsSection from '@/components/ProjectsSection';
import ContactForm from '@/components/ContactForm';

// Helper icon renderers for dynamic pillars & services
function renderPillarIcon(iconName: string) {
  switch (iconName) {
    case 'Sun':
      return <Sun className="w-6 h-6" />;
    case 'Leaf':
      return <Leaf className="w-6 h-6" />;
    case 'Clock':
      return <Clock className="w-5 h-5" />;
    case 'Layers':
      return <Layers className="w-5 h-5" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-5 h-5" />;
    default:
      return <Leaf className="w-5 h-5" />;
  }
}

function renderServiceIcon(iconName: string) {
  switch (iconName) {
    case 'Compass':
      return <Compass className="w-7 h-7 sm:w-8 sm:h-8" />;
    case 'Sprout':
      return <Sprout className="w-7 h-7 sm:w-8 sm:h-8" />;
    case 'Droplets':
      return <Droplets className="w-7 h-7 sm:w-8 sm:h-8" />;
    case 'Lightbulb':
      return <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8" />;
    case 'Grid3X3':
      return <Grid3X3 className="w-7 h-7 sm:w-8 sm:h-8" />;
    default:
      return <Sprout className="w-7 h-7 sm:w-8 sm:h-8" />;
  }
}

export default function HomePage() {
  const [content, setContent] = useState<LandingContent>(DEFAULT_LANDING_CONTENT);
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);

  useEffect(() => {
    async function loadLiveData() {
      try {
        const [liveContent, liveProjects] = await Promise.all([
          getLandingContent(),
          getProjects(),
        ]);
        if (liveContent) setContent(liveContent);
        if (liveProjects && liveProjects.length > 0) setProjects(liveProjects);
      } catch (err) {
        console.warn('Could not load live Supabase data on client:', err);
      }
    }

    loadLiveData();
  }, []);

  const { hero, manifesto, approach, services, bureau, certificates, finalBanner, contacts } =
    content;

  return (
    <div className="space-y-28 sm:space-y-36">
      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between items-center text-center px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-14"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={getImagePath(hero.bgImage || '/images/hero_garden_main.webp')}
            alt="Атмосферный малоуходный сад"
            fill
            priority
            className="object-cover object-center brightness-[0.88] transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/40 to-graphite/30" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full text-milk flex-1 flex flex-col items-center text-center">
          {/* Main Title */}
          <div className="pt-4 sm:pt-8 lg:pt-20">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.5rem] 2xl:text-[5rem] font-normal leading-[1.15] sm:leading-[1.08] tracking-tight text-milk drop-shadow-sm text-center lg:whitespace-nowrap">
              <span className="inline-block">{hero.titleLine1}</span>{' '}
              <span className="inline-block">{hero.titleLine2}</span>
            </h1>
          </div>

          {/* Middle Block: Subtitle + Buttons + Tags */}
          <div className="w-full flex flex-col items-center gap-12 sm:gap-16 lg:gap-24 mt-8 sm:mt-16 lg:mt-24 mb-auto py-4 sm:py-6">
            <p className="text-xl sm:text-2xl md:text-[1.65rem] lg:text-[1.75rem] text-milk/95 font-sans max-w-4xl font-light leading-relaxed sm:leading-snug drop-shadow-sm mx-auto">
              {hero.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-sans">
              <Link
                href={hero.primaryBtnLink || '#contact'}
                className="px-8 py-4 rounded-full bg-sand text-graphite font-medium text-sm hover:bg-milk transition-all duration-200 shadow-lg shadow-black/20"
              >
                {hero.primaryBtnText}
              </Link>

              <Link
                href={hero.secondaryBtnLink || '#projects'}
                className="px-8 py-4 rounded-full border border-milk/30 text-milk text-sm font-medium hover:bg-milk/20 backdrop-blur-sm transition-all duration-200"
              >
                {hero.secondaryBtnText}
              </Link>
            </div>

            {/* Badges */}
            <div className="pt-8 sm:pt-10 border-t border-milk/20 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2 text-xs sm:text-sm text-milk/80 font-sans max-w-2xl mx-auto w-full">
              {hero.badges.map((badge, idx) => (
                <span key={idx} className="flex items-center gap-4">
                  <span>{badge}</span>
                  {idx < hero.badges.length - 1 && <span className="hidden sm:inline">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-[#FAF8F5] p-10 sm:p-16 lg:p-20 rounded-2xl border border-sand/30 space-y-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs sm:text-sm text-olive font-sans font-medium">
              {manifesto.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-graphite font-normal leading-snug">
              {manifesto.title}
            </h2>
            <p className="text-base sm:text-lg text-graphite/80 font-sans leading-relaxed font-light">
              {manifesto.description}
            </p>
          </div>

          <div className="pt-8 border-t border-graphite/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-graphite/70 font-sans">
            {manifesto.features.map((feat, idx) => (
              <div key={idx}>
                <span className="block text-graphite font-medium mb-1">{feat.title}</span>
                <span>{feat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS CATALOG */}
      <ProjectsSection projects={projects} />

      {/* 4. APPROACH & PHILOSOPHY */}
      <section id="approach" className="space-y-16 scroll-mt-24">
        {/* Intro */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <span className="text-xs sm:text-sm text-olive font-sans font-medium">
            {approach.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
            {approach.title}
          </h2>
          <p className="text-base sm:text-lg text-graphite/70 font-sans font-light max-w-3xl leading-relaxed">
            {approach.description}
          </p>
        </div>

        {/* Hero Blueprint Image */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-sand/20 shadow-sm">
            <Image
              src={getImagePath(approach.image || '/images/modern_landscape_realistic.webp')}
              alt="Процесс проектирования сада — метод и природные решения"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Pillars Bento Matrix */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-graphite/10 pb-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
                <span className="text-xs sm:text-sm text-olive font-sans font-medium">
                  {approach.subBadge}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-graphite font-normal">
                {approach.subTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-x-8 lg:gap-y-10 items-start">
            {approach.pillars.map((pillar, idx) => (
              <div
                key={pillar.id || idx}
                className={`${
                  pillar.colSpan ||
                  (idx === 0
                    ? 'col-span-12 lg:col-span-7'
                    : idx === 1
                    ? 'col-span-12 lg:col-span-5'
                    : 'col-span-12 md:col-span-6 lg:col-span-4')
                } ${pillar.bgClass || 'bg-[#FAF8F5]'} p-8 sm:p-10 rounded-3xl border ${
                  pillar.borderClass || 'border-sand/50'
                } space-y-6 relative overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-sm`}
              >
                <div className="absolute top-0 right-0 p-8 font-serif text-6xl lg:text-7xl font-light text-graphite/5 select-none pointer-events-none group-hover:text-olive/10 transition-colors">
                  {pillar.num || `0${idx + 1}`}
                </div>
                <div className="space-y-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl ${
                      pillar.iconBg || 'bg-ochre/15'
                    } ${pillar.iconColor || 'text-ochre'} flex items-center justify-center`}
                  >
                    {renderPillarIcon(pillar.icon)}
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-graphite/75 font-sans font-light leading-relaxed max-w-xl">
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section id="services" className="space-y-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="border-b border-graphite/10 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
                <span className="text-xs sm:text-sm text-olive font-sans font-medium">
                  {services.badge}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
                {services.title}
              </h2>
            </div>
          </div>
        </div>

        {/* 3 Differentiated Architectural Cards */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {services.services.map((svc, idx) => {
              const isFlagship = idx === 1;
              const isThird = idx === 2;

              return (
                <div
                  key={svc.slug || idx}
                  className={`${
                    isFlagship
                      ? 'bg-graphite text-milk border-2 border-ochre/50 shadow-2xl relative lg:-translate-y-3'
                      : isThird
                      ? 'bg-[#ECEFE8] text-graphite border border-sage/50 shadow-sm'
                      : 'bg-[#FAF8F5] text-graphite border border-sand/50 shadow-sm'
                  } p-8 sm:p-10 rounded-3xl flex flex-col justify-between space-y-8 transition-all duration-300 group`}
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3
                        className={`font-serif text-3xl font-medium ${
                          isFlagship ? 'text-milk' : 'text-graphite group-hover:text-olive'
                        } transition-colors`}
                      >
                        {svc.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                          isFlagship ? 'text-milk/80' : 'text-graphite/70'
                        }`}
                      >
                        {svc.shortDescription}
                      </p>
                    </div>

                    <div
                      className={`space-y-3 pt-4 border-t ${
                        isFlagship ? 'border-white/10' : isThird ? 'border-sage/40' : 'border-sand/40'
                      }`}
                    >
                      <h4
                        className={`text-xs font-sans font-medium ${
                          isFlagship ? 'text-sand' : 'text-graphite/80'
                        }`}
                      >
                        Что входит в пакет:
                      </h4>
                      <ul
                        className={`space-y-2 text-xs sm:text-sm font-sans ${
                          isFlagship ? 'text-milk/85' : 'text-graphite/75'
                        }`}
                      >
                        {svc.included.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start space-x-2.5">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isFlagship ? 'text-ochre' : 'text-olive'
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <div
                      className={`p-4 rounded-2xl space-y-1 ${
                        isFlagship
                          ? 'bg-white/5 border border-ochre/30'
                          : isThird
                          ? 'bg-olive/10 border border-olive/20'
                          : 'bg-sand/20 border border-sand/30'
                      }`}
                    >
                      <span
                        className={`font-medium text-xs block ${
                          isFlagship ? 'text-sand' : 'text-graphite'
                        }`}
                      >
                        Итоговый результат:
                      </span>
                      <p
                        className={`text-xs font-sans leading-relaxed ${
                          isFlagship ? 'text-milk/90' : 'text-graphite/80'
                        }`}
                      >
                        {svc.result}
                      </p>
                    </div>

                    <Link
                      href="#contact"
                      className={`w-full py-3.5 rounded-full text-center text-xs font-sans font-medium transition-all block ${
                        isFlagship
                          ? 'bg-sand text-graphite hover:bg-milk font-semibold shadow-lg'
                          : isThird
                          ? 'bg-graphite text-milk hover:bg-olive shadow-sm'
                          : 'border border-graphite text-graphite hover:bg-graphite hover:text-milk'
                      }`}
                    >
                      Выбрать формат
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Дополнительные услуги */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-[#FAF8F5] p-8 sm:p-10 rounded-3xl border border-sand/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sand/30 pb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-graphite font-normal">
                  {services.additionalTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-graphite/60 font-sans font-light max-w-md">
                {services.additionalSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 pt-2">
              {services.additionalServices.map((item, aIdx) => (
                <div
                  key={aIdx}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/60 border border-sand/30 hover:border-olive/40 hover:bg-white transition-all duration-300 group"
                >
                  <div
                    style={{ backgroundColor: item.bgCircle || '#EAE4DC', color: item.iconColor || '#7A6B58' }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform duration-300"
                  >
                    {renderServiceIcon(item.icon)}
                  </div>
                  <span className="font-serif text-base sm:text-lg text-graphite font-medium">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architectural Field Checklist Strip */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-gradient-to-r from-graphite via-[#2c3028] to-graphite text-milk p-8 sm:p-12 rounded-3xl border border-graphite-dark space-y-8 shadow-xl">
            <div className="border-b border-white/10 pb-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-milk font-normal">
                {services.checklistTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-milk/75 font-sans">
              {services.checklist.map((chk, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 rounded-full bg-sand/20 text-sand text-xs font-mono font-bold flex items-center justify-center">
                      {chk.step || `0${idx + 1}`}
                    </span>
                    <span className="text-sand font-medium text-sm">{chk.title}</span>
                  </div>
                  <p className="leading-relaxed">{chk.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT ANASTASIA & BUREAU */}
      <section id="bureau" className="space-y-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <span className="text-xs sm:text-sm text-olive font-sans font-medium">{bureau.badge}</span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
            {bureau.title}
          </h2>
          <p className="text-base sm:text-lg text-graphite/70 font-sans font-light max-w-3xl leading-relaxed">
            {bureau.subtitle}
          </p>
        </div>

        {/* Main Bio Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAF8F5] p-8 sm:p-16 rounded-2xl border border-sand/40">
            <div className="lg:col-span-5 relative aspect-[649/697] w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-sm bg-sand/10">
              <Image
                src={getImagePath(bureau.image || '/images/anastasia_bureau.webp')}
                alt={`${bureau.name} — ландшафтный архитектор`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs sm:text-sm text-olive font-sans font-medium">{bureau.role}</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-graphite font-medium">
                {bureau.name}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-graphite/80 font-sans font-light leading-relaxed">
                <p className="font-medium text-graphite">{bureau.subheading}</p>
                {bureau.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CERTIFICATES */}
      <section id="certificates" className="space-y-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <span className="text-xs sm:text-sm text-olive font-sans font-medium">
            {certificates.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
            {certificates.title}
          </h2>
          <p className="text-base sm:text-lg text-graphite/70 font-sans font-light max-w-3xl leading-relaxed">
            {certificates.subtitle}
          </p>
        </div>

        {/* Hero Showcase Image */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-sand/20 shadow-sm">
            <Image
              src={getImagePath(certificates.image || '/images/certificate_mesto_sily_v2.webp')}
              alt="Подарочный сертификат на проект сада"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Formats Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="border-b border-graphite/10 pb-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
                <span className="text-xs sm:text-sm text-olive font-sans font-medium">
                  Варианты подарка
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-graphite font-normal">
                {certificates.subTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {certificates.vouchers.map((voucher, vIdx) => {
              const isDark = voucher.variant === 'dark' || vIdx === 1;

              return (
                <div
                  key={voucher.id || vIdx}
                  className={`${
                    isDark
                      ? 'bg-graphite text-milk border-2 border-ochre/50 shadow-2xl hover:border-ochre'
                      : 'bg-[#FAF8F5] text-graphite border-2 border-sand/60 shadow-sm hover:border-olive/50'
                  } p-8 sm:p-12 rounded-3xl space-y-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group`}
                >
                  <div
                    className={`absolute top-0 right-0 p-8 font-serif text-7xl font-light ${
                      isDark ? 'text-white/5' : 'text-graphite/5 group-hover:text-olive/10'
                    } select-none pointer-events-none transition-colors`}
                  >
                    {voucher.num || `0${vIdx + 1}`}
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <h4
                        className={`font-serif text-3xl sm:text-4xl ${
                          isDark ? 'text-milk font-normal' : 'text-graphite font-medium'
                        }`}
                      >
                        {voucher.title}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                          isDark ? 'text-milk/80' : 'text-graphite/70'
                        }`}
                      >
                        {voucher.description}
                      </p>
                    </div>

                    <div
                      className={`space-y-3 pt-4 border-t ${
                        isDark ? 'border-white/10' : 'border-sand/40'
                      }`}
                    >
                      <span
                        className={`text-xs font-sans font-medium block ${
                          isDark ? 'text-sand' : 'text-graphite/80'
                        }`}
                      >
                        Что входит в сертификат:
                      </span>
                      <ul
                        className={`space-y-2.5 text-xs sm:text-sm font-sans ${
                          isDark ? 'text-milk/90' : 'text-graphite/80'
                        }`}
                      >
                        {voucher.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-center space-x-3">
                            <CheckCircle
                              className={`w-4 h-4 shrink-0 ${
                                isDark ? 'text-ochre' : 'text-olive'
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 relative z-10">
                    <div
                      className={`p-4 rounded-2xl border flex items-start gap-3 text-xs font-sans ${
                        isDark
                          ? 'bg-white/5 border-ochre/30 text-milk/80'
                          : 'bg-sand/20 border-sand/30 text-graphite/80'
                      }`}
                    >
                      <Gift
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isDark ? 'text-ochre' : 'text-olive'
                        }`}
                      />
                      <span>{voucher.deliveryNote}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CONTACT & INTERACTIVE FORM */}
      <section id="contact" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ContactForm contacts={contacts} />
        </div>
      </section>

      {/* 9. FINAL ATMOSPHERIC BLOCK */}
      <section className="relative min-h-[55vh] sm:min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center text-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={getImagePath(finalBanner.bgImage || '/images/garden_return_bg.webp')}
            alt="Сад, в который хочется возвращаться — пример ландшафтного дизайна"
            fill
            className="object-cover object-center brightness-[0.85] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/40 to-graphite/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-24 sm:py-36 text-milk flex flex-col items-center justify-center">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-milk drop-shadow-md">
            {finalBanner.title}
          </h2>
        </div>
      </section>
    </div>
  );
}
