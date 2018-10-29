# Задача 3. Страница интернет-магазина

#### В рамках домашнего задания к лекции «Создание HTML с нуля»

## Описание

Реализовать функцию `createElement`, которая позволит создавать DOM-узел на основе объекта, описывающего его структуру:

![Страница интернет-магазина](./res/preview.png)

## Пример использования

```javascript
const node = {
  name: 'h1',
  props: {
    class: 'main-title'
  },
  childs: [
    'Заголовок'
  ]
};

const element = createElement(node);
const wrapper = document.getElementById('root');
wrapper.appendChild(element);
```

Если функция реализована верно, то создастся узел, соответствующий HTML-коду:
```html
<h1 class="main-title">Заголовок</h1>
```
