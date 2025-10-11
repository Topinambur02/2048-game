# 2048 Game

## Описание проекта
Проект представляет собой разработку современного аналога популярной головоломки 2048. Цель игры — соединять одинаковые числа, сдвигая плитки на сетке, чтобы в итоге получить плитку с числом 2048.

### Используемые технологии:

<img src="https://github.com/user-attachments/assets/0609feae-90f2-4ec6-9a8f-72541a88ce32" title="TypeScript" alt="typescript" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/1e5a5545-738b-499a-be32-6c7a6f4b6ead" title="React" alt="react" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/b0f9b056-7832-48de-9a7b-45eef166075a" title="ReactNative" alt="reactnative" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/3483f74a-e5c1-4125-8d21-b9d14240db65" title="Expo" alt="expo" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/f2b1a202-83ef-4842-8ed0-0315a1377f6f" title="Python" alt="python" width="75" height="75"/>
<img src="https://github.com/user-attachments/assets/48086997-d4eb-4876-848c-9baaf8e728eb" title="FastAPI" alt="fastapi" width="75" height="75"/>
<img src="https://github.com/user-attachments/assets/cb88c094-5f7e-43d2-970c-4640c8e203ae" title="FastAPI-Users" alt="fastapi-users" width="225" height="225"/>
<img src="https://github.com/user-attachments/assets/1f8c4daa-dce1-465f-bb11-1a95bc72a1c6" title="Postgres" alt="postgres" width="75" height="75"/>
<img src="https://github.com/user-attachments/assets/74fcd7e2-345f-4eb2-afbf-8fd701726be8" title="SQLAlchemy" alt="sqlalchemy" width="75" height="75"/>
<img src="https://github.com/user-attachments/assets/b0e8f3ae-84b6-4121-8c2c-9ed8f0355e14" title="Poetry" alt="poetry" width="75" height="75"/>
<img src="https://github.com/user-attachments/assets/6a28d993-e235-4314-9860-f12e71238614" title="Pydantic" alt="pydantic" width="75" height="75"/>
<img src="https://github.com/user-attachments/assets/d24ddbc5-3e27-4ec2-9d18-f5e5a7261e0a" title="Axios" alt="axios" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/a4fa6310-8f72-4771-ab2b-32416fb33800" title="Mobx" alt="mobx" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/5dccd5cd-e6ea-45d8-898c-51b9dc5ea750" title="Prettier" alt="prettier" width="75" height="75" />

<br/>

### Основные функции:
- Стандартное поле 4x4 клетки.
- Управление с помощью свайпов.
- Музыкальное сопровождение в главном меню и при игре.
- При сдвиге все плитки перемещаются в выбранном направлении до упора.
- При столкновении двух плиток с одинаковым номиналом они объединяются в одну новую плитку, чье значение равно сумме двух исходных.
- После каждого успешного хода на случайной свободной клетке появляется новая плитка: 2 (с высокой вероятностью) или 4 (с низкой вероятностью).
- У каждой цифры свой цвет для легкой идентификации.
- Система подсчета очков и прогресс.

### Предварительные требования
- Node.js v22.8.0 или выше
- Npm v10.9.2 или выше
- Python v3.13.2 или выше
- Postgres v14.18 или выше
- Poetry v2.1.1 или выше

## Установка и запуск

1. Склонируйте репозиторий:
```
git clone https://github.com/Topinambur02/2048-game
cd 2048-game
```
2. Перейдите в папку frontend и установите зависимости:
```
cd frontend
npm install
```
3. Создайте файл .env в папке backend и заполните значение:
```
cd backend
```

```
#
# Локальная база данных (замените значения на свои!)
DB_HOST=localhost
DB_PORT=your_db_port
DB_NAME=ai-workshop
DB_USER=your_db_user
DB_PASS=your_db_password

# Шифрование (придумайте свой секретный ключ)
SECRET_KEY=your_secret_key
```
4. Создайте виртуальное окружение, активируйте его и установите poetry:
```
python -m venv .venv

# MacOS и Linux
source .venv/bin/activate
# Windows
.venv/Scripts/activate

pip install poetry
```
5. Скачайте зависимости:
```
poetry install
```
6. Примените миграции к базе данных:
```
alembic upgrade head
```
7. Запуск backend:
```
python main.py
```
8. Запустите frontend:
```
npm start
```
9. Отсканируйте появившийся QR-код на мобильном устройстве и откройте ссылку в приложении Expo Go (Мобильное устройство и компьютер с приложением должны быть в одной сети!)

## Основные скрипты
- ```npm start``` - запуск приложения
- ```npm run android``` - запуск приложения под android
- ```npm run ios``` - запуск приложения под ios
- ```npm run web``` - запуск приложения под web-браузер
- ```npm test``` - запуск тестов
- ```pnpm run prettify``` - форматирование кода с Prettier

## Структура проекта
```
├── README.md                    # Файл README
├── backend/                     # BACKEND
│   ├── APIRouter.py             # Основной файл для регистрации роутеров API
│   ├── alembic                  # Папка со скриптами миграций
│   ├── alembic.ini              # Конфигурация alembic
│   ├── auth                     # Аутентификация и авторизация 
│   ├── config                   # Дополнительные конфигурационные файлы
│   ├── controller               # Обработчики HTTP-запросов
│   ├── db                       # Утилиты для работы с БД
│   ├── dto                      # Data Transfer Objects (DTO)
│   ├── main.py                  # Точка входа в приложение. Инициализирует FastAPI, подключает middleware, роутеры.
│   ├── model                    # ORM-модели (SQLAlchemy) для работы с БД
│   ├── poetry.lock              # Конфигурация зависимостей и виртуального окружения (Poetry)
│   ├── pyproject.toml           # Конфигурация зависимостей и виртуального окружения (Poetry)
│   ├── repository               # Абстракции для доступа к БД
│   └── settings.py              # Настройки приложения. Загрузка переменных окружения.
└── frontend/                    # FRONTEND
    ├── app                      # Основные страницы
    ├── app.json                 # Конфигурация React Native приложения
    ├── assets                   # Используемые ассеты в приложении
    │   ├── components           # Основные компоненты
    │   ├── constants            # Константы
    │   ├── contexts             # Контексты
    │   ├── hooks                # Кастомные хуки
    │   ├── http                 # Конфигурация для отправки запросов
    │   ├── icons                # Иконки
    │   ├── music                # Музыка
    │   ├── props                # Пропсы для компонентов
    │   ├── provider             # Провайдер для авторизации
    │   ├── schemas              # Схемы для валидации
    │   ├── stores               # Сторы для хранения состояний
    │   ├── styles               # Стили для компонентов
    │   ├── svgs                 # Svg компоненты
    │   ├── types                # Типы для TS
    │   └── utils                # Вспомогательные утилиты
    ├── expo-env.d.ts            # Env переменные для expo
    ├── jest.setup.js            # Конфигурация для JEST
    ├── package-lock.json        # Файл блокировки версий для NPM
    ├── package.json             # Метаданные проекта, зависимости и скрипты
    ├── tests                    # Тесты
    └── tsconfig.json            # Конфигурация TypeScript
```
