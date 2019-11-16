const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const port = process.env.PORT || 4400

module.exports = {
  env,
  port,
  pgdburl: process.env.DATABASE_URL, // postgres (see Luis video)
  // origin: isProduction // for cookies to work cross origin we can't enable CORS for '*'
  //   ? 'https://cookies-liart-five.now.sh'
  //   : 'http://localhost:3000',
  origin: ['https://cookies-liart-five.now.sh', 'http://localhost:3000'],
  secureCookie: isProduction // over https only?
    ? true
    : false,
}
