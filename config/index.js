const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const port = process.env.PORT || 4400

module.exports = {
  env,
  port,
  pgdburl: process.env.DATABASE_URL, // postgres (see Luis video)
  // for cookies to work with SPA + API on different domain we can't enable CORS for '*'
  origin: [
    'https://cookies-git-master.ladrillo.now.sh',
    'https://cookies-liart-five.now.sh',
    'https://cookies.ladrillo.now.sh',
    'http://localhost:3000',
  ],
  secure: isProduction, // cookie only sent over https
}
