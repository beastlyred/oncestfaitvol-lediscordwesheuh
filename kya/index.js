const Discord = require("discord.js");
const Canvas = require("canvas");
const { prefix, token} = require('./config.json');
const Client = new Discord.Client({
    intent: [32767]
});


//Arrivée d'un membre et commande de base

Client.on("guildMemberAdd", async member =>{
    console.log("Un membre est arrivé !")
    Client.channels.cache.get("940740502708420688").send(`Bienvenue <@` + member.id + `> sur **⭐・Sad #New Project** Profite de ton séjour !! :tada:`);
    member.roles.add("937179765738197062");
    console.log("Le role nouveau a été ajouter à un utilisateur");

    var canvas = Canvas.createCanvas(1024, 500);

    ctx = canvas.getContext("2d");

    var back = await Canvas.loadImage("./background.jpg");
    ctx.drawImage(back, 0 , 0, 1024, 500);

    ctx.font = "50px Far-From Homecoming";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 512, 410);

    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024
    }));

    ctx.drawImage(avatar, 393, 47, 238, 238)

    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.jpg");

    Client.channels.cache.get("940740502708420688").send({files: [attachment]});
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre a quitté le serveur !");
    Client.channels.cache.get("937256290948882512").send(` <@` + member.id + `> est parti de **⭐・Sad #New Project** !!:sob:`);
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
            .setAuthor("Kya", "https://imgur.com/rsMLz5t")
            .setDescription("Vous y trouverez toutes les commandes disponibles à votre rôle")
            .setThumbnail("https://imgur.com/rsMLz5t")
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





























































































































//LoltAscrUsjeSuiSuNenFanTdE3ANS
