const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

const sendDataToTelegram = async (data) => {
  const chatId = '123456789'; // Replace with the actual chat ID
  try {
    const response = await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.post('/collect-data', async (req, res) => {
  const data = req.body;
  try {
    const telegramResponse = await sendDataToTelegram(data);
    res.send('Data collected and sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error collecting and sending data');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
