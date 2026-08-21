# AGENTS.md — Technical Handbook for AI Agents & Developers

Welcome to the codebase for **«Место силы»** (Anastasia Latsinnik's Landscape Bureau).
This document provides a comprehensive technical overview, design specifications, architectural guidelines, Supabase CMS setup, and operating rules for AI agents and developers working on this project.

---

## 1. Project Overview & Positioning

- **Brand Name:** «Место силы» — ландшафтное бюро Анастасии Лацинник
- **Primary Specialization:** Low-maintenance naturalistic gardens for private and public spaces (*Малоуходные сады для частных и общественных территорий*)
- **Core Formula:** *«Сад, в который хочется возвращаться»*
- **Key Positioning:** *«Мы создаём малоуходные сады, в которых природа, архитектура и повседневная жизнь складываются в одно цельное пространство»*
- **Art Direction:** Contemporary natural garden seen through an architectural journal and field notebook.

---

## 2. Technology Stack

- **Framework:** Next.js 15 (App Router, static export ready, React 19)
- **Language:** TypeScript 5.7 (Strict mode enabled)
- **Backend & Database:** Supabase (PostgreSQL, Supabase Auth, Supabase Storage, Row Level Security)
- **Styling System:** Tailwind CSS v3.4 + PostCSS 8 + Autoprefixer
- **Design Tokens:** Defined in `src/app/globals.css` and `tailwind.config.ts`
- **Icons & Animation:** `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`
- **Fonts:**
  - **Headings (Serif):** Google Font `Cormorant Garamond` (Full Cyrillic & Latin support)
  - **Body (Sans-serif):** Google Font `Manrope` (Full Cyrillic & Latin support)

---

## 3. Directory Structure

```
/home/d/Com/AnastasiaL/
├── package.json               # Node.js dependencies & scripts
├── tsconfig.json              # TypeScript configuration (@/* path alias)
├── next.config.mjs            # Next.js configuration (basePath, images, Supabase env defaults)
├── tailwind.config.ts         # Tailwind design tokens & font definitions
├── postcss.config.js          # PostCSS plugin settings
├── supabase/
│   └── schema.sql             # SQL schema, RLS policies, storage bucket & initial seed
├── public/                    # Static assets & photography
│   └── images/                # High-res photography & sketch blueprints (all in .webp)
│       ├── logo_03_blueprint.webp
│       ├── hero_garden_main.webp
│       ├── modern_landscape_realistic.webp
│       ├── anastasia_bureau.webp
│       ├── certificate_mesto_sily_v2.webp
│       ├── garden_return_bg.webp
│       ├── cv_1_toskana.webp
│       ├── cv_2_retrit.webp
│       ├── cv_3_ekspress_plant.webp
│       ├── cv_4_shaman.webp
│       └── sketch_blueprint.webp
└── src/
    ├── app/                   # Next.js App Router routes
    │   ├── layout.tsx         # Global Root Layout (Fonts, Header, Footer, MainWrapper)
    │   ├── globals.css        # Core design tokens, custom utility classes
    │   ├── page.tsx           # Home landing page (Live Client Hydration from Supabase)
    │   ├── admin/
    │   │   ├── page.tsx       # Admin Dashboard (Landing sections, projects, leads, contacts)
    │   │   └── login/
    │   │       └── page.tsx   # Admin Auth (Sign In & Sign Up for admins)
    │   ├── projects/
    │   │   ├── page.tsx       # Filterable projects catalog
    │   │   └── [slug]/
    │   │       └── page.tsx   # Dynamic project showcase template
    │   ├── approach/
    │   │   └── page.tsx       # Philosophy & method deep dive
    │   ├── services/
    │   │   └── page.tsx       # Service formats breakdown
    │   ├── bureau/
    │   │   └── page.tsx       # About Anastasia & partnership model
    │   ├── certificates/
    │   │   └── page.tsx       # Gift certificates overview & order
    │   ├── contact/
    │   │   └── page.tsx       # Contact details & interactive form
    │   ├── privacy/
    │   │   └── page.tsx       # Privacy policy
    │   ├── not-found.tsx      # Custom 404 error page
    │   ├── sitemap.ts         # Automated sitemap generator
    │   └── robots.ts          # Automated robots.txt generator
    ├── components/            # Reusable UI Components
    │   ├── Header.tsx         # Fixed sticky responsive navigation bar
    │   ├── Footer.tsx         # Global footer with direct contact links
    │   ├── ContactForm.tsx    # Interactive contact form (submits leads to Supabase)
    │   ├── ProjectCard.tsx    # Editorial project showcase card
    │   ├── ProjectsSection.tsx# Projects grid showcase
    │   ├── MainWrapper.tsx    # Responsive header spacing controller
    │   └── admin/             # Admin panel editors
    │       ├── HeroEditor.tsx
    │       ├── ManifestoEditor.tsx
    │       ├── ApproachEditor.tsx
    │       ├── ServicesEditor.tsx
    │       ├── BureauEditor.tsx
    │       ├── CertificatesEditor.tsx
    │       ├── FinalBannerEditor.tsx
    │       ├── ContactsEditor.tsx
    │       ├── ProjectsManager.tsx
    │       ├── LeadsManager.tsx
    │       ├── ImageUploadField.tsx
    │       └── SupabaseStatusCard.tsx
    ├── data/                  # Content Data Models & Local Fallbacks
    │   ├── landingDefaults.ts # Default fallback content for all landing sections
    │   ├── projects.ts        # Default fallback projects dataset
    │   ├── services.ts        # Default services dataset
    │   └── notes.ts           # Optional notes dataset
    ├── lib/
    │   └── supabase/          # Supabase Client & Query Layer
    │       ├── client.ts      # Browser Supabase client
    │       ├── server.ts      # Server Supabase client
    │       └── queries.ts     # CRUD queries (site_content, projects, storage, leads)
    ├── types/
    │   ├── index.ts           # Domain definitions (Project, Service)
    │   └── content.ts         # Section content types & ContactRequest types
    └── utils/
        └── image.ts           # Asset path helper with basePath support (getImagePath)
```

---

## 4. Supabase Architecture & Data Layer

### 4.1 Database Tables
1. **`site_content`**: Key-value JSONB store for landing page sections:
   - `key`: `'hero'`, `'manifesto'`, `'approach'`, `'services'`, `'bureau'`, `'certificates'`, `'finalBanner'`, `'contacts'`.
   - `data`: JSONB payload containing texts, badges, arrays, and image paths.
   - `updated_at`: timestamp with time zone.
2. **`projects`**: Portfolio database table (slug, title, subtitle, type, location, area, year, status, cover_image, gallery, task, idea, place_context, plants, materials, scope, description, featured, display_order).
3. **`contact_requests`**: Leads submitted by website visitors from the contact form.

### 4.2 Storage
- Bucket **`site-assets`**: Public read access for images, authenticated upload/delete access for admins.

### 4.3 Client-Side Live Hydration
Because the site is hosted on GitHub Pages (static export), `src/app/page.tsx` and `src/components/ProjectDetailClient.tsx` use client-side hydration (`useEffect` -> `getLandingContent()`) to pull live modifications from Supabase in real-time, eliminating any need to re-trigger GitHub build workflows when content is edited in `/admin`.

---

## 5. Design System & Palette

### Color Tokens

| Token Name | Hex Code | Purpose |
|---|---|---|
| `milk` | `#F3F0E8` | Primary warm background |
| `milk-light` | `#FAF8F5` | Card containers & section background |
| `sand` | `#D7C9B5` | Subtle accents, borders, tags |
| `sage` | `#AAB2A0` | Natural secondary green |
| `olive` | `#66705A` | Primary brand accent color |
| `graphite` | `#252722` | Primary dark text, dark section backgrounds |
| `ochre` | `#B98543` | Warm earthy highlight accent |

### Typography Tokens

- Headings (`h1`, `h2`, `h3`, `h4`): `font-serif` (`Cormorant Garamond`), `font-weight: 500`, tracking `-0.01em`.
- Body text: `font-sans` (`Manrope`), clean reading experience.

---

## 6. Image Paths & BasePath Standard

All local static image paths in components **MUST** be wrapped with `getImagePath(...)` from `@/utils/image` to prevent `404 Not Found` errors on GitHub Pages sub-paths (e.g. `/AnastasiaL/`):

```tsx
import { getImagePath } from '@/utils/image';

<Image src={getImagePath('/images/logo_03_blueprint.webp')} alt="..." />
```

---

## 7. Key Business & Positioning Constraints

When modifying content or adding new pages:

1. **NO FAKE FACTS:** Never invent unverified personal biography, awards, pricing, project square footage, or fake client testimonials. Use editable placeholders clearly structured for future replacement.
2. **TERMINOLOGY:** Use *"малоуходный сад"* (low-maintenance garden). **NEVER** use *"сад без ухода"* (carefree/no-maintenance garden) or *"сакральный"*.
3. **ROLE DEFINITION:** Anastasia is the **Author of Concept, Designer, and Curator of Supervision** (*автор концепции, проектировщик и куратор реализации*). She is not presented as a turnkey contractor doing manual bricklaying or tree digging personally.
4. **CONTACT DETAILS:**
   - Phone: `+7 929 813-10-13` (`tel:+79298131013`)
   - Email: `nastasia.latsinnik@yandex.ru` (`mailto:nastasia.latsinnik@yandex.ru`)
   - WhatsApp: `https://wa.me/79298131013`

---

## 8. Verification & Build Commands

Do **NOT** run `npm run build` automatically after every minor edit or change. Only run build or typechecks when explicitly requested by the user or when doing major refactorings/final deployment steps.
