const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/collect-data', (req, res) => {
  const data = req.body;
  const token = 'YOUR_TELEGRAM_BOT_TOKEN';
  const chatId = '-1001491052715';
  const message = data.message;

  const telegramApiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const sendDataToTelegram = async () => {
    try {
      const response = await axios.post(telegramApiUrl, {
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
