const { Collector, User } = require("discord.js");

module.exports = {
    name: 'ticket',
    aliases: [],
    permissions: [],
    description: 'ouvre un ticket',
    async execute(message, args, cmd, Client, discord){
        const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
        channel.setParent('937256281603969074');

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        })
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });

        const reactionMessage = await channel.send("Merci d'avoir contacter le support un membre du staff va arriver ");

        try{

            await reactionMessage.react("🔒");
            await reactionMessage.react("⛔");

        }catch(err){
            channel.send("Erreur d'envoie des emojis !");
            throw err;
        }

        const collector = reactionMessage.createReactionCollector((reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
        {dispose: true}
        );

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name){
                case "🔒":
                    channel.updateOverwrite(message.author, {SEND_MESSAGE: false});
                    break;

                case "⛔":
                    channel.send("Suppression du ticket dans 5 secondes !");
                    setTimeout(() => channel.delete(), 5000);
                    break;
            }
        });

        message.channel.send(`Nous allons être à vous! ${channel}`).then((msg) => {
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 3000);
        }).catch((err) => {
            throw err;
        })

        
    }
}