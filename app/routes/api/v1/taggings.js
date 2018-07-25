const express = require('express');
const router = express.Router();
const knex = require('../../../db/knex');

router.get('/', (req, res, next) => {
  knex('taggings')
    .select('taggings.id', 'taggings.tag_id', 'taggings.post_id', 'tags.name as tag_name', 'posts.title as post_title')
    .innerJoin('tags', 'tags.id', 'taggings.tag_id')
    .innerJoin('posts', 'posts.id', 'taggings.post_id')
    .then( records => {
      res.json({
        "status" : 200,
        "results" : records.map(record => {
          return {
            id: record.id,
            tag: {
              id: record.tag_id,
              name: record.tag_name,
            },
            post: {
              id: record.post_id,
              title: record.post_title,
            },
          }
        })
      })
    })
    .catch(err => next(err))
})

module.exports = router;
