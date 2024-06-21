const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'blog-api' });
});

module.exports = router;
