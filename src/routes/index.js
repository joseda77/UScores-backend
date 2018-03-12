const router = require('express').Router();


//Envia un mensaje al navegador
router.get('/', function(req, res) {
  res.render('index.html');
});

module.exports =router;