# RSS Agregator

**Публичная ссылка:** https://frontend-project-11-six-pi.vercel.app

### Hexlet tests and linter status:
[![Actions Status](https://github.com/ValeriaZherditskaia/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ValeriaZherditskaia/frontend-project-11/actions)

[![CI](https://github.com/ValeriaZherditskaia/frontend-project-11/actions/workflows/ci.yml/badge.svg)](https://github.com/ValeriaZherditskaia/frontend-project-11/actions/workflows/ci.yml)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ValeriaZherditskaia_frontend-project-11&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ValeriaZherditskaia_frontend-project-11)

## Описание

RSS Agregator — это веб-приложение для агрегации и управления RSS-потоками. Позволяет пользователям:

- Добавлять неограниченное количество RSS-лент
- Автоматически обновлять посты каждые 5 секунд
- Просматривать список всех фидов и постов
- Читать полное описание постов в модальных окнах
- Отслеживать прочитанные посты
- Работать с приложением на русском или английском языках

RSS (Really Simple Syndication) — это специализированный формат для описания лент новостей и анонсов. Приложение помогает удобно читать разнообразные источники информации в одном месте.

## Технологический стек

- **Frontend:** Vanilla JavaScript, Vite, Bootstrap 5
- **HTTP:** Axios
- **CORS:** AllOrigins прокси
- **Реактивность:** on-change
- **Валидация:** Yup
- **Локализация:** i18next (RU/EN)
- **Парсинг:** DOMParser (XML)
- **DevOps:** GitHub Actions, ESLint, Vercel

## Установка и запуск
```
npm install
npm run dev # разработка
npm run build # продакшен
npm run lint # проверка кода
```
