'use strict';

const contactsString = loadContacts();
const contactsArray = JSON.parse(contactsString);
const contactsList = document.querySelector('.contacts-list');

function setData(contact, elem) {
  elem.dataset.email = contact.email;
  elem.dataset.phone = contact.phone;
}

function createItem(contact) {
  return '<li data-email="" data-phone=""><strong>' + contact.name + '</strong></li>' ;
}

function createElements() {
  contactsArray.forEach(contact => {
    contactsList.innerHTML += createItem(contact);
    const elems = contactsList.querySelectorAll('li');
    const elem = elems[elems.length - 1];
    setData(contact, elem);
  });
}

createElements();