var express = require('express');
var router = express.Router();
var search = require("./browser")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/:nickname', (req, res) => {
  nickname = req.params.nickname
  console.log(nickname)
  search(nickname)
  .then((datos) => { res.json( datos ) }, (err) => next(err))
  .catch((err) => {console.log("error")});

});


module.exports = router;
