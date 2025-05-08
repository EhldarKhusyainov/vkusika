const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/proxy', async (req, res) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10 сек таймаут

  try {
    console.log('📡 Отправляем запрос к API Вкусно — и точка');

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
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6ImhVN0JRMGdOUzllR0c5WXU5bFF0WmcifQ.eyJpbnMiOiIyMThhNGExMi04MjQwLTQwYTQtODlhOS1kYTI4NzYxZGExZmMuYicyRXNtWUgnIiwiZGlkIjoiZWYyY2NjYjEyNTljNzNmYyIsInR0bCI6MTQ0MCwiaWF0IjoxNzQ2NjMxODcwLCJleHQiOjE3NDY3MTgyNzAsImNvbnNlbnQiOnRydWUsImNpdHkiOiI1ZmQzNzJiNjIyMzA1NDcxZDliZjQ1YjIiLCJ4LWNpdHktaWQiOiI1ZmQzNzJiNjIyMzA1NDcxZDliZjQ1YjIiLCJ1dWlkIjoiOGM3M2ViNmUtNDAxMy00YzI3LTkzZTgtMTg0N2VmMDBiYjY2In0.sFCBi00Uz3sNf3JQVYO2o_3dCRlT8DGNheIRK_X9w9M'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    const status = apiRes.status;
    const text = await apiRes.text();

    console.log(`📨 Ответ API [${status}]:`, text.slice(0, 300)); // первые 300 символов

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: 'Ответ API не является JSON', details: text });
    }

  } catch (err) {
    clearTimeout(timeout);
    console.error('❌ Ошибка при запросе к API:', err);
    return res.status(500).json({ error: 'Ошибка соединения с API', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
