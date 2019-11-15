
exports.seed = function(knex) {
  return knex('roles').truncate()
    .then(function () {
      return knex('roles').insert([
        { name: 'student'},
        { name: 'instructor'},
        { name: 'teamLead'}
      ]);
    });
};
