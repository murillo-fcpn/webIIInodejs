const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Bienvenido',
    message: 'Express con EJS y PostgreSQL'
  });
});

module.exports = router;
