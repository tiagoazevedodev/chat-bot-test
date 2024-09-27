const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

// Quando o cliente estiver pronto
client.on('ready', () => {
    console.log('Client is ready!');
});

// Gerar QR Code para autenticação
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Enviar menu inicial
function enviarMenuInicial(message) {
    const menu = `
Olá! Bem-vindo à Innovatio FURG. Como podemos te ajudar hoje? Por favor, escolha uma opção:

1. Sobre a Innovatio
2. Como incubar uma empresa
3. Apoio oferecido pela incubadora
4. Contato e localização
5. Outras perguntas

Responda com o número da opção desejada.`;
    message.reply(menu);
}

// Função para responder com base na escolha numérica
function responderFAQ(message) {
    const lowerMessage = message.body.toLowerCase();

    switch (lowerMessage) {
        case '1':
            message.reply('A Innovatio FURG é uma incubadora de empresas de base tecnológica que apoia empreendedores na criação de negócios inovadores. Para mais informações, acesse https://innovatio.furg.br/');
            break;
        case '2':
            message.reply('Para incubar uma empresa na Innovatio, você pode seguir o processo de seleção. Mais detalhes estão disponíveis em nosso site: https://innovatio.furg.br/');
            break;
        case '3':
            message.reply('A Innovatio oferece apoio em diversas áreas, como consultorias, mentorias e acesso a redes de investidores. Saiba mais em https://innovatio.furg.br/');
            break;
        case '4':
            message.reply('Estamos localizados na Universidade Federal do Rio Grande - FURG. Para mais informações de contato e localização, visite: https://innovatio.furg.br/');
            break;
        case '5':
            message.reply('Por favor, envie sua pergunta ou dúvida que ficaremos felizes em ajudar!');
            break;
        default:
            message.reply('Desculpe, não entendi sua resposta. Por favor, escolha uma das opções enviando o número correspondente.');
            enviarMenuInicial(message); // Reenviar menu se a resposta for inválida
            break;
    }
}

// Ouvir as mensagens recebidas
client.on('message', message => {
    console.log(message.body);

    // Enviar o menu inicial na primeira interação ou responder ao FAQ
    if (message.body === 'menu' || message.body === 'Menu') {
        enviarMenuInicial(message);
    } else {
        responderFAQ(message);
    }
});

// Inicializar o cliente
client.initialize();
