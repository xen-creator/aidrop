const express = require('express');
const app = express();
const port = process.env.PORT || 999;
const axios = require('axios');

app.use(express.json());

const telegramApiUrl = 'https://api.telegram.org/bot';
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = '-1001491052715';

app.post('/collect-data', (req, res) => {
  const data = req.body;
  const message = `Received data: ${JSON.stringify(data)}`;

  const sendDataToTelegram = async () => {
    try {
      const response = await axios.post(`${telegramApiUrl}${token}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  sendDataToTelegram()
    .then((response) => {
      res.send('Data collected and sent successfully!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error collecting and sending data');
    });
});

app.post('/send-to-telegram', (req, res) => {
  const { token, id, message } = req.body;

  const sendToTelegram = async () => {
    try {
      const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: id,
        text: message,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  sendToTelegram()
    .then((response) => {
      res.send('Message sent to Telegram successfully!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending message to Telegram');
    });
});

app.post('/send-data-to-telegram', (req, res) => {
  const { token, id, data } = req.body;

  const sendDataToTelegram = async () => {
    try {
      const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: id,
        text: `Received data: ${JSON.stringify(data)}`,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  sendDataToTelegram()
    .then((response) => {
      res.send('Data sent to Telegram successfully!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending data to Telegram');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
