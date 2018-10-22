'use strict';

const forms = document.querySelectorAll('form');
let output, infoMessage;

function setEvents() {
  for (const form of forms) {
    form.addEventListener('click', (event) => {
      if (event.target.className === 'button') {
        event.preventDefault();
        sendForm(event.currentTarget);
      }
    });
  }
}

function sendForm(form) {
  output = form.querySelector('.error-message');
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => onResponseLoad(xhr.response));
  xhr.addEventListener('error', () => console.log('xhr.error: ' + xhr.error));
  xhr.open('POST', getURL(form), true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(getJSON(form));
}

function getJSON(form) {
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData) {
    data[key] = value;
  }
  return JSON.stringify(data);
}

function getURL(form) {
  const url = 'https://neto-api.herokuapp.com/';
  const formType = form.className.split('-').splice(0, 2).join('');
  formType === 'signup' ? infoMessage = 'зарегистрирован' : infoMessage = 'авторизован';
  return url + formType;
}

function parseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

function onResponseLoad(response) {
  const result = parseJSON(response);
  if (!(result.error)) {
    output.textContent = `Пользователь ${result.name} успешно ${infoMessage}`;
  } else {
    output.textContent = `Ошибка: ${result.message}.`;
  }
}

setEvents();