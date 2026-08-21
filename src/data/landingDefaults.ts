import {
  HeroSectionData,
  ManifestoSectionData,
  ApproachSectionData,
  ServicesSectionData,
  BureauSectionData,
  CertificatesSectionData,
  FinalBannerSectionData,
  GlobalContactsData,
  LandingContent,
} from '@/types';
import { SERVICES } from './services';

export const DEFAULT_HERO: HeroSectionData = {
  titleLine1: 'Ландшафтное бюро',
  titleLine2: 'Анастасии Лацинник',
  subtitle:
    'Малоуходные сады для частных и общественных территорий — от первой идеи до рабочих чертежей и авторского надзора.',
  primaryBtnText: 'Обсудить свой сад',
  primaryBtnLink: '#contact',
  secondaryBtnText: 'Смотреть проекты',
  secondaryBtnLink: '#projects',
  badges: ['Концепция', 'Проектирование', 'Авторский надзор'],
  bgImage: '/images/hero_garden_main.webp',
};

export const DEFAULT_MANIFESTO: ManifestoSectionData = {
  badge: 'Манифест',
  title: 'Сад — это место, которое помогает жить.',
  description:
    'Сад создаётся не ради декоративного оформления участка. Он появляется из образа жизни: из желания быть на воздухе, отдыхать в тишине, принимать близких, наблюдать смену сезонов и каждый день чувствовать связь с местом.',
  features: [
    {
      title: 'Природа и архитектура',
      text: 'Единая пространственная система без лишних декоративных барьеров.',
    },
    {
      title: 'Устойчивость',
      text: 'Растения подбираются под естественный климат и состав почвы.',
    },
    {
      title: 'Сезонная динамика',
      text: 'Красота, выстроенная на все 12 месяцев года.',
    },
  ],
};

export const DEFAULT_APPROACH: ApproachSectionData = {
  badge: 'Метод',
  title: 'У каждого места свой характер',
  description:
    'Мы не начинаем с готового стиля. Сначала смотрим, что уже есть на участке и какие возможности в нём скрыты.',
  image: '/images/modern_landscape_realistic.webp',
  subBadge: 'Архитектурный манифест',
  subTitle: 'Фундамент нашего метода',
  pillars: [
    {
      id: '01',
      num: '01',
      title: 'Чтение места',
      text: 'Мы не приносим готовые визуальные штампы. Сад рождается из характера рельефа, типа почвы, движения солнца, розы ветров и существующей растительности.',
      icon: 'Sun',
      bgClass: 'bg-[#FAF8F5]',
      borderClass: 'border-sand/50 hover:border-olive/50',
      iconBg: 'bg-ochre/15',
      iconColor: 'text-ochre',
      colSpan: 'col-span-12 lg:col-span-7',
    },
    {
      id: '02',
      num: '02',
      title: 'Растительные матрицы',
      text: 'Вместо случайного набора одиночных растений мы выстраиваем матрицы многолетников и злаков, которые поддерживают друг друга и создают устойчивый биоценоз.',
      icon: 'Leaf',
      bgClass: 'bg-[#F5F7F2]',
      borderClass: 'border-sage/30 hover:border-olive/40 lg:mt-6',
      iconBg: 'bg-olive/10',
      iconColor: 'text-olive',
      colSpan: 'col-span-12 lg:col-span-5',
    },
    {
      id: '03',
      num: '03',
      title: 'Всесезонность',
      text: 'Сад не рассчитан на один эффектный месяц. Мы проектируем непрерывную динамику: от пробуждения первоцветов до графики зимних сухоцветов.',
      icon: 'Clock',
      bgClass: 'bg-[#FAF8F5]',
      borderClass: 'border-sand/40 hover:border-olive/50 lg:-mt-2',
      iconBg: 'bg-ochre/15',
      iconColor: 'text-ochre',
      colSpan: 'col-span-12 md:col-span-6 lg:col-span-4',
    },
    {
      id: '04',
      num: '04',
      title: 'Материалы и архитектура',
      text: 'Натуральный камень, лиственница, песчаник, галька и металл. Материалы благородно стареют, не теряя тактильности и прочности с годами.',
      icon: 'Layers',
      bgClass: 'bg-[#F5EFE6]',
      borderClass: 'border-sand/60 hover:border-olive/50 lg:mt-5',
      iconBg: 'bg-graphite/10',
      iconColor: 'text-graphite',
      colSpan: 'col-span-12 md:col-span-6 lg:col-span-4',
    },
    {
      id: '05',
      num: '05',
      title: 'Расчетный объём ухода',
      text: 'Заранее закладывается понятный график внимания. Сад остаётся красивым без необходимости постоянных ежедневных садовых работ.',
      icon: 'ShieldCheck',
      bgClass: 'bg-[#FAF8F5]',
      borderClass: 'border-olive/30 hover:border-olive/60 lg:-mt-4',
      iconBg: 'bg-olive/15',
      iconColor: 'text-olive',
      colSpan: 'col-span-12 lg:col-span-4',
    },
  ],
};

