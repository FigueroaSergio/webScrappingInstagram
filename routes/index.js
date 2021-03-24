var express = require('express');
var router = express.Router();
var search = require("./browser")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/:person', (req, res) => {
  person = req.params.person
  console.log(person)
  search(person)
  .then((datos) => { res.json( datos ) }, (err) => next(err))
  .catch((err) => {console.log("error")});

});


module.exports = router;
