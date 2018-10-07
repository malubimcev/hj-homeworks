'use strict';

const content = document.querySelector('#content');
const links = document.querySelectorAll('nav a');
const preloader = document.querySelector('#preloader');
const xhr = new XMLHttpRequest();
let activeTab;

document.addEventListener('DOMContentLoaded', setEvents);

function openTab(event) {
  event.preventDefault();
  activeTab = this;
  getHTML(activeTab.getAttribute('href'));
}

function deactivateLinks() {
  for (const link of links) {
  	link.classList.remove('active');
  }
  activeTab.classList.add('active');
}

function setEvents() {
  for (const link of links) {
  	link.addEventListener('click', openTab);
  }
  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('error', onError);
  xhr.addEventListener('loadstart', () => preloader.classList.remove('hidden'));
  xhr.addEventListener('loadend', () => preloader.classList.add('hidden'));
}

function onLoad() {
  content.innerHTML = xhr.responseText;
  deactivateLinks();
}

function onError() {
  console.error(Error);
}

function getHTML(link) {
  xhr.open('GET', link, true);
  xhr.send();
}