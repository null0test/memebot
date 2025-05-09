import dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';

const url = "https://meme-api.com/gimme";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!fuck you') {
        message.reply('fuck you too bitch!');
    }

    if (message.content === '!meme') {
        meme(message);
    }
});

function meme(message) {
    const requestOptions = {
        method: 'GET'
    };
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            processResponse(data, message);
        })
        .catch((e) => {
            console.error(e);
        });
}

function processResponse(resp, message) {
    const lastPreview = resp.preview[resp.preview.length - 1];
    message.reply(lastPreview);
}