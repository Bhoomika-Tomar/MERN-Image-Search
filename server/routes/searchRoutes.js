const express = require('express');
const axios = require('axios');
const router = express.Router();
const Search = require('../models/Search');

function ensureAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ error: 'Login required' });
}

// POST /api/search
router.post('/search', ensureAuth, async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ error: 'term required' });
  try {
    await Search.create({ userId: req.user._id, term });
    const url = `https://api.unsplash.com/search/photos`;
    const params = { query: term, per_page: 24 };
    const response = await axios.get(url, {
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
      params
    });
    res.json({ total: response.data.total, results: response.data.results });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /api/top-searches
router.get('/top-searches', async (req, res) => {
  const top = await Search.aggregate([
    { $group: { _id: '$term', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.json(top.map(t => ({ term: t._id, count: t.count })));
});

// GET /api/history
router.get('/history', ensureAuth, async (req, res) => {
  const history = await Search.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(50);
  res.json(history);
});

module.exports = router;
