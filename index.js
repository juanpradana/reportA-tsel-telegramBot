const config = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const {
  tToken,
  url_data
} = config.config;

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const token = tToken;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["All Site ID"], ["Command"], ["I'm robot"]]
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

  if (msg.text.indexOf("Command") === 0) {
    bot.sendMessage(msg.chat.id, "All Site ID\n!site [siteid]");
  }

  if (msg.text.indexOf("All Site ID") === 0) {
    fetch(url_data + 'SiteID')
      .then( async (response) => {
        const data = await response.json()
        const subData = chunk(data, 500)
        subData.forEach(dat => {
          const text = JSON.stringify(dat)
          const result = text.replace(/["{}\[\]]/g, '')
          .replace(/site_id:/g, '')
          final = result.replace(/,/g, "\n")
          console.log(final.length)
          bot.sendMessage(msg.chat.id, final)
        })
      })
      .catch(function(err) {
        console.log(err)
        bot.sendMessage(msg.chat.id, String(err))
      })
  }

  if (msg.text.includes("!site")) {
    const req = msg.text.toString().replace('!site ', '')
    fetch(url_data + 'datas/' + req)
      .then( async (response) => {
        const dataJSON = await response.json()
        const data = dataJSON[0]
        const text = JSON.stringify(data)
        const result = String(text).replace(/,/g, '\n').replace(/[{}"]/g, '')
        console.log(result.length)
        bot.sendMessage(msg.chat.id, result)
        bot.sendLocation(msg.chat.id, parseFloat(data.lat), parseFloat(data.long))
      })
      .catch(function(err) {
        console.log(err)
        bot.sendMessage(msg.chat.id, String(err))
      })
  }
});