'use strict';

const chat = document.querySelector('.chat');
const messageBox = chat.querySelector('.message-box');
const messageInput = messageBox.querySelector('.message-input');
const messageSubmit = messageBox.querySelector('.message-submit');
const messageContent = chat.querySelector('.messages-content');
const messageTemplates = chat.querySelectorAll('.messages-templates');
const messageStatus = chat.querySelector('.message-status');
const chatStatus = chat.querySelector('.chat-status');
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.addEventListener('open', onConnect);
connection.addEventListener('close', onDisconnect);
connection.addEventListener('message', onMessage);
connection.addEventListener('error', (error) => console.log(`error: ${error.data}`));
window.addEventListener('beforeunload', () => connection.close(1000));
messageBox.addEventListener('click', sendMessage);

function onConnect() {
  chatStatus.textContent = chatStatus.dataset.online;
  messageSubmit.disabled = false;
}

function onDisconnect() {
  chatStatus.textContent = chatStatus.dataset.offline;
  messageSubmit.disabled = true;
}

function onMessage(event) {
  try {
    const msg = event.data;
    if (msg === '...') {
      addMessage('.loading', 'печатает сообщение...');
    } else {
      addMessage('', msg);
    }
  } catch (err) {
    console.log(err.message);
  }
}

function sendMessage(event) {
  event.preventDefault();
  if (event.target === messageSubmit) {
    addMessage('.message-personal', messageInput.value);
    connection.send(messageInput.value);
  }
}

function getTemplate(className) {
  if (className === '') {
    return chat.querySelectorAll('.message')[1];
  }
  return chat.querySelector(className);
}

function addMessage(className, text) {
    const msg = getTemplate(className).cloneNode(true);
    msg.querySelector('span').textContent = text;
    const timestamp = msg.querySelector('.timestamp');
    if (timestamp) {
      timestamp.textContent = getTime();
    }
    messageContent.appendChild(msg);  
}

function getTime() {
  const now = new Date();
  return now.getHours() + ':' + now.getMinutes();
}