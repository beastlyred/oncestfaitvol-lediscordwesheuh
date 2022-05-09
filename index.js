const Discord = require("discord.js");
const { prefix, token, server, id_salon_arrivee, id_role, id_salon_depart} = require('./config.json');
const Client = new Discord.Client({
    intent: [32767]
});
const commande = require('./commands/mute.js')


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


Client.login(token)






























































































































