const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const port = process.env.PORT || 4400

module.exports = {
  env,
  port,
  pgdburl: process.env.DATABASE_URL, // postgres (see Luis video)
  // for cookies to work with cross origin AJAX we can't enable CORS for '*'
  // the front end dev might ask to add other ursl to the admissible origins
  origin: ['https://cookies-liart-five.now.sh', 'http://localhost:3000'],
  secure: isProduction, // cookie only sent over https
  domain: isProduction
    ? 'herokuapp.com'
    : 'express-scaffolding-sqlite-pos.herokuapp.com'
}
