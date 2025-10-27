# Сайт ООО «Стройкомплект»

Современный веб-сайт для компании, занимающейся электромонтажными работами.

## Настройка окружения

1. Скопируйте файл `.env.example` в `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Заполните обязательные переменные окружения в `.env.local`

## Настройка отправки писем через Brevo

### Получение API ключа Brevo

1. Зарегистрируйтесь на [Brevo](https://www.brevo.com/)
2. Перейдите в раздел "SMTP & API" → "API Keys"
3. Создайте новый API ключ с правами на отправку писем
4. Скопируйте ключ (начинается с `xkeysib-`)

### Настройка .env.local

Откройте файл `.env.local` и заполните следующие поля:

```env
BREVO_API_KEY=xkeysib-ваш_ключ_brevo
EMAIL_FROM=info@stroykomplekt-msk.ru  # Должен быть подтвержден в Brevo
EMAIL_FROM_NAME=ООО «Стройкомплект»
EMAIL_TO=info@stroykomplekt-msk.ru    # Куда присылать заявки
```

### Проверка конфигурации

1. Запустите сервер разработки:
   ```bash
   npm run dev
   ```

2. Проверьте конфигурацию Brevo:
   ```bash
   curl http://localhost:3000/api/health/mail
   ```

   Успешный ответ:
   ```json
   {
     "ok": true,
     "configured": true,
     "missing": {
       "BREVO_API_KEY": false,
       "EMAIL_FROM": false,
       "EMAIL_TO": false
     },
     "env": {
       "BREVO_API_KEY": true,
       "EMAIL_FROM": true,
       "EMAIL_TO": true,
       "NODE_ENV": "development"
     }
   }
   ```

3. Отправьте тестовую заявку через форму на сайте или через curl:
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Тест","phone":"+79991234567","message":"Тестовое сообщение"}'
   ```

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшн-сборки
npm start
```

## Логирование

В консоли браузера при успешной отправке формы отображается событие `lead_sent` с данными формы.

## Аналитика

Настроена интеграция с:
- Яндекс.Метрика (через NEXT_PUBLIC_METRIKA_ID)
- Google Analytics (через NEXT_PUBLIC_GA_MEASUREMENT_ID)

## Лицензия

Проприетарное ПО. Все права защищены.
