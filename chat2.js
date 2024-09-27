const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// Simulação de pré-venda e coleta de informações
client.on('message', message => {
    const msg = message.body.toLowerCase();

    if (msg.includes('olá') || msg.includes('oi')) {
        message.reply('Olá! Bem-vindo à nossa empresa. Como posso te ajudar hoje? Digite: \n1 - Quero saber mais sobre seus produtos \n2 - Tenho uma dúvida técnica \n3 - Falar com um representante.');
    }

    // Resposta automática para interessados em produtos
    else if (msg === '1') {
        message.reply('Que ótimo! Temos diversas soluções para ajudar sua empresa a crescer. Qual é o seu principal objetivo de negócios?');
    }

    // Coleta de dúvida técnica
    else if (msg === '2') {
        message.reply('Por favor, descreva o problema técnico que está enfrentando. Nossa equipe especializada entrará em contato.');
    }

    // Falar com um representante
    else if (msg === '3') {
        message.reply('Encaminhei seu contato para um dos nossos representantes, que logo entrará em contato com você.');
        // Aqui pode-se integrar com um sistema CRM, por exemplo, para registrar o lead.
    }

    // Resposta genérica
    else {
        message.reply('Desculpe, não entendi. Por favor, selecione uma das opções: \n1 - Produtos \n2 - Suporte técnico \n3 - Falar com um representante.');
    }
});

client.initialize();
