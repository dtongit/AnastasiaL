'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="relative z-20 bg-graphite text-milk pt-20 pb-12 border-t border-graphite shadow-[0_0_20px_#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-[28rem] pb-16 border-b border-milk/10">
          
          {/* Navigation links */}
          <div className="space-y-4">
            <h3 className="text-xs sm:text-sm font-medium text-sand font-sans">Навигация</h3>
            <ul className="space-y-3 text-sm text-milk/80 font-sans">
              <li>
                <Link href="/#projects" className="hover:text-sand transition-colors">
                  Портфолио
                </Link>
              </li>
              <li>
                <Link href="/#approach" className="hover:text-sand transition-colors">
                  Метод
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-sand transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/#bureau" className="hover:text-sand transition-colors">
                  О бюро
                </Link>
              </li>
              <li>
                <Link href="/#certificates" className="hover:text-sand transition-colors">
                  Сертификаты
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-4">
            <h3 className="text-xs sm:text-sm font-medium text-sand font-sans">Связаться</h3>
            <div className="space-y-4 font-sans text-sm">
              <a
                href="tel:+79298131013"
                className="flex items-center space-x-3 text-milk/90 hover:text-sand transition-colors group"
              >
                <Phone className="w-4 h-4 text-sand" />
                <span className="font-medium">+7 929 813-10-13</span>
              </a>

              <a
                href="mailto:nastasia.latsinnik@yandex.ru"
                className="flex items-center space-x-3 text-milk/90 hover:text-sand transition-colors group"
              >
                <Mail className="w-4 h-4 text-sand" />
                <span>nastasia.latsinnik@yandex.ru</span>
              </a>

              <a
                href="https://wa.me/79298131013"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-sand/30 text-sand text-xs font-sans font-medium hover:bg-sand hover:text-graphite transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Написать в WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-milk/50 font-sans space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Ландшафтное бюро Анастасии Лацинник.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-milk transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
