
exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { email: 'peter@peter.com', password: '1234' },
        { email: 'jean@jean.com', password: '1234' },
        { email: 'dan@dan.com', password: '1234' }
      ]);
    });
};
