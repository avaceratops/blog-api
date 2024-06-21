const express = require('express');
const indexRouter = require('./index');

const router = express.Router();

router.use('/', indexRouter);

module.exports = router;
