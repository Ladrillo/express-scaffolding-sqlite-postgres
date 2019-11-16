module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4400,
  pgdburl: process.env.DATABASE_URL,
  origin: process.env.NODE_ENV === 'production'
    ? 'https://cookies-liart-five.now.sh'
    : 'http://localhost:3000'
}
