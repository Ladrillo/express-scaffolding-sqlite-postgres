
exports.seed = function(knex) {
  return knex('table_name').truncate()
    .then(function () {
      return knex('table_name').insert([
        { name: 'student'},
        { name: 'instructor'},
        { name: 'teamLead'}
      ]);
    });
};