export const DEFAULT_SERVICES_SECTION: ServicesSectionData = {
  badge: 'Форматы взаимодействия',
  title: 'Форматы работы и проектирования',
  services: SERVICES,
  additionalTitle: 'Дополнительные услуги',
  additionalSubtitle:
    'Отдельные направления и инженерно-ландшафтные этапы, которые можно заказать как в комплексе, так и точечно',
  additionalServices: [
    { title: 'Проектирование', icon: 'Compass', bgCircle: '#EAE4DC', iconColor: '#7A6B58' },
    { title: 'Озеленение', icon: 'Sprout', bgCircle: '#E5ECE1', iconColor: '#55694C' },
    { title: 'Автополив', icon: 'Droplets', bgCircle: '#E0EBF0', iconColor: '#4A7285' },
    { title: 'Освещение', icon: 'Lightbulb', bgCircle: '#F5ECE0', iconColor: '#9E6E38' },
    { title: 'Мощение', icon: 'Grid3X3', bgCircle: '#E6E6E3', iconColor: '#555850' },
  ],
  checklistTitle: 'Что желательно подготовить перед началом',
  checklist: [
    {
      step: '01',
      title: 'Кадастровый план и границы',
      text: 'Точные границы участка, расположение дома, существующих строений и подземных коммуникаций.',
    },
    {
      step: '02',
      title: 'Топосъемка (при рельефе)',
      text: 'Геодезические высотные отметки, перепады высот и подеревная съемка ценных взрослых деревьев.',
    },
    {
      step: '03',
      title: 'Пожелания семьи',
      text: 'Список обязательных зон: терраса, кострище, огород в коробах, детская площадка, парковка и автополив.',
    },
  ],
};

export const DEFAULT_BUREAU: BureauSectionData = {
  badge: 'О бюро',
  title: 'Сначала слушаю, потом создаю',
  subtitle: 'Проектирую природные сады с заботой о воплощении вашей мечты.',
  image: '/images/anastasia_bureau.webp',
  role: 'Автор и руководитель',
  name: 'Анастасия Лацинник',
  subheading: 'Для меня важны детали',
  paragraphs: [
    'У каждого дома есть своя история. И у каждой семьи — своё представление о том, как должна проходить жизнь за его стенами.',
    'Я начинаю проект не с растений и не с красивой картинки. Я начинаю с разговора с вами.',
    'Мне важно понять, как вы живёте, что любите, чего вам не хватает и какое состояние вы хотите чувствовать, находясь в своём саду.',
  ],
};

export const DEFAULT_CERTIFICATES: CertificatesSectionData = {
  badge: 'Сертификаты',
  title: 'Особый знак внимания',
  subtitle:
    'Подарок, который расцветает с каждым сезоном. Сертификат на проект сада или цветника — это возможность подарить близким не вещь, а живое пространство для отдыха и радости.',
  image: '/images/certificate_mesto_sily_v2.webp',
  subTitle: 'Два формата сертификата',
  vouchers: [
    {
      id: 'voucher-1',
      num: '01',
      title: 'Проект уникального цветника',
      description:
        'Индивидуальная концепция многолетнего цветника, радующего непрерывным цветением с мая по октябрь.',
      items: [
        'Индивидуальный дендроплан и матрица цветника',
        'Ведомость устойчивых многолетников и злаков',
        'Схема посадки и сезонный календарь ухода',
      ],
      deliveryNote: 'Крафтовый тубус с сургучной печатью + персонализированный именной дубликат.',
      variant: 'light',
    },
    {
      id: 'voucher-2',
      num: '02',
      title: 'Полноценный проект сада',
      description:
        'Комплексная концепция ландшафтного пространства участка: зонирование, рельеф, мощение, освещение и озеленение.',
      items: [
        'Эскизный генеральный план участка и зонирование',
        'Концепция зон отдыха, мощения и покрытий',
        'Подбор устойчивых растительных сообществ',
      ],
      deliveryNote: 'Подарочный бокс с альбомом эскизов + генеральный план на плотной бумаге.',
      variant: 'dark',
    },
  ],
};

export const DEFAULT_FINAL_BANNER: FinalBannerSectionData = {
  title: 'Сад, в который хочется возвращаться',
  bgImage: '/images/garden_return_bg.webp',
};

export const DEFAULT_CONTACTS: GlobalContactsData = {
  phone: '+7 929 813-10-13',
  phoneRaw: '+79298131013',
  email: 'nastasia.latsinnik@yandex.ru',
  whatsapp: 'https://wa.me/79298131013',
  telegram: '',
  instagram: '',
  copyright: 'Ландшафтное бюро Анастасии Лацинник',
};

export const DEFAULT_LANDING_CONTENT: LandingContent = {
  hero: DEFAULT_HERO,
  manifesto: DEFAULT_MANIFESTO,
  approach: DEFAULT_APPROACH,
  services: DEFAULT_SERVICES_SECTION,
  bureau: DEFAULT_BUREAU,
  certificates: DEFAULT_CERTIFICATES,
  finalBanner: DEFAULT_FINAL_BANNER,
  contacts: DEFAULT_CONTACTS,
};
