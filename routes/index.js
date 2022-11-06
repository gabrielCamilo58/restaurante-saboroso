const conn = require('./../inc/db'); 
const menus = require('./../inc/menus'); 
const reservations = require('./../inc/reservations');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  menus.getMenus().then(result => {
    res.render('index', { title: 'Restaturante Saboroso!', menus: result });
  });
});

router.post('/reservations', function (req, res, next) {
  if (!req.body.name) {
    reservations.render(req, res, 'Digite o nome')
  } else if(!req.body.email){
    reservations.render(req, res, 'Digite o e-mail')
  } else if(!req.body.people){
    reservations.render(req, res, 'Selecione o numero de pessoas')
  } else if(!req.body.date){
    reservations.render(req, res, 'Selecione a data')
  }  else if(!req.body.time){
    reservations.render(req, res, 'Selecione a hora')
  } else {
    reservations.save(req, body).then(results => {
      reservations.render(req, res, null, "Reserva realizada com sucesso!");
    }).catch(err => {
      reservations.render(req, res, err.message)
    })
  }
});

router.get('/contacts', function(req, res, next) {
  res.render('contact', { 
    title: 'Restaurante Saboroso!', 
    background: "images/img_bg_3.jpg",
    h1: "Diga um oi!"});
});

router.get('/menus', function(req, res, next) {

  menus.getMenus().then(result => {
    res.render('menu', { 
      title: 'Restaurante Saboroso!', 
      background: "images/img_bg_1.jpg",
      h1: "Saborei nosso menu!",
      menus: result
    });
  });
});

router.get('/reservations', function(req, res, next) {
  reservations.render(req, res, null);
})

router.get('/services', function(req, res, next) {
  res.render('services', { 
    title: 'Restaurante Saboroso!', 
    background: "images/img_bg_1.jpg",
    h1: "É um prazer poder servir!"});
})

module.exports = router;
