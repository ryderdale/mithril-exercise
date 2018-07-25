const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
const should = chai.should()

// Setup to use test db!
process.env.NODE_ENV = 'test'
const server = require('../app')
const knex = require('../db/knex')
chai.use(chaiHttp)

describe('Posts REST API', function() {
  beforeEach(function () {
    return knex.seed.run(knex.config)
  })

  describe('GET /api/v1/posts', () => {
    it('returns all records', () => {
      return chai.request(server).get('/api/v1/posts')
        .then( (res) => {
          res.body.should.have.status(200)
          res.should.be.json
          res.body.results.should.have.length(9)
          res.body.results[0].should.have.property('id')
          res.body.results[0].should.have.property('text')
        })
        .catch(err => {throw err})
    })
  })

  describe('POST /api/v1/posts', () => {
    let userId

    beforeEach( () => {
      return knex('users').first().then(user => userId = user.id)
    })

    it('creates a post record', () => {
      return chai.request(server)
        .post('/api/v1/posts')
        .send({title: "New Post!", text: "My fun content", user_id: userId})
        .then((res) => {
          res.body.should.have.status(200)
          res.should.be.json
          res.body.results.should.have.property('id')
          res.body.results.should.have.property('title')
          res.body.results.should.have.property('text')
          res.body.results.should.have.property('user_id')
          res.body.results.text.should.eq("My fun content")
        })
    })
  })

})
