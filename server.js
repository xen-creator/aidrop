const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const telegramDataSender = require('./telegramDataSender');

app.use(express.json());

app.post('/collect-data', (req, res) => {
  const data = req.body;
  telegramDataSender.sendData(data)
    .then(() => {
      res.send('Data collected and sent successfully!');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error collecting and sending data');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
