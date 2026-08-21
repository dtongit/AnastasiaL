import Link from 'next/link';

export const metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика обработки персональных данных ландшафтного бюро Анастасии Лацинник.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 space-y-8 font-sans text-graphite/80 leading-relaxed">
      <div className="space-y-3 border-b border-graphite/10 pb-6">
        <span className="text-xs sm:text-sm font-medium text-olive">Правовая информация</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-graphite font-normal">
          Политика конфиденциальности
        </h1>
        <p className="text-xs text-graphite/50">Редакция от 5 августа 2026 года</p>
      </div>

      <div className="space-y-6 text-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-graphite font-medium">1. Общие положения</h2>
          <p>
            Настоящая Политика обработки персональных данных определяет порядок обработки и защиты информации о физических лицах (далее — Пользователи), отправляющих свои данные или обращающихся через сайт ландшафтного бюро Анастасии Лацинник.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-graphite font-medium">2. Состав собираемых данных</h2>
          <p>Мы обрабатываем следующие персональные данные, добровольно предоставляемые Пользователем:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Имя;</li>
            <li>Номер контактного телефона;</li>
            <li>Адрес электронной почты;</li>
            <li>Регион / город нахождения участка;</li>
            <li>Информация об участке и предпочитаемом формате работы.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-graphite font-medium">3. Цели обработки данных</h2>
          <p>Данные обрабатываются исключительно в целях:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Обратной связи и первичного обсуждения вопросов проектирования участка;</li>
            <li>Подготовки коммерческого или концептуального предложения;</li>
            <li>Оформления и отправки подарочных сертификатов.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-graphite font-medium">4. Защита информации</h2>
          <p>
            Ландшафтное бюро Анастасии Лацинник не передает полученные персональные данные третьим лицам, за исключением случаев, предусмотренных действующим законодательством.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-graphite font-medium">5. Контакты по вопросам персональных данных</h2>
          <p>
            Пользователь вправе в любой момент отозвать свое согласие на обработку данных, направив письменный запрос на почту:
            <a href="mailto:nastasia.latsinnik@yandex.ru" className="underline text-graphite ml-1">
              nastasia.latsinnik@yandex.ru
            </a>
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-graphite/10">
        <Link href="/" className="text-xs sm:text-sm font-medium text-graphite underline hover:text-olive">
          ← Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
