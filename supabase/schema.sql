-- ==============================================================================
-- СХЕМА БАЗЫ ДАННЫХ SUPABASE ДЛЯ «МЕСТО СИЛЫ» (Ландшафтное бюро Анастасии Лацинник)
-- ==============================================================================
-- Запустите этот скрипт в разделе SQL Editor в вашей панели управления Supabase.

-- 1. Расширение UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. ТАБЛИЦА КОНТЕНТА ЛЕНДИНГА (site_content)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. ТАБЛИЦА ПРОЕКТОВ (projects)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    type TEXT NOT NULL,
    location TEXT,
    area TEXT,
    year TEXT,
    status TEXT NOT NULL DEFAULT 'completed',
    cover_image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    task TEXT,
    idea TEXT,
    place_context TEXT,
    plants TEXT[] DEFAULT '{}',
    materials TEXT[] DEFAULT '{}',
    scope TEXT[] DEFAULT '{}',
    description TEXT,
    featured BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 4. ТАБЛИЦА ЗАЯВОК С ФОРМЫ САЙТА (contact_requests)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    location TEXT,
    service_type TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 5. НАСТРОЙКА STORAGE (Хранилище изображений)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ==============================================================================
-- 6. БЕЗОПАСНОСТЬ: ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Включаем RLS для всех таблиц
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- 6.1 Политики для site_content
-- Чтение: доступно всем (публично)
CREATE POLICY "Public read site_content" 
ON public.site_content FOR SELECT 
USING (true);

-- Запись/Обновление/Удаление: только авторизованный админ
CREATE POLICY "Admin manage site_content" 
ON public.site_content FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6.2 Политики для projects
-- Чтение: доступно всем
CREATE POLICY "Public read projects" 
ON public.projects FOR SELECT 
USING (true);

-- Управление: только авторизованный админ
CREATE POLICY "Admin manage projects" 
ON public.projects FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6.3 Политики для contact_requests
-- Создание заявки: доступно любому посетителю лендинга
CREATE POLICY "Public insert contact_requests" 
ON public.contact_requests FOR INSERT 
TO public 
WITH CHECK (true);

-- Просмотр и редактирование заявок: только авторизованный админ
CREATE POLICY "Admin manage contact_requests" 
ON public.contact_requests FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6.4 Политики для хранилища site-assets
CREATE POLICY "Public read site-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

CREATE POLICY "Admin upload site-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY "Admin update site-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets');

CREATE POLICY "Admin delete site-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-assets');

-- ==============================================================================
-- 7. НАЧАЛЬНЫЙ СИД КОНТЕНТА (DEFAULT SEED)
-- ==============================================================================

