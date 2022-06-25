const { MessageEmbed, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: process.env.webhookurl });

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

        const online = new MessageEmbed()
    .setTitle('Online')
    .setDescription(`${client.user.tag} Is Now Online`)
    .setColor('#82f282')
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL());

    // webhookClient.send({
    //     embeds: [online],
    // });

    }
}