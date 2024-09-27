const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// printar todas mensagens recebidas 

client.on('message', message => {
    console.log(message.body);
    if (message.body === 'ping') {
        message.reply('pong');
    }
});

client.initialize();
