exports.seed = function(knex, Promise) {

  return knex('taggings').del()
    .then(() => knex('tags').del())
    .then(() => knex('posts').del())
    .then(() => knex('users').del())
    .then(() => {
      const userPromises = [
        {username: "Tyler"},
        {username: "Liz"},
        {username: "Elie"},
        {username: "Foxworthington"}
      ].map(fields => knex('users').insert(fields).returning('id'))

      return Promise.all(userPromises)
    })
    .then(results => results.map(ids => ids[0]))
    .then(userIds => {
      const postPromises = [
        {title: "JavaScript is sweet", text: "JavaScript is sweet", user_id: userIds[0]},
        {title: "I like sushi", text: "I like sushi", user_id: userIds[0]},
        {title: "Eggs are delicious", text: "Eggs are delicious", user_id: userIds[1]},
        {title: "Burn it all down", text: "BURN IT ALL DOWN", user_id: userIds[1]},
        {title: "Teamwork and dreamwork", text: "Teamwork makes that dream work", user_id: userIds[1]},
        {title: "Team Edward", text: "I decided to be team Edward", user_id: userIds[2]},
        {title: "Programming is fun?", text: "programming is fun", user_id: userIds[2]},
        {title: "My Day", text: "last week I found ten bucks on the ground", user_id: userIds[3]},
        {title: "The best laid plans...", text: "dancing in the rain was a bad idea", user_id: userIds[3]}
      ].map(fields => knex('posts').insert(fields).returning('id'))

      return Promise.all(postPromises)
    })
    .then(results => results.map(ids => ids[0]))
    .then(postIds => {

      const tagPromises = [
        {name: 'programming'},
        {name: 'food'},
        {name: 'random'},
        {name: 'motivational'}
      ].map(fields => knex('tags').insert(fields).returning('id'))

      return Promise.all(tagPromises)
        .then(results => results.map(ids => ids[0]))
        .then(tagIds => {

          const tagsPostPromises = [
            {tag_id: tagIds[0], post_id: postIds[0]},
            {tag_id: tagIds[0], post_id: postIds[6]},
            {tag_id: tagIds[1], post_id: postIds[1]},
            {tag_id: tagIds[1], post_id: postIds[2]},
            {tag_id: tagIds[3], post_id: postIds[8]},
            {tag_id: tagIds[3], post_id: postIds[0]},
            {tag_id: tagIds[3], post_id: postIds[4]},
            {tag_id: tagIds[2], post_id: postIds[3]},
            {tag_id: tagIds[2], post_id: postIds[4]},
            {tag_id: tagIds[2], post_id: postIds[7]},
            {tag_id: tagIds[2], post_id: postIds[8]},
          ].map(fields => knex('taggings').insert(fields).returning('id'))

          return Promise.all(tagsPostPromises)
        })
    })
}
