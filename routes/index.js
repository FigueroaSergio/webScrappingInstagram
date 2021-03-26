var express = require('express');
var router = express.Router();
var search = require("./browser")
var busquedas = []
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/user/:nickname', (req, res) => {
  nickname = req.params.nickname
  console.log(nickname)
  let r = busquedas.find(dato=>dato.name===nickname)
  if (r !=null){
    res.json({"error":"Ya realizaste esta busqueda"})
  }
  else{
    search(nickname)
    .then((datos) => {
      busquedas.push(datos)
      res.json(datos)
      console.log(busquedas)
    }, (err) => next(err))
    .catch((err) => { 
      res.json({"error":"El usuario buscado no existe o es una cuenta privada"})
    });
  }
  

});


module.exports = router;
