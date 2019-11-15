
exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { email: 'student', password: '1234' },
        { email: 'instructor', password: '1234' },
        { email: 'teamLead', password: '1234' }
      ]);
    });
};
