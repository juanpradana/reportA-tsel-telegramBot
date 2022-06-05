const config = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const {
  tToken,
  url_data
} = config.config;

const token = tToken;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["All Site ID", "Second sample"],   ["Keyboard"], ["I'm robot"]]
      }
  });
});

bot.on('message', (msg) => {
  if (msg.text.toString().toLowerCase().indexOf('hi') === 0) {
      bot.sendMessage(msg.chat.id, "Hello " + msg.from.first_name);
  }

  if (msg.text.toString().toLowerCase().includes('bye')) {
      bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }

  if (msg.text.indexOf("I'm robot") === 0) {
      bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
  }

  // if (msg.text.indexOf("All Site ID") === 0) {
    
  // }
});