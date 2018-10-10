'use strict';

const form = document.querySelector('.contentform');
const message = document.querySelector('#output');
const groups = form.querySelectorAll('.form-group');
const fields = form.querySelectorAll('.form-group input, .form-group textarea');
const zip = Array.from(fields).filter(field => field.name === 'zip')[0];
const outputFields = message.querySelectorAll('output');
const requiredFields = Array.from(groups).map(item => {
  if (item.querySelector('p span').innerText === '*') {
    return item.querySelector('input, textarea');
  }
});
const buttons = document.querySelectorAll('.button-contact');
const submitBtn = Array.from(buttons).filter(btn => btn.type === 'submit')[0];
const editBtn = Array.from(buttons).filter(btn => btn !== submitBtn)[0];

function setEvents() {
  for (const field of fields) {
    field.addEventListener('change', () => {
      if (isValid(fields)) {
        submitBtn.removeAttribute('disabled');
      }
    });
  }
  zip.addEventListener('input', getDigits);
  submitBtn.addEventListener('click', sendMessage);
  editBtn.addEventListener('click', editForm);
}

function getDigits(event) {
  if (!(/^\d+$/gi.test(event.target.value))) {
    event.target.value = event.target.value.toString().slice(0, -1);
  };
}

function sendMessage(event) {
  event.preventDefault();
  setOutputs();
  hideElem(form);
  showElem(message);
}

function editForm(event) {
  event.preventDefault();
  hideElem(message);
  showElem(form);
}

function setOutputs() {
  for (const output of outputFields) {
    output.textContent = form[output.id].value;
  }
}

function isValid(fields) {
  for (const field of requiredFields) {
    if (!(field.value)) {
      return false;
    }
  }
  return true;
}

function showElem(elem) {
  elem.classList.remove('hidden');
}

function hideElem(elem) {
  elem.classList.add('hidden');
}

setEvents();