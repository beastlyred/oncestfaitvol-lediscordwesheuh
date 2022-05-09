const fs = require("fs");

const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const { prefix, token, server, id_salon_arrivee, id_role, id_salon_depart} = require('./config.json');
const Client = new Discord.Client({
    intent: [32767]
});
bot.commands = new Discord.Collection();
bot.muted = require("./muted.json");


//Arrivée d'un membre et commande de base

Client.on("guildMemberAdd", async member =>{
    console.log("Un membre est arrivé !")
    Client.channels.cache.get(id_salon_arrivee).send(`Bienvenue <@` + member.id + `> sur ** `+ server +` ** Profite de ton séjour !! :tada:`);
    member.roles.add(id_role);
    console.log("Le role nouveau a été ajouter à un utilisateur");

});

Client.on("guildMemberRemove", member => {
    console.log("Un membre a quitté le serveur !");
    Client.channels.cache.get(id_salon_depart).send(` <@` + member.id + `> est parti de `+ server +` !!:sob:`);
});



Client.on("message", msg => {
    if (msg.author.bot) return;
    
    if (msg.content === prefix + "ping"){
        msg.delete();
        msg.author.send("pong !")
    }
    if (msg.content === prefix + "help"){
        msg.delete();
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Liste des commandes du serveur")
            .setDescription("Vous y trouverez toutes les commandes disponibles à votre rôle")
            .addField("__+help__", "- Affiche la liste des commandes en mp")
            .addField("__+ping__", " - Le bot répond 'pong !'")
            .setTimestamp()
            .setFooter("Créé par Onix");
        msg.author.send(embed);
    }
});


//Statut et connexion

Client.on("ready", () => {
        console.log("Je suis connecté !!")
    Client.user.setActivity(" 🌴・discord.gg/", { type: 'WATCHING' })
    console.log('statut validé')
});

//mute

fs.readdir("./cmds/", (err, files) => {
    // Check if folder exist if not err
    if(err) console.error(err);
    
    // Filter only JavaScript Files
    let jsFiles = files.filter(f => f.split(".").pop() === "js");

    // Verify if there are JavaScript command files there 
    if(jsFiles.length <= 0) {
        console.log("No command files found!");
        return;
    }

    // Tell user how many command/'s files have been loaded and then list each one
    console.log(`Loading ${jsFiles.length} command/'s!`);

    jsFiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
})

bot.on("ready", async () => {

    // Every 5 seconds check the "muted.json" file to see when a users mute is up
    bot.setInterval(() => {
        for(let i in bot.muted) {
            let time = bot.muted[i].time;
            let guildId = bot.muted[i].guild;
            let guild = bot.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(mR => mR.name === "Muted");
            if(!mutedRole) continue;

            if(Date.now() > time) {
                member.removeRole(mutedRole);
                delete bot.muted[i];

                fs.writeFile("./muted.json", JSON.stringify(bot.muted), err => {
                    if(err) throw err;
                });
            }
        }
    }, 5000);
});

bot.on("message", async message => {
    // Validate that the user can only message the bot within a channel on the server
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

});



Client.login(token)






























































































































