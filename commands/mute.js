const Discord = require("discord.js");
const { prefix} = require('./config.json');
const Client = new Discord.Client({
    intent: [32767]
});
const index = require('../index.js')