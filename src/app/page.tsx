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
  ArrowUpRight,
  Gift,
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { getImagePath } from '@/utils/image';
import ProjectsSection from '@/components/ProjectsSection';
import ContactForm from '@/components/ContactForm';

export default function HomePage() {


  return (
    <div className="space-y-28 sm:space-y-36">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between items-center text-center px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-14">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={getImagePath('/images/hero_garden_main.webp')}
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
              <span className="inline-block">Ландшафтное бюро</span>{' '}
              <span className="inline-block">Анастасии Лацинник</span>
            </h1>
          </div>

          {/* Middle Block: Subtitle + Buttons + Tags */}
          <div className="w-full flex flex-col items-center gap-12 sm:gap-16 lg:gap-24 mt-8 sm:mt-16 lg:mt-24 mb-auto py-4 sm:py-6">
            <p className="text-xl sm:text-2xl md:text-[1.65rem] lg:text-[1.75rem] text-milk/95 font-sans max-w-4xl font-light leading-relaxed sm:leading-snug drop-shadow-sm mx-auto">
              Малоуходные сады для частных и общественных территорий — от первой идеи до рабочих чертежей и авторского надзора.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-sans">
              <Link
                href="#contact"
                className="px-8 py-4 rounded-full bg-sand text-graphite font-medium text-sm hover:bg-milk transition-all duration-200 shadow-lg shadow-black/20"
              >
                Обсудить свой участок
              </Link>

              <Link
                href="#projects"
                className="px-8 py-4 rounded-full border border-milk/30 text-milk text-sm font-medium hover:bg-milk/20 backdrop-blur-sm transition-all duration-200"
              >
                Смотреть проекты
              </Link>
            </div>

            {/* Badges */}
            <div className="pt-8 sm:pt-10 border-t border-milk/20 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2 text-xs sm:text-sm text-milk/80 font-sans max-w-2xl mx-auto w-full">
              <span>Концепция</span>
              <span className="hidden sm:inline">·</span>
              <span>Проектирование</span>
              <span className="hidden sm:inline">·</span>
              <span>Авторский надзор</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-[#FAF8F5] p-10 sm:p-16 lg:p-20 rounded-2xl border border-sand/30 space-y-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs sm:text-sm text-olive font-sans font-medium">Манифест</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-graphite font-normal leading-snug">
              Сад — это место, которое помогает жить.
            </h2>
            <p className="text-base sm:text-lg text-graphite/80 font-sans leading-relaxed font-light">
              Сад создаётся не ради декоративного оформления участка. Он появляется из образа жизни: из желания быть на воздухе, отдыхать в тишине, принимать близких, наблюдать смену сезонов и каждый день чувствовать связь с местом.
            </p>
          </div>

          <div className="pt-8 border-t border-graphite/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-graphite/70 font-sans">
            <div>
              <span className="block text-graphite font-medium mb-1">Природа и архитектура</span>
              <span>Единая пространственная система без лишних декоративных барьеров.</span>
            </div>
            <div>
              <span className="block text-graphite font-medium mb-1">Устойчивость</span>
              <span>Растения подбираются под естественный климат и состав почвы.</span>
            </div>
            <div>
              <span className="block text-graphite font-medium mb-1">Сезонная динамика</span>
              <span>Красота, выстроенная на все 12 месяцев года.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS CATALOG */}
      <ProjectsSection />

      {/* 4. APPROACH & PHILOSOPHY */}
      <section id="approach" className="space-y-16 scroll-mt-24">
        {/* Intro */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <span className="text-xs sm:text-sm text-olive font-sans font-medium">Метод</span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
            У каждого места свой характер
          </h2>
          <p className="text-base sm:text-lg text-graphite/70 font-sans font-light max-w-3xl leading-relaxed">
            Мы не начинаем с готового стиля. Сначала смотрим, что уже есть на участке и какие возможности в нём скрыты.
          </p>
        </div>

        {/* Hero Blueprint Image */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-sand/20 shadow-sm">
            <Image
              src={getImagePath('/images/modern_landscape_realistic.webp')}
              alt="Процесс проектирования сада — метод и природные решения"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 6 Pillars */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-graphite/10 pb-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
                <span className="text-xs sm:text-sm text-olive font-sans font-medium">
                  Архитектурный манифест
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-graphite font-normal">
                Фундамент нашего метода
              </h3>
            </div>
          </div>

          {/* Bento Asymmetrical Matrix with Randomized Rhythm & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-x-8 lg:gap-y-10 items-start">
            {/* Card 01 - Чтение места (col-span-12 lg:col-span-7) */}
            <div className="col-span-12 lg:col-span-7 bg-[#FAF8F5] p-8 sm:p-10 lg:p-12 rounded-3xl border border-sand/50 space-y-6 relative overflow-hidden flex flex-col justify-between group hover:border-olive/50 transition-all duration-300 shadow-sm">
              <div className="absolute top-0 right-0 p-8 font-serif text-6xl lg:text-7xl font-light text-graphite/5 select-none pointer-events-none group-hover:text-olive/10 transition-colors">
                01
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-ochre/15 text-ochre flex items-center justify-center">
                  <Sun className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">Чтение места</h4>
                <p className="text-xs sm:text-sm text-graphite/75 font-sans font-light leading-relaxed max-w-xl">
                  Мы не приносим готовые визуальные штампы. Сад рождается из характера рельефа, типа почвы, движения солнца, розы ветров и существующей растительности.
                </p>
              </div>
            </div>

            {/* Card 02 - Природные растительные сообщества (col-span-12 lg:col-span-5) */}
            <div className="col-span-12 lg:col-span-5 bg-[#F5F7F2] p-8 sm:p-10 rounded-3xl border border-sage/30 space-y-6 relative overflow-hidden flex flex-col justify-between group hover:border-olive/40 transition-all duration-300 shadow-sm lg:mt-6">
              <div className="absolute top-0 right-0 p-8 font-serif text-6xl lg:text-7xl font-light text-olive/5 select-none pointer-events-none group-hover:text-olive/10 transition-colors">
                02
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-olive/10 text-olive flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl text-graphite font-medium">Растительные матрицы</h4>
                <p className="text-xs sm:text-sm text-graphite/75 font-sans font-light leading-relaxed">
                  Вместо случайного набора одиночных растений мы выстраиваем матрицы многолетников и злаков, которые поддерживают друг друга и создают устойчивый биоценоз.
                </p>
              </div>
            </div>

            {/* Card 03 - Всесезонность и работа со временем (col-span-12 md:col-span-6 lg:col-span-4) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#FAF8F5] p-8 sm:p-9 rounded-3xl border border-sand/40 space-y-6 relative overflow-hidden flex flex-col justify-between group hover:border-olive/50 transition-all duration-300 shadow-sm lg:-mt-2">
              <div className="absolute top-0 right-0 p-6 font-serif text-5xl font-light text-graphite/5 select-none pointer-events-none">
                03
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-ochre/15 text-ochre flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-2xl text-graphite font-medium">Всесезонность</h4>
                <p className="text-xs sm:text-sm text-graphite/70 font-sans font-light leading-relaxed">
                  Сад не рассчитан на один эффектный месяц. Мы проектируем непрерывную динамику: от пробуждения первоцветов до графики зимних сухоцветов.
                </p>
              </div>
            </div>

            {/* Card 04 - Материалы и связь с архитектурой (col-span-12 md:col-span-6 lg:col-span-4) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#F5EFE6] p-8 sm:p-10 rounded-3xl border border-sand/60 space-y-6 relative overflow-hidden flex flex-col justify-between group hover:border-olive/50 transition-all duration-300 shadow-sm lg:mt-5">
              <div className="absolute top-0 right-0 p-6 font-serif text-5xl font-light text-graphite/5 select-none pointer-events-none">
                04
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-graphite/10 text-graphite flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-2xl text-graphite font-medium">Материалы и архитектура</h4>
                <p className="text-xs sm:text-sm text-graphite/70 font-sans font-light leading-relaxed">
                  Натуральный камень, лиственница, песчаник, галька и металл. Материалы благородно стареют, не теряя тактильности и прочности с годами.
                </p>
              </div>
            </div>

            {/* Card 05 - Проектирование объёма ухода (col-span-12 lg:col-span-4) */}
            <div className="col-span-12 lg:col-span-4 bg-[#FAF8F5] p-8 sm:p-9 rounded-3xl border border-olive/30 space-y-6 relative overflow-hidden flex flex-col justify-between group hover:border-olive/60 transition-all duration-300 shadow-sm lg:-mt-4">
              <div className="absolute top-0 right-0 p-6 font-serif text-5xl font-light text-olive/10 select-none pointer-events-none">
                05
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-olive/15 text-olive flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-2xl text-graphite font-medium">Расчетный объём ухода</h4>
                <p className="text-xs sm:text-sm text-graphite/70 font-sans font-light leading-relaxed">
                  Заранее закладывается понятный график внимания. Сад остаётся красивым без необходимости постоянных ежедневных садовых работ.
                </p>
              </div>
            </div>
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
                  Форматы взаимодействия
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
                Форматы работы и проектирования
              </h2>
            </div>
          </div>
        </div>

        {/* 3 Differentiated Architectural Cards */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Format 1: Концепция сада */}
            <div className="bg-[#FAF8F5] p-8 sm:p-10 rounded-3xl border border-sand/50 flex flex-col justify-between space-y-8 hover:border-olive/50 transition-all duration-300 shadow-sm group">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl text-graphite font-medium group-hover:text-olive transition-colors">
                    Концепция сада
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite/70 font-sans font-light leading-relaxed">
                    Идея, пространственная логика, зонирование, настроение, подбор материалов и ключевых растительных сообществ.
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-sand/40">
                  <h4 className="text-xs font-sans font-medium text-graphite/80">Что входит:</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-graphite/75 font-sans">
                    {SERVICES[0].included.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="p-4 bg-sand/20 rounded-2xl border border-sand/30 space-y-1">
                  <span className="font-medium text-graphite text-xs block">Итоговый результат:</span>
                  <p className="text-xs text-graphite/80 font-sans leading-relaxed">{SERVICES[0].result}</p>
                </div>
                <Link
                  href="#contact"
                  className="w-full py-3.5 rounded-full border border-graphite text-graphite hover:bg-graphite hover:text-milk text-center text-xs font-sans font-medium transition-all block"
                >
                  Выбрать концепцию
                </Link>
              </div>
            </div>

            {/* Format 2: Концепция + Рабочая документация (HERO FLAGSHIP) */}
            <div className="bg-graphite text-milk p-8 sm:p-10 rounded-3xl border-2 border-ochre/50 flex flex-col justify-between space-y-8 shadow-2xl relative lg:-translate-y-3">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl text-milk font-normal">
                    Концепция и рабочая документация
                  </h3>
                  <p className="text-xs sm:text-sm text-milk/80 font-sans font-light leading-relaxed">
                    Полный комплекс чертежей и схем, готовый для передачи подрядчикам и точной строительной реализации.
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-sans font-medium text-sand">Что входит в полный пакет:</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-milk/85 font-sans">
                    {SERVICES[1].included.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-ochre/30 space-y-1">
                  <span className="font-medium text-sand text-xs block">Итоговый результат:</span>
                  <p className="text-xs text-milk/90 font-sans leading-relaxed">{SERVICES[1].result}</p>
                </div>
                <Link
                  href="#contact"
                  className="w-full py-4 rounded-full bg-sand text-graphite hover:bg-milk text-center text-xs font-sans font-semibold transition-all block shadow-lg"
                >
                  Выбрать полный проект
                </Link>
              </div>
            </div>

            {/* Format 3: Авторский надзор */}
            <div className="bg-[#ECEFE8] p-8 sm:p-10 rounded-3xl border border-sage/50 flex flex-col justify-between space-y-8 hover:border-olive/60 transition-all duration-300 shadow-sm group">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl text-graphite font-medium group-hover:text-olive transition-colors">
                    Авторский надзор
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite/70 font-sans font-light leading-relaxed">
                    Кураторское сопровождение реализации от разбивки чертежей на местности до финальной посадки.
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-sage/40">
                  <h4 className="text-xs font-sans font-medium text-graphite/80">Что входит:</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-graphite/75 font-sans">
                    {SERVICES[2].included.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="p-4 bg-olive/10 rounded-2xl border border-olive/20 space-y-1">
                  <span className="font-medium text-graphite text-xs block">Итоговый результат:</span>
                  <p className="text-xs text-graphite/80 font-sans leading-relaxed">{SERVICES[2].result}</p>
                </div>
                <Link
                  href="#contact"
                  className="w-full py-3.5 rounded-full bg-graphite text-milk hover:bg-olive text-center text-xs font-sans font-medium transition-all block shadow-sm"
                >
                  Обсудить авторский надзор
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Architectural Field Checklist Strip */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-gradient-to-r from-graphite via-[#2c3028] to-graphite text-milk p-8 sm:p-12 rounded-3xl border border-graphite-dark space-y-8 shadow-xl">
            <div className="border-b border-white/10 pb-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-milk font-normal">
                Что желательно подготовить перед началом
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-milk/75 font-sans">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-sand/20 text-sand text-xs font-mono font-bold flex items-center justify-center">
                    01
                  </span>
                  <span className="text-sand font-medium text-sm">Кадастровый план и границы</span>
                </div>
                <p className="leading-relaxed">Точные границы участка, расположение дома, существующих строений и подземных коммуникаций.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-sand/20 text-sand text-xs font-mono font-bold flex items-center justify-center">
                    02
                  </span>
                  <span className="text-sand font-medium text-sm">Топосъемка (при рельефе)</span>
                </div>
                <p className="leading-relaxed">Геодезические высотные отметки, перепады высот и подеревная съемка ценных взрослых деревьев.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-sand/20 text-sand text-xs font-mono font-bold flex items-center justify-center">
                    03
                  </span>
                  <span className="text-sand font-medium text-sm">Пожелания семьи</span>
                </div>
                <p className="leading-relaxed">Список обязательных зон: терраса, кострище, огород в коробах, детская площадка, парковка и автополив.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT ANASTASIA & BUREAU */}
      <section id="bureau" className="space-y-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <span className="text-xs sm:text-sm text-olive font-sans font-medium">О бюро</span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
            «Место силы» — бюро авторского ландшафта
          </h2>
          <p className="text-base sm:text-lg text-graphite/70 font-sans font-light max-w-3xl leading-relaxed">
            Мы проектируем природные сады, в которых рельеф, свет, растения и жизненные сценарии владельцев складываются в единое пространство.
          </p>
        </div>

        {/* Main Bio Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAF8F5] p-8 sm:p-16 rounded-2xl border border-sand/40">
            <div className="lg:col-span-5 relative aspect-[649/697] w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-sm bg-sand/10">
              <Image
                src={getImagePath('/images/anastasia_bureau.webp')}
                alt="Анастасия Лацинник — ландшафтный архитектор"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs sm:text-sm text-olive font-sans font-medium">Автор и руководитель</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-graphite font-medium">
                Анастасия Лацинник
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-graphite/80 font-sans font-light leading-relaxed">
                <p>
                  Анастасия создаёт сады, в которых природность не означает случайность, а продуманность не уничтожает ощущение живого пространства.
                </p>
                <p>
                  Для каждого участка формируется индивидуальное художественное и экологическое решение: от исследования существующих деревьев до подбора долговечных натуральных материалов мощения и создания устойчивых матричных цветников.
                </p>
                <p>
                  Бюро берет на себя роль архитектурного куратора: мы разрабатываем концепцию, готовим строительную документацию и контролируем процесс посадки на объекте.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 8. CERTIFICATES */}
      <section id="certificates" className="space-y-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <span className="text-xs sm:text-sm text-olive font-sans font-medium">Сертификаты</span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-graphite font-normal">
            Особый знак внимания
          </h2>
          <p className="text-base sm:text-lg text-graphite/70 font-sans font-light max-w-3xl leading-relaxed">
            Подарок, который расцветает с каждым сезоном. Сертификат на проект сада или цветника — это возможность подарить близким не вещь, а живое пространство для отдыха и радости.
          </p>
        </div>

        {/* Hero Showcase Image */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-sand/20 shadow-sm">
            <Image
              src={getImagePath('/images/certificate_mesto_sily_v2.webp')}
              alt="Подарочный сертификат Место силы"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Formats Grid: Tactile Gift Vouchers */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="border-b border-graphite/10 pb-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
                <span className="text-xs sm:text-sm text-olive font-sans font-medium">
                  Варианты подарка
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-graphite font-normal">
                Два формата сертификата
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Voucher 01 - Цветник */}
            <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border-2 border-sand/60 space-y-8 flex flex-col justify-between relative overflow-hidden shadow-sm hover:border-olive/50 transition-all duration-300 group">
              {/* Top Watermark */}
              <div className="absolute top-0 right-0 p-8 font-serif text-7xl font-light text-graphite/5 select-none pointer-events-none group-hover:text-olive/10 transition-colors">
                01
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <h4 className="font-serif text-3xl sm:text-4xl text-graphite font-medium">
                    Проект уникального цветника
                  </h4>
                  <p className="text-xs sm:text-sm text-graphite/70 font-sans font-light leading-relaxed">
                    Индивидуальная концепция многолетнего цветника, радующего непрерывным цветением с мая по октябрь.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-sand/40">
                  <span className="text-xs font-sans font-medium text-graphite/80 block">Что входит в сертификат:</span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-graphite/80 font-sans">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-olive shrink-0" />
                      <span>Индивидуальный дендроплан и матрица цветника</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-olive shrink-0" />
                      <span>Ведомость устойчивых многолетников и злаков</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-olive shrink-0" />
                      <span>Схема посадки и сезонный календарь ухода</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 relative z-10">
                <div className="p-4 bg-sand/20 rounded-2xl border border-sand/30 flex items-start gap-3 text-xs text-graphite/80 font-sans">
                  <Gift className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <span>Крафтовый тубус с сургучной печатью + персонализированный именной дубликат.</span>
                </div>
              </div>
            </div>

            {/* Voucher 02 - Проект сада */}
            <div className="bg-graphite text-milk p-8 sm:p-12 rounded-3xl border-2 border-ochre/50 space-y-8 flex flex-col justify-between relative overflow-hidden shadow-2xl hover:border-ochre transition-all duration-300">
              {/* Top Watermark */}
              <div className="absolute top-0 right-0 p-8 font-serif text-7xl font-light text-white/5 select-none pointer-events-none">
                02
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <h4 className="font-serif text-3xl sm:text-4xl text-milk font-normal">
                    Полноценный проект сада
                  </h4>
                  <p className="text-xs sm:text-sm text-milk/80 font-sans font-light leading-relaxed">
                    Комплексная концепция ландшафтного пространства участка: зонирование, рельеф, мощение, освещение и озеленение.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="text-xs font-sans font-medium text-sand block">Что входит в сертификат:</span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-milk/90 font-sans">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-ochre shrink-0" />
                      <span>Эскизный генеральный план участка и зонирование</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-ochre shrink-0" />
                      <span>Концепция зон отдыха, мощения и покрытий</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-ochre shrink-0" />
                      <span>Подбор устойчивых растительных сообществ</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-ochre/30 flex items-start gap-3 text-xs text-milk/80 font-sans">
                  <Gift className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
                  <span>Подарочный бокс с альбомом эскизов + генеральный план на плотной бумаге.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 9. CONTACT & INTERACTIVE FORM */}
      <section id="contact" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ContactForm />
        </div>
      </section>

      {/* 10. FINAL ATMOSPHERIC BLOCK */}
      <section className="relative min-h-[55vh] sm:min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center text-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={getImagePath('/images/garden_return_bg.webp')}
            alt="Сад, в который хочется возвращаться — пример ландшафтного дизайна"
            fill
            className="object-cover object-center brightness-[0.85] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/40 to-graphite/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-24 sm:py-36 text-milk flex flex-col items-center justify-center">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-milk drop-shadow-md">
            Сад, в который хочется возвращаться
          </h2>
        </div>
      </section>
    </div>
  );
}
