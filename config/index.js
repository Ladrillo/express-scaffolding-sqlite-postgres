module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4400,
  pgdburl: process.env.DATABASE_URL,
}
