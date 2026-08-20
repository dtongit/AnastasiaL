import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-md">
        <span className="font-serif text-6xl sm:text-8xl text-sand font-light">404</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-graphite font-medium">
          Страница не найдена
        </h1>
        <p className="text-sm text-graphite/70 font-sans font-light leading-relaxed">
          Возможно, она была перемещена или адрес введен с ошибкой. Вернитесь на главную страницу бюро.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-graphite text-milk text-xs sm:text-sm font-sans font-medium hover:bg-olive transition-colors"
          >
            <span>На главную</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
