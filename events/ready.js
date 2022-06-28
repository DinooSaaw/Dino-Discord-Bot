const { MessageEmbed, WebhookClient } = require('discord.js');

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

    client.guilds.cache.forEach(guild => {
        if (guild.name === "Dino's Community!") return
        console.log(`${guild.name}`)
        guild.leave();
        client.users.cache.get('247163579424309268').send(`${client.user.tag} was In ${guild.name}`);
    })

    }
}