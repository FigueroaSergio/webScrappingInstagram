var express = require('express');
var router = express.Router();
var search = require("./browser")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', (req, res) => {
  person = req.body.person
  console.log(person)
  search(person).then((datos) => { res.json({ "status": datos }) }, (err) => next(err)).catch((err) => {console.log("error")});

});

module.exports = router;
