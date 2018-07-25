
exports.up = function(knex, Promise) {
  knex.schema.createTable("books", function (table) {
    table.text("title")
    table.text("author")
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("books")
};
