const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const port = process.env.PORT || 4400

module.exports = {
  env,
  port,
  pgdburl: process.env.DATABASE_URL, // postgres (see Luis video)
  // for cookies to work with SPA + API on different domain we can't enable CORS for '*'
  // the front end dev might ask to add other URLs to the admissible origins
  origin: ['https://cookies-liart-five.now.sh', 'http://127.0.0.1:3000', 'http://localhost:3000'],
  secure: isProduction, // cookie only sent over https
  domain: isProduction
    ? 'herokuapp.com'
    : 'localhost'
}
