// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// entao habilitamos o usuario a acessar o serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certin
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo para fazer a nossa magica =)
client.initialize();


const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra


// Funil Base Projeto


client.on('message', async msg => {


    if (msg.body === 'ATIVAR FUNIL BASICO') {
        const chat = await msg.getChat();
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await msg.reply('Oi! Seja muito bem vindo. Você entrou no Funil Básico do treinamento robô para whatsapp sem mensalidades projetado pelo Robson'); //Primeira mensagem de texto
        await delay(1000); //delay de 1 segundo
        await client.sendMessage(msg.from, 'Você vai ter acesso com as funcionalidades básicas do nosso projeto e poderá ver o quanto é fácil criar seus próprios funis campeões e personalizados ao seu negócio.');
        await delay(3000); //delay de 3 segundos

    }


});