'use strict';

const container = document.querySelector('.container');

function readProfile(profile) {
  const nodes = Array.from(container.querySelectorAll('*'));
  
  function getDataNode(dataName) {
  	//возвращает узел, который содержит атрибут data-dataName;
    return nodes.find(item => {
      return item.hasAttribute('data-' + dataName);
    });
  }

  for (let property in profile) {
  	//получаем узел, у которого есть атрибут, совпадающий с именем свойства объекта profile
    const node = getDataNode(property);
		if (node.tagName === 'IMG') {
			node.src = profile[property];
		} else {
			node.textContent = profile[property];
		}
  }
}

function loadData(url) {
  const functionName = 'callback';
  return new Promise((resolve, reject) => {
    window[functionName] = resolve;
    const script = document.createElement('SCRIPT');
    script.src = `${url}?callback=${functionName}`;
    document.querySelector('body').appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(readProfile);