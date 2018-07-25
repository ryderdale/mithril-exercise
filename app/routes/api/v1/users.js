const express = require('express');
const router = express.Router();
const knex = require('../../../db/knex');

router.get('/', function (req, res, next) {
  knex('users').select().then(function (users) {
    res.json({
      "status" : 200,
      "results" : users
    })
  })
})

module.exports = router;
