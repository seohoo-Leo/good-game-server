const express = require('express');
const axios = require('axios');
const cors = require('cors');
const puppeteer = require('puppeteer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_API_KEY

app.use(cors());


app.get('/api/platforms', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  }
});



app.get('/api/gameInfo', async (req, res) => {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const mode = req.query.mode

  try {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&ordering=${mode}&dates=${startDate},${endDate}&page_size=50`
    );
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  }14889810
});

app.get('/api/gameDetail', async (req, res) => {
    const id = req.query.id

  try {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  }
});




app.listen(PORT, () => {
  console.log(`🔐 서버 실행 중: http://localhost:${PORT}`);
});

