const { client } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	execute(message) {

		if(message.author.bot) return console.warn("Bot Message: " + message.author.username)
		console.log(`${message.author.username} || ${message.cleanContent}`);
	},
};