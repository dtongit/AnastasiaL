'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <main className={`flex-grow ${isAdmin ? 'pt-0' : 'pt-22'}`}>
      {children}
    </main>
  );
}
