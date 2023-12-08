var express = require('express');
var router = express.Router();

const db = require('../db')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const customersList = await db.list()
  // console.log(customersList)
  res.render('index', { title: 'Express', customersList });
});

router.post("/save", async (req, res) => {
  const customer = req.body;

  const result = await db.insert(customer)
  console.log(result)

  res.send(result)
})

module.exports = router;
