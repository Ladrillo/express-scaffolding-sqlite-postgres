
exports.seed = function(knex) {
  return knex('roles').del()
    .then(function () {
      return knex('roles').insert([
        { name: 'student'},
        { name: 'instructor'},
        { name: 'teamLead'}
      ]);
    });
};
