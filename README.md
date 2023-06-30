<a href='https://test-react-mobx.vercel.app/' target="_blank" rel="noopener noreferrer nofollow"> click here to see this app </a>

# Задача

Сделать форму создания «тестовой локации».

## На входе

Mobx store, который подтягивает данные по локациям, средам и серверам.

## На форме:

- Выбор локации;
- выбор среды (отфильтрованный по локации);
- доступные серверы через запятую, информационно;
- поле для ввода подсказки.

![Примерный макет](https://raw.githubusercontent.com/BATCOH/mp-test/master/todo.png)

## На выходе

По кнопке «Вывести результат в консоль» — массив объектов вида `[{locationID: number, envID: number, hint: string}]`

## Дополнительно

Макет примерный, pixel-perfect не нужен, функционал — в первую очередь.
Иконки берём с Font Awesome.
