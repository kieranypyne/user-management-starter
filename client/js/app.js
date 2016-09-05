const $ = require('jquery');

// Set jQuery in the window
window.$ = window.jQuery = $;

const app = document.querySelector('#app');

// Set greeting
const greeting = document.createElement('h2');
greeting.innerText = 'Express Backbone Starter App!';

app.appendChild(greeting);
