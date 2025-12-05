# ТЗ
Создайте single page application, работающий с Github GraphQL API. Приложение представляет из себя «менеджер» для работы с issues на гитхабе.
На стартовом экране нужно выбрать/ввести репозиторий. После выбора для пользователя отображается список всех открытых issues в этом 
репозитории (название, текст и количество комментариев). Так же для issue должна быть возможность добавить комментарий.
Нужно использовать React и Github GraphQL API. Можно использовать любые сторонние библиотеки.

# TODO
1) Объединить формы для ввода токена и репо
2) Нормальное отображение md разметки в тексте issue
3) рефактор issueslist и некоторых стилей

# Установка
```cmd
git clone https://github.com/suddenbuff/issuesManager_spa.git
cd issuesManager_spa
npm install
npm run dev
```

# Генерация токена
Settings -> Developer settings -> Personal access tokens -> Fine-grained tokens -> Generate new token -> Вводите имя для токена ->  Repository Access: All repositories -> Permissions -> Add permissions -> Поставить галочки Issues