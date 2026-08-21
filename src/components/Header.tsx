'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getImagePath } from '@/utils/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#projects', label: 'Портфолио' },
    { href: '/#approach', label: 'Метод' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#bureau', label: 'О бюро' },
    { href: '/#certificates', label: 'Сертификаты' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-milk/95 backdrop-blur-md shadow-sm border-b border-graphite/10 ${
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          aria-label="Главная страница — Ландшафтное бюро Анастасии Лацинник"
          className="group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={getImagePath('/images/logo_03_blueprint.webp')}
            alt="Ландшафтное бюро логотип"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16 text-sm tracking-normal font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative inline-flex items-center py-2 text-graphite/80 hover:text-graphite transition-colors leading-none hover:font-medium text-center"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Action Button Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-graphite/30 text-graphite text-xs tracking-normal font-sans font-medium hover:bg-graphite hover:text-milk transition-all duration-200 leading-none"
          >
            <span>Обсудить свой сад</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-graphite text-milk text-xs tracking-normal font-sans font-medium leading-none"
          >
            Обсудить
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-graphite focus:outline-none flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bottom-0 h-[calc(100dvh-100%)] bg-milk border-t border-graphite/10 z-50 px-6 py-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
          <div className="space-y-6">
            <p className="text-xs text-graphite/50 mb-4 font-sans font-medium">Навигация</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-2xl text-graphite hover:text-olive transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-graphite/10 space-y-4">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-graphite text-milk text-center text-sm font-sans font-medium block"
            >
              Обсудить свой сад
            </Link>

            <div className="text-xs text-graphite/60 space-y-1 pt-2 font-sans">
              <p>Тел: <a href="tel:+79298131013" className="underline">+7 929 813-10-13</a></p>
              <p>Email: <a href="mailto:nastasia.latsinnik@yandex.ru" className="underline">nastasia.latsinnik@yandex.ru</a></p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
