dropdb knex_blog --if-exists
createdb knex_blog
knex migrate:latest
knex seed:run

dropdb knex_blog_test --if-exists
createdb knex_blog_test
knex migrate:latest --env test
knex seed:run --env test
