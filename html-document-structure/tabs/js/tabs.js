'use strict';

function TabSelector(container) {
  const content = container.querySelector('.tabs-content');
  const articles = content.querySelectorAll('.tabs-content > *');
  const nav = container.querySelector('.tabs-nav');

  function createTabs() {
    const tabProto = nav.firstElementChild;
    for (const article of articles) {
      const newTab = tabProto.cloneNode(true);
      const link = newTab.firstElementChild;
      link.textContent = article.dataset.tabTitle;
      link.classList.add(article.dataset.tabIcon);
      nav.appendChild(newTab);
      nav.lastElementChild.addEventListener('click', (event) => activateTab(event.currentTarget));
      article.classList.add('hidden');
    }
    nav.removeChild(tabProto);
    activateTab(nav.firstElementChild);
  }

  function activateTab(tab) {
    const tabs = tab.parentElement.querySelectorAll('li');
    for (const item of tabs) {
      item.classList.remove('ui-tabs-active');
    }
    tab.classList.add('ui-tabs-active');
    for (const art of articles) {
      if (art.dataset.tabTitle === tab.textContent) {
         art.classList.remove('hidden');
      } else {
        art.classList.add('hidden');
      }
    }
  }  
  
  createTabs();
}

const tabContainer = document.querySelector('#tabs');
TabSelector(tabContainer);