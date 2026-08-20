# AGENTS.md — Technical Handbook for AI Agents

Welcome to the codebase for **«Место силы»** (Anastasia Latsinnik's Landscape Bureau).
This document provides a comprehensive technical overview, design specifications, architectural guidelines, and operating rules for AI agents working on this project.

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
- **Styling System:** Tailwind CSS v3.4 + PostCSS 8 + Autoprefixer
- **Design Tokens:** Defined in `src/app/globals.css` and `tailwind.config.ts`
- **Icons & Animation:** `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`
- **Fonts:**
  - **Headings (Serif):** Google Font `Cormorant Garamond` (Full Cyrillic & Latin support)
  - **Body (Sans-serif):** Google Font `Manrope` (Full Cyrillic & Latin support)

---

## 3. Directory Structure

```
/home/d/Comm/AnastasiaL/
├── package.json               # Node.js dependencies & scripts
├── tsconfig.json              # TypeScript configuration (@/* path alias)
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind design tokens & font definitions
├── postcss.config.js          # PostCSS plugin settings
├── public/                    # Static assets & photography
│   └── images/                # High-res photography & sketch blueprints
│       ├── hero_garden_main.jpg
│       ├── anastasia_bureau.jpg
│       ├── project_sosny.jpg
│       ├── project_lug.jpg
│       ├── project_patio.jpg
│       ├── project_water.jpg
│       ├── sketch_blueprint.jpg
│       ├── garden_return_bg.jpg
│       └── certificate_gift.jpg
└── src/
    ├── app/                   # Next.js App Router routes
    │   ├── layout.tsx         # Global Root Layout (Fonts, Header, Footer)
    │   ├── globals.css        # Core design tokens, custom utility classes
    │   ├── page.tsx           # Home landing page (10 key spec sections)
    │   ├── projects/
    │   │   ├── page.tsx       # Filterable projects catalog
    │   │   └── [slug]/
    │   │       └── page.tsx   # Dynamic project showcase template (Async Params)
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
    │   ├── ContactForm.tsx    # Interactive contact form (validation + success)
    │   └── ProjectCard.tsx    # Editorial project showcase card
    ├── data/                  # Content Data Models
    │   ├── projects.ts        # Project dataset
    │   ├── services.ts        # Work formats dataset
    │   └── notes.ts           # Optional notes dataset
    └── types/
        └── index.ts           # Domain TypeScript definitions
```

---

## 4. Design System & Palette

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

## 5. Domain Content Models

### `Project` (`src/types/index.ts`)
```ts
export type ProjectStatus = "concept" | "documentation" | "in-progress" | "completed";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  type: string;
  location?: string;
  area?: string;
  year?: string;
  status: ProjectStatus;
  coverImage: string;
  gallery: string[];
  task?: string;
  idea?: string;
  placeContext?: string;
  plants?: string[];
  materials?: string[];
  scope?: string[];
  description?: string;
  featured: boolean;
};
```

### `Service` (`src/types/index.ts`)
```ts
export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  result: string;
  duration?: string;
  included: string[];
};
```

---

## 6. Key Business & Positioning Constraints

When modifying content or adding new pages:

1. **NO FAKE FACTS:** Never invent unverified personal biography, awards, pricing, project square footage, or fake client testimonials. Use editable placeholders clearly structured for future replacement.
2. **TERMINOLOGY:** Use *"малоуходный сад"* (low-maintenance garden). **NEVER** use *"сад без ухода"* (carefree/no-maintenance garden) or *"сакральный"*.
3. **ROLE DEFINITION:** Anastasia is the **Author of Concept, Designer, and Curator of Supervision** (*автор концепции, проектировщик и куратор реализации*). She is not presented as a turnkey contractor doing manual bricklaying or tree digging personally.
4. **CONTACT DETAILS:**
   - Phone: `+7 929 813-10-13` (`tel:+79298131013`)
   - Email: `nastasia.latsinnik@yandex.ru` (`mailto:nastasia.latsinnik@yandex.ru`)
   - WhatsApp: `https://wa.me/79298131013`

---

## 7. Next.js 15 Async Params Standard

In Next.js 15, dynamic route params in `page.tsx` and `generateMetadata` are Promises:

```tsx
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  // ...
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  // ...
}
```

Always use `await params` in dynamic route components to comply with TypeScript constraints.

---

## 8. Verification & Build Commands

Do **NOT** run `npm run build` automatically after every minor edit or change. Only run build or typechecks when explicitly requested by the user or when doing major refactorings/final deployment steps.
