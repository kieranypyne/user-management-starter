const $ = require('jquery');
const Router = require('./router');
const Backbone = require('backbone');

// Set jQuery in the window
window.$ = window.jQuery = $;

const app = document.querySelector('#app');

const router = new Router();
Backbone.history.start();
