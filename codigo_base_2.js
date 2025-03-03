const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
  const keywords = ['ATIVAR','CHATBOT','BASE'];

  if (keywords.some(keyword => msg.body.toLowerCase().includes(keyword.toLowerCase()))) {
    const chat = await msg.getChat();

    // Realize as acoes desejadas para qualquer resposta correspondente
    console.log('Resposta correspondente recebida:', msg.body);
    await delay(2000);
    chat.sendStateTyping();
    await delay(3000);
    msg.reply('Eai, tudo bem?');

  await chat.sendStateRecording();
  await delay(38000); // Por exemplo, 10 segundos
  await chat.clearState();
  const audioPath = './audio_base.ogg'; // Caminho do arquivo de �udio
  const audio = MessageMedia.fromFilePath(audioPath);
  chat.sendMessage(audio);

    await delay(2000);
    chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, 'Dá uma olhadinha aí rapidinho!');

    await delay(3000);
    const imagePath = './imagem_teste_1.jpg'; // Caminho do arquivo de imagem
    // Crie uma instancia do objeto MessageMedia para representar o arquivo de imagem
    const image = MessageMedia.fromFilePath(imagePath);
    // Envie o arquivo de imagem para o chat
    chat.sendMessage(image);

    await delay(2000);
    chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(chat.id._serialized, 'Este é uma imagem');

    await delay(2000);
    chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(chat.id._serialized, 'Conseguiu ver?');  }

  // Comando que sera ativado para qualquer resposta
  if (['Sim', 'Bacana', 'Show', 'Legal', 'Quanto �', 'Valor','Top','sim','show','legal','qual valor','qual � o valor','Qual � o valor','Qual valor','top',].includes(msg.body)) {
    const chat = await msg.getChat();
    console.log('Resposta correspondente recebida:', msg.body);

    // Realize as acoes desejadas para a resposta correspondente
    await chat.sendStateRecording();
    await delay(20000); // Por exemplo, 10 segundos
    await chat.clearState();
    const audioPath = './audio_base.ogg'; // Caminho do arquivo de �udio
    const audio = MessageMedia.fromFilePath(audioPath);
    chat.sendMessage(audio);

    chat.sendStateTyping();
    await delay(4000);
    chat.sendStateTyping();
    await delay(5000);
    await client.sendMessage(chat.id._serialized, 'Para agendar uma reuniao clique no link: https://calendly.com/pessoal1/15min');
}
});
