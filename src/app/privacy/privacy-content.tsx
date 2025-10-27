'use client';
import Link from 'next/link';

export function PrivacyContent() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Политика конфиденциальности</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="mb-8 p-6 bg-muted/20 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Содержание</h2>
            <ul className="space-y-2">
              <li><a href="#general" className="text-primary hover:underline">1. Общие положения</a></li>
              <li><a href="#terms" className="text-primary hover:underline">2. Основные понятия</a></li>
              <li><a href="#processing" className="text-primary hover:underline">3. Обработка персональных данных</a></li>
              <li><a href="#rights" className="text-primary hover:underline">4. Права субъекта персональных данных</a></li>
              <li><a href="#security" className="text-primary hover:underline">5. Безопасность персональных данных</a></li>
              <li><a href="#final" className="text-primary hover:underline">6. Заключительные положения</a></li>
            </ul>
          </div>

          <section id="general" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="mb-4">
              Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных в ООО «Стройкомплект» (далее — Оператор).
            </p>
            <p className="mb-4">
              Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
            </p>
          </section>

          <section id="terms" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Основные понятия</h2>
            <p className="mb-4">
              <strong>Персональные данные</strong> — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).
            </p>
            <p className="mb-4">
              <strong>Обработка персональных данных</strong> — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
            </p>
          </section>

          <section id="processing" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Обработка персональных данных</h2>
            <p className="mb-4">
              Оператор обрабатывает персональные данные Пользователей в следующих целях:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Осуществление деятельности в соответствии с уставом Компании</li>
              <li>Обратная связь с Пользователями</li>
              <li>Заключение и исполнение договоров с контрагентами</li>
              <li>Рассылка рекламных и информационных материалов</li>
            </ul>
          </section>

          <section id="rights" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Права субъекта персональных данных</h2>
            <p className="mb-4">
              Субъект персональных данных имеет право:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Получать информацию, касающуюся обработки его персональных данных</li>
              <li>Требовать уточнения своих персональных данных, их блокирования или уничтожения</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Осуществлять иные права, предусмотренные законодательством РФ</li>
            </ul>
          </section>

          <section id="security" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Безопасность персональных данных</h2>
            <p className="mb-4">
              Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
            </p>
          </section>

          <section id="final" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Заключительные положения</h2>
            <p className="mb-4">
              Настоящая Политика может быть изменена Оператором в одностороннем порядке. Новая редакция Политики вступает в силу с момента ее размещения на Сайте, если иное не предусмотрено новой редакцией Политики.
            </p>
            <p className="mb-4">
              Действующая редакция Политики находится на Сайте в сети Интернет по адресу: <Link href="/privacy" className="text-primary hover:underline">https://stroykomplekt.ru/privacy</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
