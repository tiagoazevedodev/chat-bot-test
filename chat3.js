const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

// Variável para armazenar o estado da conversa
const conversations = {};

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    const chatId = message.from; // Obtém o ID do chat
    const msg = message.body.toLowerCase();

    // Inicializa a conversa se não existir
    if (!conversations[chatId]) {
        conversations[chatId] = { step: 0, data: {} };
    }

    const step = conversations[chatId].step;

    // Fluxo de conversa baseado no estado
    if (step === 0 && (msg.includes('olá') || msg.includes('oi'))) {
        message.reply('Olá! Bem-vindo! Como posso te ajudar hoje? Digite: \n1 - Quero saber mais sobre produtos \n2 - Tenho uma dúvida técnica \n3 - Falar com um representante.');
        conversations[chatId].step = 1;
    }

    else if (step === 1) {
        if (msg === '1') {
            message.reply('Que ótimo! Temos várias soluções. Qual é o seu principal objetivo? (ex.: aumentar vendas, melhorar processos, expandir mercados)');
            conversations[chatId].step = 2;
        } else if (msg === '2') {
            message.reply('Por favor, descreva o problema técnico que você está enfrentando. Nossa equipe entrará em contato.');
            conversations[chatId].step = 3; // Progresso para a dúvida técnica
        } else if (msg === '3') {
            message.reply('Encaminhei seu contato para um dos nossos representantes, que logo entrará em contato.');
            conversations[chatId].step = 0; // Resetar para novo atendimento
        } else {
            message.reply('Desculpe, não entendi. Por favor, selecione uma das opções: \n1 - Produtos \n2 - Suporte técnico \n3 - Falar com um representante.');
        }
    }

    else if (step === 2) {
        conversations[chatId].data.objective = msg; // Armazena o objetivo
        message.reply('Perfeito! Você já utiliza alguma ferramenta de marketing digital ou automação? (ex.: e-mail marketing, anúncios)');
        conversations[chatId].step = 4;
    }

    else if (step === 4) {
        conversations[chatId].data.tool = msg; // Armazena a ferramenta utilizada
        message.reply('Ótimo! Que resultados você está obtendo com suas campanhas? (ex.: taxas de abertura, cliques, conversões)');
        conversations[chatId].step = 5;
    }

    else if (step === 5) {
        conversations[chatId].data.results = msg; // Armazena os resultados
        message.reply('Entendi. Isso pode ser devido a diversos fatores. Podemos agendar uma demonstração do nosso software. Qual o melhor horário para você?');
        conversations[chatId].step = 6;
    }

    else if (step === 6) {
        conversations[chatId].data.demoTime = msg; // Armazena o horário da demonstração
        message.reply(`Sua demonstração está marcada para ${msg}. Um de nossos especialistas irá entrar em contato. Alguma outra dúvida que você gostaria de discutir antes da demonstração?`);
        conversations[chatId].step = 7;
    }

    else if (step === 7) {
        conversations[chatId].data.additionalQuestion = msg; // Armazena qualquer dúvida adicional
        message.reply('Sim, oferecemos suporte técnico contínuo e treinamento. Caso precise mudar o horário da demonstração ou tenha mais perguntas, basta avisar.');
        conversations[chatId].step = 0; // Resetar para novo atendimento
    }

    else {
        message.reply('Desculpe, não entendi. Por favor, selecione uma das opções: \n1 - Produtos \n2 - Suporte técnico \n3 - Falar com um representante.');
    }
});

client.initialize();
