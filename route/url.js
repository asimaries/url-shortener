const express = require('express')
const { handleGenrateNewShortURL, handleAnalytics, handleAllAnalytics } = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenrateNewShortURL)
router.get('/', (req, res) => {
  return res.redirect('/');
})

router.get('/analytics', handleAllAnalytics)
router.get('/analytics/:shortId', handleAnalytics)
module.exports = { router };