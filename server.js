
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/proxy', async (req, res) => {
  try {
    const apiRes = await fetch('https://mobile-api.vkusnoitochka.ru/api/v1/offers/offer/883865891?restaurant=5fd372b622305471d9bf45b5', {
      method: 'GET',
      headers: {
        'X-Device-ID': 'ef2cccb1259c73fc',
        'X-Device-Model': 'ASUS_I005DA',
        'X-Platform': 'Android',
        'X-OS-Version': '28',
        'X-Language': 'ru',
        'X-App-Version': '11.0.4.1',
        'X-Build-Number': '141233',
        'X-Cellular-Name': 'MTS',
        'X-Services-Provider': 'google',
        'X-City-ID': '5fd372b622305471d9bf45b2',
        'X-Timezone': 'GMT+08:00',
        'X-Mytracker-ID': '6d88c290-064b-4e15-aa4d-f725d9d6530a',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6ImhVN0JRMGdOUzllR0c5WXU5bFF0WmcifQ...'
      }
    });
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при запросе к API', details: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
