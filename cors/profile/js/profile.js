'use strict';

const content = document.querySelector('.content');
const card = content.querySelector('.card');
const badgescard = content.querySelector('.badgescard');
const profileURL = 'https://neto-api.herokuapp.com/profile/me';

function getTechnologyURL(id) {
  return `https://neto-api.herokuapp.com/profile/${id}/technologies`;
}

function readProfile(profile) {
  const nodes = Array.from(card.querySelectorAll('*'));
  
  function getDataNode(dataName) {
  	//возвращает узел, который содержит атрибут data-dataName;
    return nodes.find(item => {
      return item.hasAttribute('data-' + dataName);
    });
  }

  for (let property in profile) {
  	//получаем узел, у которого есть атрибут, совпадающий с именем свойства объекта profile
		const node = getDataNode(property);
    if (node) {
      if (node.tagName === 'IMG') {
        node.src = profile[property];
      } else {
        node.textContent = profile[property];
      }
    }
  }
}

function showBadges(badges) {
  badgescard.innerHTML = badges.map(badgeSnippet).join('');
}

function badgeSnippet(name) {
  return `<span class="devicons devicons-${name}"></span>`;
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

loadData(profileURL)
  .then(profile => {
    readProfile(profile);
    loadData(getTechnologyURL(profile.id))
      .then((array) => {
        showBadges(array);
        content.style="display: initial";
      });
   });