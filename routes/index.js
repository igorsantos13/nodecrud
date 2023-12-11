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

router.post('/delete', async (req, res) => {
  const id = req.body.id;

  const result = await db.removeCustomer(id)
  console.log(result)
  res.json(result)
})

router.post('/update', async (req, res) => {
  const id = req.body.id;
  const name = req.body.name

  const result = await db.updateCustomer(id, name)
  console.log(result)
  res.json(result)
})

module.exports = router;
