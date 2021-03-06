const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const db = require('./database/dbConfig')
const { secure, origin } = require('./config/index')

const app = express()

var corsOptions = {
  origin, // Array of admissible origins
  credentials: true, // Not needed for build week
}

// Not needed for build week
const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
};

// Not needed for build week
const cookieConfig = {
  maxAge: 1000 * 60 * 60,
  // the JS can't read the cookie when [SPA] hits [API on different domain]
  httpOnly: false,
  sameSite: 'None', // to prevent Chrome warning
  secure,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(session(sessionConfig)) // Not needed for build week
app.use(helmet())

app.get('/api', (_, res) => {
  res.cookie('lastEndpoint', 'api', cookieConfig)
  res.json({ server: 'up' })
})

app.get('/api/users', async (_, res) => {
  res.cookie('lastEndpoint', 'api-users', cookieConfig)
  const users = await db('users')
  res.json(users)
})

app.get('/api/roles', async (_, res) => {
  res.cookie('lastEndpoint', 'api-roles', cookieConfig)
  const roles = await db('roles')
  res.json(roles)
})

app.get('/api/login', (req, res) => {
  res.cookie('lastEndpoint', 'api-login', cookieConfig)
  req.session.user = { name: req.query.name }
  res.json({ user: req.query.name })
})

module.exports = app
