# Фронтенд проекта «Ломая барьеры»

## Описание

Сайт администратора, который используются для сбора ежедневных результатов заданий,
выполненных детьми. Задания направлены на развитие социально-бытовых
навыков, таких как уборка, стирка и мытье посуды.
По итогам каждой смены дети получают заслуженные награды.

### Технологии
[![React][React-badge]][React-url]
[![Effector][Effector-badge]][Effector-url]
[![Vite][Vite-badge]][Vite-url]
[![React-Router][React-Router-badge]][React-Router-url]

## Установка и Запуск

У вас должнен быть установлен NodeJS v16.18

1. Клонировать репозиторий

    ```shell
    git clone git@github.com:Studio-Yandex-Practicum/lomaya_baryery_frontend.git
    cd lomaya_baryery_backend
    ```

2. Установить зависимости

    ```shell
    npm ci
    ```

### Запуск для разработки

1. Запустить скирпт

    ```shell
    npm run dev
    ```

2. Браузер автоматически откроет новую вкладу с адресом сервера http://localhost:5173/

## Сборка для деплоя

1. Задать URL API бэкенда в переменной окружения .env

    ```shell
    echo "VITE_API_URL=https://***.***.***.***" > .env
    ```
2. Запустить скрипт

    ```shell
    npm run build
    ```

3. Бандл для переноса на сервер будет собран в папке dist

<!-- MARKDOWN LINKS & BADGES -->

[React-url]: https://react.dev/
[React-badge]: https://img.shields.io/badge/React-23272f?style=for-the-badge&logo=react

[Effector-url]: https://effector.dev/
[Effector-badge]: https://img.shields.io/badge/Effector-23272f?style=for-the-badge

[Vite-url]: https://vitejs.dev/
[Vite-badge]: https://img.shields.io/badge/Vite-23272f?style=for-the-badge&logo=vite

[React-Router-url]: https://reactrouter.com/en/main
[React-Router-badge]: https://img.shields.io/badge/React%20Router-23272f?style=for-the-badge&logo=reactrouter