const { Client, Intents } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: process.env.webhookurl });

require('dotenv').config()

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('guildMemberAdd', (member) => {
    let welcomechannel = client.channels.cache.get('989035348497674240')
    welcomechannel.send(`Welcome ${member}! \n Make sure you have a read of the rules`)
})

client.on('guildMemberRemove', (member) => {
    let welcomechannel = client.channels.cache.get('989035348497674240')
    welcomechannel.send(`Welcome ${member}! \n Great! They probably didnt read the rules`)
})

client.on('guildBanAdd', (ban) => {
    let welcomechannel = client.channels.cache.get('989035348497674240')
    welcomechannel.send(`${ban.user} Just got fucking dropped!`)

	const ban = new MessageEmbed()
    .setTitle('Banned')
    .setDescription(`${ban.user} Is Now Banned!`)
    .setColor('#ff6666')
    .setTimestamp()
    .setThumbnail(ban.user.avatarURL());

    webhookClient.send({
        embeds: [ban],
    });
})

client.on('guildBanRemove', (ban) => {
    let welcomechannel = client.channels.cache.get('989035348497674240')
    welcomechannel.send(`${ban.user} Just got picked up!`)

	const ban = new MessageEmbed()
    .setTitle('Unbanned')
    .setDescription(`${ban.user} Is Now Unbanned!`)
    .setColor('#82f282')
    .setTimestamp()
    .setThumbnail(ban.user.avatarURL());

    webhookClient.send({
        embeds: [ban],
    });
})

// Login to Discord with your client's token
client.login(process.env.token);