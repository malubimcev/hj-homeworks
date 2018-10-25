'use strict';

const cover = document.querySelector('.cover');
const content = document.querySelector('.content');
const consumersBlock = content.querySelector('.consumers');
const starsBlock = content.querySelector('.stars em');
const maxRating = 10;

const urls = [
  'https://neto-api.herokuapp.com/food/42',
  'https://neto-api.herokuapp.com/food/42/rating',
  'https://neto-api.herokuapp.com/food/42/consumers'
];

function readData(data, container) {
  const nodes = Array.from(container.querySelectorAll('*'));
  
  function getDataNode(dataName) {
  	//возвращает узел, который содержит атрибут data-dataName;
    return nodes.find(item => {
      return item.hasAttribute('data-' + dataName);
    });
  }

  for (let property in data) {
  	//получаем узел, у которого есть атрибут, совпадающий с именем свойства объекта data
		const node = getDataNode(property);
    if (node) {
      let text = data[property];
      if (data[property] instanceof Array) {
        text = data[property].join(', ');
      }
      node.textContent = text;
    }
  }
}

function showRating(ratingObject) {
  starsBlock.style.width = ratingObject.rating * 100 / maxRating + '%';
}

function showPicture(receiptObject) {
  cover.style.backgroundImage = `url(${receiptObject.pic})`;
}

function showConsumers(consumerObject) {
  consumersBlock.innerHTML = consumerObject.consumers.map(consumerSnippet).join('');
  consumersBlock.innerHTML += totalConsumersSnippet(consumerObject.total);
}

function consumerSnippet(consumer) {
  return `<img src="${consumer.pic}" title="${consumer.name}">`;
}

function totalConsumersSnippet(total) {
  return `<span>(+${total})</span>`;
}

function loadData(url) {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const functionName = 'callback' + random(1, 1000);
  return new Promise((resolve, reject) => {
    window[functionName] = resolve;
    const script = document.createElement('SCRIPT');
    script.src = `${url}?callback=${functionName}`;
    document.querySelector('body').appendChild(script);
  });
}

Promise.all(urls.map(loadData))
  .then(([
    receipt,
    rating,
    consumers
  ]) => {
    showPicture(receipt);
    readData(receipt, cover);
    readData(receipt, content);
    readData(rating, content);
    showRating(rating);
    showConsumers(consumers);
  })
  .catch(err => console.log(err.message));