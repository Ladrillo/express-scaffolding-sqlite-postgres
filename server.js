const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const db = require('./database/dbConfig')
const { secure, origin, domain } = require('./config/index')

const app = express()

var corsOptions = {
  origin, // array of admissible origins
  credentials: true,
}

const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure,
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
};

const cookieConfig = {
  maxAge: 1000 * 60 * 60,
  httpOnly: false,
  sameSite: 'None',
  secure,
  // domain,
}

app.use(express.json())
app.use(helmet())
app.use(session(sessionConfig))
app.use(cors(corsOptions))

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
