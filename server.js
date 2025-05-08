const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/promotions', async (req, res) => {
  try {
    const response = await fetch('https://n8n.YOUR_DOMAIN.com/webhook/vkusno'); // Укажи правильный URL n8n webhook
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении данных из n8n', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
