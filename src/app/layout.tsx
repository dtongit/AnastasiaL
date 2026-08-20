import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const serifFont = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Manrope({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mesto-sila.ru'),
  title: {
    default: '«Место силы» — Ландшафтное бюро Анастасии Лацинник',
    template: '%s | Место силы',
  },
  description:
    'Малоуходные сады для частных и общественных территорий — от первой идеи до рабочих чертежей и авторского надзора. Пространство, в которое хочется возвращаться.',
  keywords: [
    'ландшафтное бюро',
    'Анастасия Лацинник',
    'малоуходный сад',
    'ландшафтный дизайн',
    'проект сада',
    'дендроплан',
    'авторский надзор',
  ],
  authors: [{ name: 'Анастасия Лацинник' }],
  openGraph: {
    title: '«Место силы» — Ландшафтное бюро Анастасии Лацинник',
    description:
      'Мы создаём малоуходные сады, в которых природа, архитектура и повседневная жизнь складываются в одно цельное пространство.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Место силы',
    images: [
      {
        url: '/images/hero_garden_main.webp',
        width: 1200,
        height: 630,
        alt: 'Ландшафтное бюро Место силы',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="font-sans bg-milk text-graphite flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