-- 7.1 Секция Hero
INSERT INTO public.site_content (key, data) VALUES (
    'hero',
    '{
        "titleLine1": "Ландшафтное бюро",
        "titleLine2": "Анастасии Лацинник",
        "subtitle": "Малоуходные сады для частных и общественных территорий — от первой идеи до рабочих чертежей и авторского надзора.",
        "primaryBtnText": "Обсудить свой сад",
        "primaryBtnLink": "#contact",
        "secondaryBtnText": "Смотреть проекты",
        "secondaryBtnLink": "#projects",
        "badges": ["Концепция", "Проектирование", "Авторский надзор"],
        "bgImage": "/images/hero_garden_main.webp"
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- 7.2 Секция Манифест
INSERT INTO public.site_content (key, data) VALUES (
    'manifesto',
    '{
        "badge": "Манифест",
        "title": "Сад — это место, которое помогает жить.",
        "description": "Сад создаётся не ради декоративного оформления участка. Он появляется из образа жизни: из желания быть на воздухе, отдыхать в тишине, принимать близких, наблюдать смену сезонов и каждый день чувствовать связь с местом.",
        "features": [
            {
                "title": "Природа и архитектура",
                "text": "Единая пространственная система без лишних декоративных барьеров."
            },
            {
                "title": "Устойчивость",
                "text": "Растения подбираются под естественный климат и состав почвы."
            },
            {
                "title": "Сезонная динамика",
                "text": "Красота, выстроенная на все 12 месяцев года."
            }
        ]
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- 7.3 Секция Метод и столпы
INSERT INTO public.site_content (key, data) VALUES (
    'approach',
    '{
        "badge": "Метод",
        "title": "У каждого места свой характер",
        "description": "Мы не начинаем с готового стиля. Сначала смотрим, что уже есть на участке и какие возможности в нём скрыты.",
        "image": "/images/modern_landscape_realistic.webp",
        "subBadge": "Архитектурный манифест",
        "subTitle": "Фундамент нашего метода",
        "pillars": [
            {
                "id": "01",
                "num": "01",
                "title": "Чтение места",
                "text": "Мы не приносим готовые визуальные штампы. Сад рождается из характера рельефа, типа почвы, движения солнца, розы ветров и существующей растительности.",
                "icon": "Sun",
                "bgClass": "bg-[#FAF8F5]",
                "borderClass": "border-sand/50 hover:border-olive/50",
                "iconBg": "bg-ochre/15",
                "iconColor": "text-ochre",
                "colSpan": "col-span-12 lg:col-span-7"
            },
            {
                "id": "02",
                "num": "02",
                "title": "Растительные матрицы",
                "text": "Вместо случайного набора одиночных растений мы выстраиваем матрицы многолетников и злаков, которые поддерживают друг друга и создают устойчивый биоценоз.",
                "icon": "Leaf",
                "bgClass": "bg-[#F5F7F2]",
                "borderClass": "border-sage/30 hover:border-olive/40 lg:mt-6",
                "iconBg": "bg-olive/10",
                "iconColor": "text-olive",
                "colSpan": "col-span-12 lg:col-span-5"
            },
            {
                "id": "03",
                "num": "03",
                "title": "Всесезонность",
                "text": "Сад не рассчитан на один эффектный месяц. Мы проектируем непрерывную динамику: от пробуждения первоцветов до графики зимних сухоцветов.",
                "icon": "Clock",
                "bgClass": "bg-[#FAF8F5]",
                "borderClass": "border-sand/40 hover:border-olive/50 lg:-mt-2",
                "iconBg": "bg-ochre/15",
                "iconColor": "text-ochre",
                "colSpan": "col-span-12 md:col-span-6 lg:col-span-4"
            },
            {
                "id": "04",
                "num": "04",
                "title": "Материалы и архитектура",
                "text": "Натуральный камень, лиственница, песчаник, галька и металл. Материалы благородно стареют, не теряя тактильности и прочности с годами.",
                "icon": "Layers",
                "bgClass": "bg-[#F5EFE6]",
                "borderClass": "border-sand/60 hover:border-olive/50 lg:mt-5",
                "iconBg": "bg-graphite/10",
                "iconColor": "text-graphite",
                "colSpan": "col-span-12 md:col-span-6 lg:col-span-4"
            },
            {
                "id": "05",
                "num": "05",
                "title": "Расчетный объём ухода",
                "text": "Заранее закладывается понятный график внимания. Сад остаётся красивым без необходимости постоянных ежедневных садовых работ.",
                "icon": "ShieldCheck",
                "bgClass": "bg-[#FAF8F5]",
                "borderClass": "border-olive/30 hover:border-olive/60 lg:-mt-4",
                "iconBg": "bg-olive/15",
                "iconColor": "text-olive",
                "colSpan": "col-span-12 lg:col-span-4"
            }
        ]
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- 7.4 Секция Услуги
INSERT INTO public.site_content (key, data) VALUES (
    'services',
    '{
        "badge": "Форматы взаимодействия",
        "title": "Форматы работы и проектирования",
        "services": [
            {
                "slug": "koncepciya-sada",
                "title": "Концепция сада",
                "shortDescription": "Идея, пространственная логика, зонирование, настроение, подбор материалов и ключевых растительных сообществ.",
                "fullDescription": "Фундаментальный этап проектирования, на котором формируется главный образ будущего пространства.",
                "result": "Альбом концепции сада с эскизами, генеральным планом зонирования, стилевыми коллажами, подборкой материалов и ведомостью основных растений.",
                "duration": "Ориентировочно 30 дней",
                "included": [
                    "Анализ рельефа, света, почвы и архитектуры дома",
                    "Формирование функционального зонирования",
                    "Эскизный генеральный план",
                    "Стилевые коллажи и атмосфера пространства",
                    "Концептуальный подбор ассортимента растений",
                    "Рекомендации по материалам и покрытиям"
                ]
            },
            {
                "slug": "koncepciya-i-rabochaya-dokumentaciya",
                "title": "Концепция и рабочая документация",
                "shortDescription": "Полный комплекс чертежей и схем, готовый для передачи подрядчикам и точной строительной реализации.",
                "fullDescription": "Исчерпывающий проектный пакет, переносящий художественную идею концепции на язык точных инженерных чертежей.",
                "result": "Полный комплект рабочей документации, включая дендроплан, разбивочные чертежи, схемы освещения и ведомости объемов.",
                "duration": "Ориентировочно 60 дней",
                "included": [
                    "Все материалы этапа «Концепция сада»",
                    "Генеральный план с точной привязкой элементов",
                    "Дендроплан и детальная посадочная ведомость",
                    "Разбивочный чертёж элементов благоустройства",
                    "Схема садового освещения и группы выключателей",
                    "Схема вертикальной планировки и водоотвода",
                    "Ведомость объемов материалов и посадочного материала"
                ]
            },
            {
                "slug": "avtorskij-nadzor",
                "title": "Авторский надзор",
                "shortDescription": "Кураторское сопровождение реализации от разбивки чертежей на местности до финальной посадки.",
                "fullDescription": "Личное участие автора проекта на этапе реализации.",
                "result": "Точное воплощение проектного замысла в жизнь без случайных отклонений и упрощений со стороны подрядчиков.",
                "duration": "До завершения реализации",
                "included": [
                    "Регулярные выезды на объект на ключевых этапах",
                    "Проверка разбивки линий мощения и рельефа",
                    "Контроль качества поставляемых растений и материалов",
                    "Участие в расстановке крупномеров и кустарников перед посадкой",
                    "Внесение необходимых оперативных корректировок в чертежи"
                ]
            }
        ],
        "additionalTitle": "Дополнительные услуги",
        "additionalSubtitle": "Отдельные направления и инженерно-ландшафтные этапы, которые можно заказать как в комплексе, так и точечно",
        "additionalServices": [
            { "title": "Проектирование", "icon": "Compass", "bgCircle": "#EAE4DC", "iconColor": "#7A6B58" },
            { "title": "Озеленение", "icon": "Sprout", "bgCircle": "#E5ECE1", "iconColor": "#55694C" },
            { "title": "Автополив", "icon": "Droplets", "bgCircle": "#E0EBF0", "iconColor": "#4A7285" },
            { "title": "Освещение", "icon": "Lightbulb", "bgCircle": "#F5ECE0", "iconColor": "#9E6E38" },
            { "title": "Мощение", "icon": "Grid3X3", "bgCircle": "#E6E6E3", "iconColor": "#555850" }
        ],
        "checklistTitle": "Что желательно подготовить перед началом",
        "checklist": [
            {
                "step": "01",
                "title": "Кадастровый план и границы",
                "text": "Точные границы участка, расположение дома, существующих строений и подземных коммуникаций."
            },
            {
                "step": "02",
                "title": "Топосъемка (при рельефе)",
                "text": "Геодезические высотные отметки, перепады высот и подеревная съемка ценных взрослых деревьев."
            },
            {
                "step": "03",
                "title": "Пожелания семьи",
                "text": "Список обязательных зон: терраса, кострище, огород в коробах, детская площадка, парковка и автополив."
            }
        ]
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- 7.5 Секция О бюро
INSERT INTO public.site_content (key, data) VALUES (
    'bureau',
    '{
        "badge": "О бюро",
        "title": "Сначала слушаю, потом создаю",
        "subtitle": "Проектирую природные сады с заботой о воплощении вашей мечты.",
        "image": "/images/anastasia_bureau.webp",
        "role": "Автор и руководитель",
        "name": "Анастасия Лацинник",
        "subheading": "Для меня важны детали",
        "paragraphs": [
            "У каждого дома есть своя история. И у каждой семьи — своё представление о том, как должна проходить жизнь за его стенами.",
            "Я начинаю проект не с растений и не с красивой картинки. Я начинаю с разговора с вами.",
            "Мне важно понять, как вы живёте, что любите, чего вам не хватает и какое состояние вы хотите чувствовать, находясь в своём саду."
        ]
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- 7.6 Секция Сертификаты
INSERT INTO public.site_content (key, data) VALUES (
    'certificates',
    '{
        "badge": "Сертификаты",
        "title": "Особый знак внимания",
        "subtitle": "Подарок, который расцветает с каждым сезоном. Сертификат на проект сада или цветника — это возможность подарить близким не вещь, а живое пространство для отдыха и радости.",
        "image": "/images/certificate_mesto_sily_v2.webp",
        "subTitle": "Два формата сертификата",
        "vouchers": [
            {
                "id": "voucher-1",
                "num": "01",
                "title": "Проект уникального цветника",
                "description": "Индивидуальная концепция многолетнего цветника, радующего непрерывным цветением с мая по октябрь.",
                "items": [
                    "Индивидуальный дендроплан и матрица цветника",
                    "Ведомость устойчивых многолетников и злаков",
                    "Схема посадки и сезонный календарь ухода"
                ],
                "deliveryNote": "Крафтовый тубус с сургучной печатью + персонализированный именной дубликат.",
                "variant": "light"
            },
            {
                "id": "voucher-2",
                "num": "02",
                "title": "Полноценный проект сада",
                "description": "Комплексная концепция ландшафтного пространства участка: зонирование, рельеф, мощение, освещение и озеленение.",
                "items": [
                    "Эскизный генеральный план участка и зонирование",
                    "Концепция зон отдыха, мощения и покрытий",
                    "Подбор устойчивых растительных сообществ"
                ],
                "deliveryNote": "Подарочный бокс с альбомом эскизов + генеральный план на плотной бумаге.",
                "variant": "dark"
            }
        ]
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- 7.7 Секция Финальный баннер
INSERT INTO public.site_content (key, data) VALUES (
    'finalBanner',
    '{
        "title": "Сад, в который хочется возвращаться",
        "bgImage": "/images/garden_return_bg.webp"
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- 7.8 Секция Глобальные контакты
INSERT INTO public.site_content (key, data) VALUES (
    'contacts',
    '{
        "phone": "+7 929 813-10-13",
        "phoneRaw": "+79298131013",
        "email": "nastasia.latsinnik@yandex.ru",
        "whatsapp": "https://wa.me/79298131013",
        "telegram": "",
        "instagram": "",
        "copyright": "Ландшафтное бюро Анастасии Лацинник"
    }'::jsonb
) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

-- ==============================================================================
-- 8. НАЧАЛЬНЫЙ СИД ПРОЕКТОВ (projects)
-- ==============================================================================
INSERT INTO public.projects (
    slug, title, subtitle, type, area, year, status, cover_image, gallery, task, idea, place_context, plants, materials, scope, description, featured, display_order
) VALUES 
(
    'toskana',
    'Тоскана',
    'Средиземноморский мотив в природном саду с террасами и тёплыми фактурами',
    'Частный сад',
    'Площадь в согласовании',
    '2025–2026',
    'completed',
    '/images/cv_1_toskana.webp',
    ARRAY['/images/cv_1_toskana.webp', '/images/sketch_blueprint.webp', '/images/hero_garden_main.webp'],
    'Сформировать атмосферу средиземноморской виллы с открытыми террасами, устойчивыми к климату аналогами южных растений и фактурным мощением из тёплого камня.',
    'Использование засухоустойчивых трав, шалфеев, котовников, злаков и стриженых форм в сочетании с натуральным песчаником и терракотой. Природная пластика и свет.',
    'Открытый солнечный склон с хорошей инсоляцией и дренированными почвами.',
    ARRAY['Шалфей дубравный', 'Котовник Фассена', 'Можжевельник скальный', 'Лаванда узколистная', 'Перовския лебедолистная', 'Вейник остроцветковый'],
    ARRAY['Песчаник тёплого оттенка', 'Гравийная отсыпка', 'Терракота', 'Архитектурный бетон'],
    ARRAY['Концепция зонирования и террасирования', 'Дендроплан и ассортиментная ведомость', 'Схема мощения и подпорных стенок', 'Авторский надзор'],
    'Пространство, наполненное светом, ароматами пряных трав и теплом натурального камня, адаптированное под местный климат.',
    true,
    0
),
(
    'retritnyj-tsentr',
    'Ретритный центр',
    'Ландшафтное пространство для практик, уединения и созерцания',
    'Общественное пространство',
    'Площадь в согласовании',
    '2025–2026',
    'in-progress',
    '/images/cv_2_retrit.webp',
    ARRAY['/images/cv_2_retrit.webp', '/images/sketch_blueprint.webp', '/images/garden_return_bg.webp'],
    'Создать умиротворяющую природную среду для ретритного комплекса: площадки для групповых практик на открытом воздухе, маршруты для прогулок и уединённые зоны отдыха.',
    'Минималистичные деревянные настилы, мягкие волны злаковых массивов, медитативные пошаговые дорожки и естественные водные акценты, растворяющие границы между человеком и природой.',
    'Лесной и луговой ландшафт с перепадами высот, полутенью и естественным водотоком.',
    ARRAY['Щучка дернистая', 'Молиния голубая', 'Ирис сибирский', 'Мята и душица', 'Папоротник мужской', 'Сосна горная'],
    ARRAY['Массив лиственницы', 'Речная галька', 'Колотый гранит', 'Скрытая подсветка тёплого спектра 2700K'],
    ARRAY['Генеральный план территории', 'Сценарии освещения и навигации', 'Дендрологический проект', 'Проектирование деревянных платформ'],
    'Гармоничная среда, настраивающая на замедление, глубокий отдых и контакт с природой.',
    true,
    1
),
(
    'ekspress-plant',
    'Экспресс-плант',
    'Быстрое и выразительное преображение ключевых зон сада и цветников',
    'Цветники и посадки',
    'Площадь в согласовании',
    '2025',
    'completed',
    '/images/cv_3_ekspress_plant.webp',
    ARRAY['/images/cv_3_ekspress_plant.webp', '/images/sketch_blueprint.webp', '/images/hero_garden_main.webp'],
    'Оперативная разработка и посадка объёмных природных цветников и акцентных растительных композиций без масштабных земляных и строительных работ.',
    'Плотная матричная посадка крупномерных многолетников и структурных трав, создающая законченный декоративный эффект уже в первый сезон.',
    'Придомовые зоны, входные группы и террасы с подготовленным грунтом.',
    ARRAY['Эхинацея пурпурная', 'Астильба китайская', 'Кровохлёбка лекарственная', 'Осока пальмолистная', 'Герань розанна', 'Рудбекия'],
    ARRAY['Органическая мульча из коры', 'Стальной бордюрный профиль', 'Гранитный отсев'],
    ARRAY['Экспресс-дендроплан', 'Схема посадки и карта расстояний', 'Подбор растений из проверенных питомников', 'Кураторство высадки на объекте'],
    'Эффективный формат для тех, кто хочет быстро оживить придомовую территорию, входную группу или террасу выразительными природными посадками.',
    true,
    2
),
(
    'shamanskij-sad',
    'Шаманский сад',
    'Атмосферный сад с костровой зоной, травами и аутентичной природной эстетикой',
    'Частный сад',
    'Площадь в согласовании',
    '2026',
    'documentation',
    '/images/cv_4_shaman.webp',
    ARRAY['/images/cv_4_shaman.webp', '/images/sketch_blueprint.webp', '/images/garden_return_bg.webp'],
    'Спроектировать глубоко индивидуальное пространство вокруг костровой зоны с использованием дикоросов, фактурных валунов, хвойных акцентов и пряных трав.',
    'Архетипические образы северной природы, очаг в окружении мхов, вересков, полыней и можжевельников. Сад как место внутренней тишины и восстановления сил.',
    'Уединённый лесной участок с выраженной тенью и участками открытого солнца.',
    ARRAY['Полынь Шмидта', 'Можжевельник обыкновенный', 'Вереск обыкновенный', 'Тимьян ползучий', 'Тысячелистник', 'Овсяница сизая'],
    ARRAY['Необработанные валуны', 'Костровая чаша из кортеновской стали', 'Обожжённое дерево', 'Базальтовая крошка'],
    ARRAY['Концепция костровой зоны и очага', 'Подбор тактильных и фактурных материалов', 'Дендроплан пряно-ароматических трав', 'План художественной подсветки'],
    'Таинственный и тактильный сад, в котором вечерний огонь, аромат трав и текстура дикого камня создают неповторимую атмосферу.',
    true,
    3
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    type = EXCLUDED.type,
    area = EXCLUDED.area,
    year = EXCLUDED.year,
    status = EXCLUDED.status,
    cover_image = EXCLUDED.cover_image,
    gallery = EXCLUDED.gallery,
    task = EXCLUDED.task,
    idea = EXCLUDED.idea,
    place_context = EXCLUDED.place_context,
    plants = EXCLUDED.plants,
    materials = EXCLUDED.materials,
    scope = EXCLUDED.scope,
    description = EXCLUDED.description,
    featured = EXCLUDED.featured,
    display_order = EXCLUDED.display_order;
